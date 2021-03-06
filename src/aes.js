//TODO: tratar el mensaje recibido propiamente

//default key size: 128bits [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//mesaage size: 128bits 
//default rounds 10 (9 + final)
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("result").innerHTML = "";
    document.getElementById("text").innerHTML = "";
    document.getElementById("cipher").addEventListener("click", cifrar);
    document.getElementById("decipher").addEventListener("click", descifrar);
});

    //default values: 
    //s-box:
const sBox =  [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67,
        0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59,
        0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7,
        0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1,
        0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05,
        0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83,
        0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29,
        0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b,
        0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa,
        0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c,
        0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc,
        0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec,
        0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19,
        0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee,
        0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49,
        0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
        0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4,
        0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6,
        0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70,
        0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9,
        0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e,
        0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1,
        0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0,
        0x54, 0xbb, 0x16]

    //RCON
const rCon = [
        0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 
        0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 
        0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 
        0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 
        0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 
        0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 
        0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 
        0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 
        0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 
        0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 
        0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 
        0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 
        0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 
        0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 
        0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 
        0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d
]

    //posibles valores MixColumns x 2 
const mixColumnsMul2 = [0x00,0x02,0x04,0x06,0x08,0x0a,0x0c,0x0e,0x10,0x12,0x14,0x16,0x18,0x1a,0x1c,0x1e,
    0x20,0x22,0x24,0x26,0x28,0x2a,0x2c,0x2e,0x30,0x32,0x34,0x36,0x38,0x3a,0x3c,0x3e,
    0x40,0x42,0x44,0x46,0x48,0x4a,0x4c,0x4e,0x50,0x52,0x54,0x56,0x58,0x5a,0x5c,0x5e,
    0x60,0x62,0x64,0x66,0x68,0x6a,0x6c,0x6e,0x70,0x72,0x74,0x76,0x78,0x7a,0x7c,0x7e,
    0x80,0x82,0x84,0x86,0x88,0x8a,0x8c,0x8e,0x90,0x92,0x94,0x96,0x98,0x9a,0x9c,0x9e,
    0xa0,0xa2,0xa4,0xa6,0xa8,0xaa,0xac,0xae,0xb0,0xb2,0xb4,0xb6,0xb8,0xba,0xbc,0xbe,
    0xc0,0xc2,0xc4,0xc6,0xc8,0xca,0xcc,0xce,0xd0,0xd2,0xd4,0xd6,0xd8,0xda,0xdc,0xde,
    0xe0,0xe2,0xe4,0xe6,0xe8,0xea,0xec,0xee,0xf0,0xf2,0xf4,0xf6,0xf8,0xfa,0xfc,0xfe,
    0x1b,0x19,0x1f,0x1d,0x13,0x11,0x17,0x15,0x0b,0x09,0x0f,0x0d,0x03,0x01,0x07,0x05,
    0x3b,0x39,0x3f,0x3d,0x33,0x31,0x37,0x35,0x2b,0x29,0x2f,0x2d,0x23,0x21,0x27,0x25,
    0x5b,0x59,0x5f,0x5d,0x53,0x51,0x57,0x55,0x4b,0x49,0x4f,0x4d,0x43,0x41,0x47,0x45,
    0x7b,0x79,0x7f,0x7d,0x73,0x71,0x77,0x75,0x6b,0x69,0x6f,0x6d,0x63,0x61,0x67,0x65,
    0x9b,0x99,0x9f,0x9d,0x93,0x91,0x97,0x95,0x8b,0x89,0x8f,0x8d,0x83,0x81,0x87,0x85,
    0xbb,0xb9,0xbf,0xbd,0xb3,0xb1,0xb7,0xb5,0xab,0xa9,0xaf,0xad,0xa3,0xa1,0xa7,0xa5,
    0xdb,0xd9,0xdf,0xdd,0xd3,0xd1,0xd7,0xd5,0xcb,0xc9,0xcf,0xcd,0xc3,0xc1,0xc7,0xc5,
    0xfb,0xf9,0xff,0xfd,0xf3,0xf1,0xf7,0xf5,0xeb,0xe9,0xef,0xed,0xe3,0xe1,0xe7,0xe5];
    //posibles valores MixColumns x 3 
const mixColumnsMul3 = [0x00,0x03,0x06,0x05,0x0c,0x0f,0x0a,0x09,0x18,0x1b,0x1e,0x1d,0x14,0x17,0x12,0x11,
    0x30,0x33,0x36,0x35,0x3c,0x3f,0x3a,0x39,0x28,0x2b,0x2e,0x2d,0x24,0x27,0x22,0x21,
    0x60,0x63,0x66,0x65,0x6c,0x6f,0x6a,0x69,0x78,0x7b,0x7e,0x7d,0x74,0x77,0x72,0x71,
    0x50,0x53,0x56,0x55,0x5c,0x5f,0x5a,0x59,0x48,0x4b,0x4e,0x4d,0x44,0x47,0x42,0x41,
    0xc0,0xc3,0xc6,0xc5,0xcc,0xcf,0xca,0xc9,0xd8,0xdb,0xde,0xdd,0xd4,0xd7,0xd2,0xd1,
    0xf0,0xf3,0xf6,0xf5,0xfc,0xff,0xfa,0xf9,0xe8,0xeb,0xee,0xed,0xe4,0xe7,0xe2,0xe1,
    0xa0,0xa3,0xa6,0xa5,0xac,0xaf,0xaa,0xa9,0xb8,0xbb,0xbe,0xbd,0xb4,0xb7,0xb2,0xb1,
    0x90,0x93,0x96,0x95,0x9c,0x9f,0x9a,0x99,0x88,0x8b,0x8e,0x8d,0x84,0x87,0x82,0x81,
    0x9b,0x98,0x9d,0x9e,0x97,0x94,0x91,0x92,0x83,0x80,0x85,0x86,0x8f,0x8c,0x89,0x8a,
    0xab,0xa8,0xad,0xae,0xa7,0xa4,0xa1,0xa2,0xb3,0xb0,0xb5,0xb6,0xbf,0xbc,0xb9,0xba,
    0xfb,0xf8,0xfd,0xfe,0xf7,0xf4,0xf1,0xf2,0xe3,0xe0,0xe5,0xe6,0xef,0xec,0xe9,0xea,
    0xcb,0xc8,0xcd,0xce,0xc7,0xc4,0xc1,0xc2,0xd3,0xd0,0xd5,0xd6,0xdf,0xdc,0xd9,0xda,
    0x5b,0x58,0x5d,0x5e,0x57,0x54,0x51,0x52,0x43,0x40,0x45,0x46,0x4f,0x4c,0x49,0x4a,
    0x6b,0x68,0x6d,0x6e,0x67,0x64,0x61,0x62,0x73,0x70,0x75,0x76,0x7f,0x7c,0x79,0x7a,
    0x3b,0x38,0x3d,0x3e,0x37,0x34,0x31,0x32,0x23,0x20,0x25,0x26,0x2f,0x2c,0x29,0x2a,
    0x0b,0x08,0x0d,0x0e,0x07,0x04,0x01,0x02,0x13,0x10,0x15,0x16,0x1f,0x1c,0x19,0x1a];

///////////////////// conversiones 
function textToBytes(text){
    let result = [];
    let i = 0;
    text = encodeURI(text);
    while(i < text.length){
        let c = text.charCodeAt(i++);
        //si es un signo %, los proximos 2 bytes seran un hex
        if(c === 37){
            result.push(parseInt(text.substr(i,2), 16))
            i+=2;
        } //de otra manera, cuenta como un byte
        else{
            result.push(c);
        }
    }
    return result; //coercearray ???
};

function textFromBytes(text){
    const result = [];
    let i = 0;
    let bytes = text;
    
    while(i<bytes.length){
        let c = bytes[i];

        if(c < 128){
            result.push(String.fromCharCode(c));
            i++;
        }else if(c > 191 && c < 224){
            result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
            i+=2;
        }else{
            result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
            i += 3;
        }
    }

    return result.join('');
};

function hexToBytes(text){
    let result = [];
    for(let i=0;i<text.length;i+=2){
        result.push(parseInt(text.substr(i,2),16));
    }

    return result; 
};

function hexFromBytes(text){
    let bytes = text;
    const Hex = '0123456789abcdef';
    let result = [];
    for(let i=0;i<bytes.length;i++){
        let v = bytes[i];
        result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
    }
    return result.join(''); 
};

/////////////////////

/**
 * Metodo que se encarga de descifrar con nuestros pasos personales 
 */
function descifrar(){
    if(document.getElementById('extraSec').checked){
            
        let text = document.getElementById("text").value;
        text = hexToBytes(text);

        text = extraSecDecryptStep2(text);
        text = extraSecDecryptStep1(text);

        text = hexFromBytes(text);

        document.getElementById("result").innerHTML = text;
    
    }else{ 
        document.getElementById("result").innerHTML = "Esta aplicacion no soporta descifrado de AES sorry "
    }

};

/**
 * Esta funcion llama a todos los metodos 
 * necesarios para el cifrado AES 
 * **/ 
function cifrar(){
    //recibo text, y llave
    let plainText = document.getElementById("text").value;
    let key0 = document.getElementById("password").value;
    let state = [];
    let keys;

    plainText = padding(plainText);
    key0 = padding(key0);
    plainText = textToBytes(plainText);
    //console.log("en hex: "+hexFromBytes(plainText));
    key0 = textToBytes(key0);
    // plainText = hexFromBytes(plainText);
    // key0 = hexFromBytes(key0);
    // console.log("text: "+plainText);
    // console.log("key: "+key0);

    for(let i = 0; i< 16; i++){
        state[i] = plainText[i];
    };
    // console.log("state: "+state);
   // state = plainText;
    
    //EXPANDER KEYS
    keys = keyExpansion(key0);
    console.log("keys expandidas: "+keys);
    console.log("longitud de keys: "+keys.length);
    //primer addRoundKey
    state = addRoundKey(state, key0);
    let keyOfRound;
    for(let i = 0; i<9;i++){
        //console.log("state "+state); //debug 
        state = subBytes(state);
        state = shiftRows(state);
        state = mixColumns(state);
        //usamos la key que corresponde a este round
        //asi que nos vamos moviendo entre 16 bytes 
        //volver a checar
        keyOfRound = keys.slice(16 * (i), 16 * (i+16))
        state = addRoundKey(state, keyOfRound);

    }
    //ultima ronda 
    state = subBytes(state);
    state = shiftRows(state);
    state = addRoundKey(state, keys.slice(160)); //para usar una ultima clave

    //DOS PASOS
    if(document.getElementById('extraSec').checked){
       state = extraSecStep1(state);
       //console.log("after: "+state);
       state = extraSecStep2(state);
      // console.log("before: "+state);
    }

    state = hexFromBytes(state);
    document.getElementById("result").innerHTML = state;
};

/**
 * Metodo que se encarga de hacer la longitud de mensaje a 16 bytes 
 * @param {input text} text 
 */
function padding(text){
    if(text.length > 16){
       text = text.substr(0, 16);
    }else if (text.length < 16){
        while(text.length < 16){
            text+='0';
        }
    }
    return text;
};

//toma el primer numero del mensaje 
//y se lo suma al resto del estado 
function extraSecStep1(text){
    //console.log("state: "+text);
    let fNum = text[0];
    let lNum = text[text.length - 1];
    console.log("state before: "+text);
    console.log('lnum: '+lNum);
    console.log('fnum: '+fNum);
    for(let i=1;i<15;i++){
        text[i] += fNum;
        text[i] -= lNum;
    }
    console.log("state after: "+text);
    return text;
};

function extraSecStep2(text){
    const first = 0;
    const last = text.length - 1; //pa que sea mas leible 
    // console.log("before: ");
    // console.log(text);
    console.log("first: "+text[first]);
    console.log("last: "+text[last]);
    text[first] = text[first] + text[last];
    text[last] = text[first] - text[last];
    text[first] = text[first] - text[last]; 
    console.log("first: "+text[first]);
    console.log("last: "+text[last]);
    //supuestamente esto deberia intercambiar dos valores
    // console.log("after: ");
    // console.log(text);
    return text;
};

function extraSecDecryptStep1(text){
    let fNum = text[0];
    let lNum = text[text.length - 1];
    for(let i=1;i<15;i++){
        text[i] += lNum;
        text[i] -= fNum;
    }
    return text;
};

function extraSecDecryptStep2(text){
    const first = 0;
    const last = text.length - 1; //pa que sea mas leible 
    // console.log("before: ");
    // console.log(text);
    console.log("first: "+text[first]);
    console.log("last: "+text[last]);
    text[first] = text[first] + text[last];
    text[last] = text[first] - text[last];
    text[first] = text[first] - text[last]; 
    console.log("first: "+text[first]);
    console.log("last: "+text[last]);
    //supuestamente esto deberia intercambiar dos valores
    // console.log("after: ");
    // console.log(text);
    return text;
}
 /**
  * Metodo que rota el primer char hasta el ultimo puesto
  * @param {array String} word 
  */
function rotate(word){
    //push = inserta un nuevo item al final de un arreglo
    //shift = obtiene el primer elemento de un arreglo
    word.push(word.shift());
    return word;
    //todo menos el primer char + el ultimo char
    //ej > david > avidd
    //return word.substr(1, word.length) + word.substr(0,1);
};

/**
 * Este metodo hace las operaciones basicas a una llave 
 * para generar la nueva llave en KeyExpansion
 * @param {array} word : llave 
 * @param {int} iteration : en que n de iteracion se esta, para el RCON
 */
function keyOperations(word, iteration){
    console.log("word: "+word);
    //se rota la llave
    word = rotate(word);
    //console.log("worddespues: "+word);
    //se aplica subBytes con S-BOX
    //y luego el rcon 
    for(let n in word){
        word[n] = sBox[word[n]];
    };

    //RCON-step: 
    word[0] ^= rCon[iteration];
    return word;
};

/**
 * Este metodo lleva a cabo los procesos necesarios 
 * para generar las llaves 
 * @param {Array de llaves} key0 
 */
function keyExpansion(key0){
    let keys = [];
    //bytes generados
    let bytes;
    let iteration = 1;
    let temp = []; //para el paso keyOperations 
    //16 * 11 = 176 <- n de bytes entre todas las keys 

    //copiamos la input key al arreglo 
    // for(let i = 0; i<16; i++){
    //     keys[i] = key0[i];
    // }
    keys = [...key0]; //copiado segun ES6
    console.log("keys: "+keys);

    bytes = 16; //<- acabamos de agregar la primera key

    //mientras no tengamos todas las 176 keys: 
    let n = 1;
    while(bytes < 176){ 
        console.log("bytes: "+bytes);
        //vamos a almacenar los ultimos 4 bytes generados 
        for(let i=0 ;i<4; i++){
            temp[i] = keys[i + bytes -4];
            //temp[i].push(keys[i+bytes-4]);
        }
        //cada 16 bytes
        if(bytes % 16 == 0){
            temp = keyOperations(temp, iteration);
            iteration++;
        }
        //despues se hace XOR de temp (ressultado de keyOperations) con los bytes de 3 posiciones 
        //ATRAS,  osea, bytes-16 y se guardan en keys[n], como ya una nueva key
        for(let j = 0; j<4; j++){
            keys[bytes] = keys[bytes-16] ^ temp[j]; 
            bytes++;
        }      
    }

    return keys;

};

////////////////////////////////////////////////
function addRoundKey(state, roundKey){
    
    //se hace XOR
    for(let i = 0;i<16;i++){
       // state[i] = String.fromCharCode(state[i].charCodeAt(0) ^ roundKey[i].charCodeAt(0));
       //state[i] = XOR_hex(state[i], roundKey[i]);
        state[i] = state[i] ^ roundKey[i];
        
    }
    return state;
    
}

function subBytes(state){
    for(i in 16){
        state[i] = sBox[state[i]];
    }
     return state
};

function shiftRows(state){
    //tmp 
    //ejemplo: 
    // [0 4 8  12          [ 0  4 8 12]
    //  1 5 9  13            5 9 13 1
    //  2 6 10 14           10 14 2 6         
    //  3 7 11 15] =>       15 3 7 11
    let temp = [];
    temp[0] = state[0];
    temp[1] = state[5];
    temp[2] = state[10];
    temp[3] = state[15];

    temp[4] = state[4];
    temp[5] = state[9];
    temp[6] = state[14];
    temp[7] = state[3];

    temp[8] = state[8];
    temp[9] = state[13];
    temp[10] = state[2];
    temp[11] = state[7];
    
    temp[12] = state[12];
    temp[13] = state[1];
    temp[14] = state[6];
    temp[15] = state[11];

    //copiamos el array nuevo al state
    // '...' < spread operator ES6
    state = [...temp];
    return state;
};

//lock up con las tablas establecidas 
//tendria que estar loco para generarlas a pata
//tabla de orden de mix columns: 
//2 3 1 1 
//1 2 3 1
//1 1 2 3
//3 1 1 2
//se va recorriendo 
//usamos un arreglo temporal para no sobreescribir datos de
//state que luego se utilizaran 
function mixColumns(state){
   let  temp = [];
   //String.fromCharCode(state[i].charCodeAt(0) ^ roundKey[i].charCodeAt(0)) 
    //1st column
    temp[0] = mixColumnsMul2[state[0]] ^ mixColumnsMul3[state[1]] ^ state[2] ^ state[3];
    temp[1] = state[0] ^ mixColumnsMul2[state[1]] ^ mixColumnsMul3[state[2]] ^ state[3];
    temp[2] = state[0] ^ state[1] ^ mixColumnsMul2[state[2]] ^ mixColumnsMul3[state[3]]; 
    temp[3] = mixColumnsMul3[state[0]] ^ state[1] ^ state[2] ^ mixColumnsMul2[state[3]];

    //2nd word/col 
    temp[4] = mixColumnsMul2[state[4]] ^ mixColumnsMul3[state[5]] ^ state[6] ^ state[7];
    temp[5] = state[4] ^ mixColumnsMul2[state[5]] ^ mixColumnsMul3[state[6]] ^ state[7];
    temp[6] = state[4] ^ state[5] ^ mixColumnsMul2[state[6]] ^ mixColumnsMul3[state[7]];
    temp[7] = mixColumnsMul3[state[4]] ^ state[5] ^ state[6] ^ mixColumnsMul2[state[7]];

    //3rd word /col
    temp[8] = mixColumnsMul2[state[8]] ^ mixColumnsMul3[state[9]] ^ state[10] ^ state[11];
    temp[9] = state[8] ^ mixColumnsMul2[state[9]] ^ mixColumnsMul3[state[10]] ^ state[11];
    temp[10] = state[8] ^ state[9] ^ mixColumnsMul2[state[10]] ^ mixColumnsMul3[state[11]];
    temp[11] = mixColumnsMul3[state[8]] ^ state[9] ^ state[10] ^ mixColumnsMul2[state[11]];

    //4th word / col
    temp[12] = mixColumnsMul2[state[12]] ^ mixColumnsMul3[state[13]] ^ state[14] ^ state[15]; 
    temp[13] = state[12] ^ mixColumnsMul2[state[13]] ^ mixColumnsMul3[state[14]] ^ state[15];
    temp[14] = state[12] ^ state[13] ^ mixColumnsMul2[state[14]] ^ mixColumnsMul3[state[15]];
    temp[15] = mixColumnsMul3[state[12]] ^ state[13] ^ state[14] ^ mixColumnsMul2[state[15]];
    //yessss
    state = [...temp];
    return state
};

function extraSec(state){
    return state;
};



    



