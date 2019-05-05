const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let libroSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    codigo: {
        type: String,
        unique: true,
        required: [true, 'El codigo es necesario']
    },
    referencia: {
        type: String,
        required: [true, 'La referencia es necesaria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    fechafin: {
        type: String,
    }
});

libroSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Libro', libroSchema);