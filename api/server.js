const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());



server.use('*', (request, response, next) => {
    response.send('<h1>Test</h1>');
});

server.use((error, request, response, next) => {
    response.status(500).json({ message: error.message || 'An internal server error occurred.'});
});

module.exports = server;