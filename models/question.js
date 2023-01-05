const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    name: {
        type : Schema.Types.String,
        required : true,
        index : true
    },
    phone: {
        type : Schema.Types.Number,
        required : true,
        index : true
    },
    email: {
        type : Schema.Types.String,
        required : true,
        index : true
    },
    message: {
        type : Schema.Types.String,
        required : true,
        index : true
    },
}, {timestamps:true})

module.exports = mongoose.model('QuestionSchema', QuestionSchema);