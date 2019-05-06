const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Libro = require('../models/libro');

const app = express();

//Obtener libros
app.get('/libro', function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Libro.find({}, 'nombre estado codigo usuario referencia fechafin')
        .skip(desde)
        .limit(limite)
        .populate('usuario')
        .exec((err, libros) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Libro.count({ estado: false }, (err, conteo) => {
                res.json({
                    ok: true,
                    libros,
                    cuantos: conteo
                });

            });


        });


    //Obtener libro por id
    app.get('/libro/:nombre', function (req, res) {
        let desde = req.query.desde || 0;
        desde = Number(desde);

        let limite = req.query.limite || 5;
        limite = Number(limite);
        let nombre = req.params.nombre;
        Libro.find({ nombre: nombre }, 'nombre estado usuario')
            .skip(desde)
            .limit(limite)
            .populate('usuario')
            .exec((err, libros) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    libros
                });


            });


    });

    //Crear libro 
    app.post('/libro', function (req, res) {

        let body = req.body;

        let libro = new Libro({
            nombre: body.nombre,
            codigo: body.codigo,
            referencia: body.referencia,
            usuario: body.usuario

        });
        libro.save((err, libroDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                libro: libroDB
            });


        });


    });

    //Actualzar libro 
    app.put('/libro/:id', function (req, res) {
        let id = req.params.id;
        let body = _.pick(req.body, ['estado', 'usuario', 'nombre', 'codigo', 'referencia', 'fechafin']);

        Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
            .populate('usuario')
            .exec((err, libroDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    libro: libroDB
                });

            })

    });


});




module.exports = app;