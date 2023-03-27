const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Password = require('./password')
const Card = require('./card')
const Auth = require('./auth')
var cors = require('cors')
const address = require('address');

app.use(cors())

// mongoDB connect
mongoose.connect('mongodb+srv://neelbavarva:Neel%409427@cluster0.uesqkef.mongodb.net/?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))
app.use(express.json())

const passwordRoute = require('./passwordRoute')
const cardRoute = require('./cardRoute')
app.use('/passwords', passwordRoute)
app.use('/cards', cardRoute)

app.get('/getMacAddress', async(req, res)=> {
    address.mac(function (err, addr) {
        res.json(addr)
    });
})

app.post('/getAuthentication', async(req, res)=> {
    const querryPassword = req.body.password;
    const databasePassword = await Auth.find();
    console.log(databasePassword[0].password)
    res.json(querryPassword==databasePassword[0].password || querryPassword===databasePassword[0].password)
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));