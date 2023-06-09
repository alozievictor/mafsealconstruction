const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const projectSchema = new Schema({
    address: {
        type: Schema.Types.String,
        zindex: true,
        required: true
    },
    ptype: {
        type: Schema.Types.String,
        zindex:   true,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    plan: {
        type: Schema.Types.String,
        required: true
    },
    date: {
        type: Schema.Types.String,
        required: true
    },
    compltDate: {
        type: Schema.Types.String,
        required: true
    },
    image:{
        type: Schema.Types.String,
        required: true
    },
    publicId:{
        type: Schema.Types.String,
        required: true
        
    },
}, { timestamps: true })

module.exports = mongoose.model('projectSchema', projectSchema);