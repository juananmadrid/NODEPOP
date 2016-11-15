"use strict";

let mongoose = require('mongoose');


// Defino esquema de Usuarios

let usuarioSchema = mongoose.Schema({
    name: String,
    password: String,
    mail: String

});



let Usuario = mongoose.model('Usuario', usuarioSchema);     // indico a qué colección aplico este modelo
