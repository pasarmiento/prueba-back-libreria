// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Base de datos
// ============================
let urlDB;

//if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://admin:2d8xNCG2quFozH1A@cluster0-nqzpc.mongodb.net/test';
//} else {
  //  urlDB = process.env.MONGO_URI;
//}
process.env.URLDB = urlDB;