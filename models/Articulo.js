"use strict";

let mongoose = require('mongoose');


// Defino esquema de Artículo

let articuloSchema = mongoose.Schema({
    name: String,
    type: String,                               // Valores: busqueda, venta
    prize: Number,
    tag: [String],                                // Valores: work, lifestyle, motor, mobile
    image: String                               // includeFile('/public/images'),

});


// Método de contulta y filtrado

articuloSchema.statics.list = function (filter, callback) {
    let query = Articulo.find(filter);
    query.exec(callback);
};


let Articulo = mongoose.model('Articulo', articuloSchema);     // indico a qué colección aplico este modelo
