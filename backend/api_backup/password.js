const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    archive: {
        type: Boolean
    }
})

module.exports = mongoose.model('Password', passwordSchema)