// create user schema 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Survey = new Schema({
    title: String,
    desription: String,
    date: Date,
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

module.exports = mongoose.model('Survey', Survey);