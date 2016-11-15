"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Articulo = mongoose.model('Articulo');

var jwtAuth = require('../../lib/jwtAuth');

// Método para Consulta y Filtrado de Artículos


router.get('/', jwtAuth(), function(req, res, next) {

    let name = req.query.name;
    let type = req.query.type;
    let prize = req.query.prize;
    let tag = req.query.tag;

    let minp = req.query.minp;
    let maxp = req.query.maxp;

    let filter = {};

    if (typeof type !== 'undefined') {
        filter.type = type
    }

    if (typeof tag !== 'undefined') {
        filter.tag = tag
    }

    if (typeof prize !== 'undefined') {
        filter.prize = prize
    }

    if (typeof maxprize !== 'undefined') {
        filter.maxprize = maxprize
    }

    if (typeof minprize !== 'undefined') {
        filter.minprize = minprize
    }


    Articulo.find(filter).exec(function(err, articulos) {
        if (err) {
            next(err);
            return;
        }


        // FILTRO POR PRECIO MINIMO

        if (typeof minp !== 'undefined') {

            let i;

            for (i = 0; i < articulos.length; i++) {
                if (articulos[i].prize < minp) {
                    delete articulos[i];
                } else {
                    if (typeof maxp !== 'undefined') {
                        if (articulos[i].prize > maxp) {
                            delete articulos[i];
                        }

                    }
                }
            }
        }


        // FILTRO POR CARACTERES INICIALES DEL NOMBRE

        if (typeof name !== 'undefined') {

            var nameini = name.split("");                           // Genero array de caracteres del nombre
            let j;

            for (j=0; j < articulos.length; j++)  {                 // itero lista de articulos

                if (typeof articulos[j].name !== 'undefined') {
                let arrayarticulo = articulos[j].name.split("");    // convierto cada articulo en un array
                let k;
                for (k = 0; k < nameini.length; k++) {              // comparo cada carácter

                    if (arrayarticulo[k] !== nameini[k]) {
                        delete articulos[j];
                     }
                }
                }
            }
        }

        res.json({success: true, articulos: articulos});

    });
});



module.exports = router;

