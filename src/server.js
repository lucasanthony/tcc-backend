const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const databaseConfig = require('./config/database');
require('dotenv/config');

const EjRoutes = require('./modules/Ej/EjRoutes');
const server = express();

server.use(cors());

server.get('/', async function (req, res) {
    return res.json({ message: "API conectada" });
})

databaseConfig();

server.use(express.json());
server.use(EjRoutes);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const port = process.env.PORT || 4444;

server.listen(port);

module.exports = server;