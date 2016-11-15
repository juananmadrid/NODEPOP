"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');


// AUTENTICACIÓN JWT (VALIDACIÓN PARA GENERACIÓN DE TOKEN)

var jwt = require('jsonwebtoken');

router.post('/login', function(req, res, next) {    // Autenticación JWT

    let user = req.body.user;                       // recibimos parámetros
    let pass = req.body.pass;

    // Método de Validación de usuarios

    let filter = {};
    filter.name = user;

    Usuario.find(filter).exec(function(err, usuarios) {
        if (err) {
            next(err);
            return;
        }

         // Validamos usuario y password

        if (typeof usuarios[0] === 'undefined') {                   // Error "usuario no encontrado"

            if (req.headers.language === 'es-ES') {
                res.json({success: false, error: 'usuario no encontrado'});

            } else {
                res.json({success: false, error: 'user not found'});
            }


        } else {
            if (usuarios[0].password !== pass) {                   // Error "password incorrecto"

                if (req.headers.language === 'es-ES') {
                    res.json({success: false, error: 'password incorrecto'});

                } else {
                    res.json({success: false, error: 'incorrect password'});
                }

            } else {                                                                     // genero token
                let token = jwt.sign({id: usuarios[0].id}, 'juanantoniocaballero', {     // creo token
                    expiresIn: '2 days'                                                  // devuelvo token
                });

                res.json({success: true, token: token});
            }
        }
    });

});



// Método para Registro de usuarios

router.post('/', function (req, res, next) {

    var usuario = new Usuario(req.body);

        usuario.save(function(err, usuarioRegistrado) {             // guardamos nuevo usuario en la base de datos
        if(err) {
            next(err);
            return;
        }

        res.json ({success: true, usuario: usuarioRegistrado});     // devuelvo usuario guardado
    });

});



module.exports = router;
