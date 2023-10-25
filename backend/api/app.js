const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Auth = require('./auth');
const cors = require('cors');
const address = require('address');

app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://neelbavarva:Neel%409427@cluster0.uesqkef.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json());

// Routes
const passwordRoute = require('./passwordRoute');
const cardRoute = require('./cardRoute');
app.use('/passwords', passwordRoute);
app.use('/cards', cardRoute);

// Get the MAC address
app.get('/getMacAddress', async (req, res) => {
    address.mac(function (err, addr) {
        res.json(addr);
    });
});

// Authentication endpoint
app.post('/getAuthentication', async (req, res) => {
    try {
        const queryPassword = req.body.password;
        const databasePasswords = await Auth.find();
        const storedPassword = databasePasswords[0].password;
        const isAuthenticated = queryPassword === storedPassword;
        res.json(isAuthenticated);
    } catch (error) {
        console.error('Error in authentication:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));
