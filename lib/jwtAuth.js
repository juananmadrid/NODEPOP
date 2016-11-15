"use strict";

var jwt = require('jsonwebtoken');


module.exports = function() {

    return function(req, res, next) {

        // extraemos token de body, query o headers
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decodificamos token
        if (token) {

            // verificamos secreto and checks exp
            jwt.verify(token, 'juanantoniocaballero', function(err, decoded) {
                if (err) {
                    if (req.headers.language === 'es-ES') {
                        return res.json({ ok: false, error: {code: 401, message: 'Fallo al autenticar token.'}});
                    } else {
                        return res.json({ ok: false, error: {code: 401, message: 'Failed to authenticate token.'}});
                    }

                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // si no hemos recigido token devolvemos error que lo indica

            if (req.headers.language === 'es-ES') {
                return res.status(403).json({
                    ok: false,
                    error: { code: 403, message: 'Token no proporcionado.'}
                });

            } else {
                return res.status(403).json({
                    ok: false,
                    error: { code: 403, message: 'No token provided.'}
                });

            }

        }
    };
};
