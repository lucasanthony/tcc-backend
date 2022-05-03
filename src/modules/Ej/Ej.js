const { Schema, model } = require('mongoose');

const EjSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    });

module.exports = model('Ej', EjSchema);