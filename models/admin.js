const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminLoginSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        index: true
    },
    password: {
        type: Schema.Types.String,
        required: true,
        index: true
    }
})

module.exports = mongoose.model('adminLoginSchema', adminLoginSchema);