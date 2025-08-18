const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('message', (msg) => {
        console.log('Mensagem recebida:', msg);
        io.emit('message', msg);
    });
});

server.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT);
});