const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');

const database = require('./utils/database');
const Parcel = require('./models/parcel');
const Truck = require('./models/truck');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', apiRouter);

Truck.hasMany(Parcel);
Parcel.belongsTo(Truck, { constraints: true, onDelete: 'SET NULL' });

database
    // .sync({ force: true })
    .sync()
    .then(result => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });