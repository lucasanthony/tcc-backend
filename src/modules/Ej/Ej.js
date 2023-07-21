const { Schema, model } = require('mongoose');

const EjSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    departments: [{
        type: String,
        required: false
    }],
    skills: [{
        type: String,
        required: false
    }],
},
    {
        timestamps: true,
    });

module.exports = model('Ej', EjSchema);