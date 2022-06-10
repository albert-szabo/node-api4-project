const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());



server.get('/api/users', (request, response) => {
    response.json([
        {user_id: 1,
        name: 'Alice'},
        {user_id: 2,
        name: 'Bob'}
    ]);
});

server.post('/api/register', (request, response) => {
    const newUser = { username: request.username, password: request.password };
    response.status(201).json(newUser);
});

server.post('/api/login', (request, response, next) => {
    if (request.username && request.password) {
        response.json({ message: 'Welcome!' });
    } else {
        next({ status: 403, message: 'Access is forbidden without proper credentials.' });
    }
});



server.use('*', (request, response, next) => {
    response.send('<h1>Test</h1>');
});

server.use((error, request, response, next) => {
    response.status(error.status || 500).json({ message: error.message || 'An internal server error occurred.' });
});

module.exports = server;