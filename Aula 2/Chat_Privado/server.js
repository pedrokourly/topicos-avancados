const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('entrarSala', (sala) => {
        socket.join(sala);
        console.log(`Cliente ${socket.id} entrou na sala: ${sala}`);

        socket.to(sala).emit('mensagem', `Cliente ${socket.id} entrou na sala ${sala}`);
    });

    socket.on('mensagemSala', ({sala, mensagem}) => {
        io.to(sala).emit('mensagem', `[${sala}][${socket.id}]: ${mensagem}`);
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000 ...');
});

