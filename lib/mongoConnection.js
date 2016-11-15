"use strict";

var mongoose = require('mongoose');
var connection = mongoose.connection;

mongoose.Promise = global.Promise;        // indicamos librería de promesas.

connection.on('error', console.log.bind(console));  // como no se ejecuta aquí mantenemos el This con bind

connection.once('open', function() {
    console.log('Conectado a mongodb.')
});

mongoose.connect('mongodb://localhost:27017/nodepop');
