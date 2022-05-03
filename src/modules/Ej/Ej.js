const { Schema, model } = require('mongoose');
const User = require('@user/user');

const EjSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    president: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
},
    {
        timestamps: true,
    });

module.exports = model('Ej', EjSchema);