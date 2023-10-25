const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true,
        trim: true,
    },
    cardName: {
        type: String,
        trim: true,
    },
    number: {
        type: String,
        trim: true,
    },
    validTill: {
        type: String,
        required: true,
        trim: true,
    },
    cvv: {
        type: String,
        required: true,
        trim: true,
    },
    visa: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Card', cardSchema);