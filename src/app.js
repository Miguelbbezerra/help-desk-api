import express from 'express';
import { AppDataSource } from './app-data-source.js';
import { router } from './router.js';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fetch from 'node-fetch';

const app = express();
const port = 5000;

// Configuração da pasta de uploads como estática
app.use('/uploads', express.static(path.resolve('src/uploads')));

// Middleware para liberar CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para emitir notificações de tickets e salvar no banco
app.use(async (req, res, next) => {
    const oldSend = res.send;
    res.send = async function (data) {
        data = JSON.parse(data);
        if (req.method === 'POST' && req.path === '/ticket') {
            io.emit('notification', { type: 'new_ticket', data });
            console.log('New ticket notification emitted:', data);

            // Save notification using fetch
            try {
                const response = await fetch('http://localhost:5000/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ type: 'new_ticket', data }),
                });
                const savedNotification = await response.json();
                console.log('New ticket notification saved to database:', savedNotification);
            } catch (error) {
                console.error('Error saving notification:', error);
            }
        } else if (req.method === 'PUT' && req.path.startsWith('/ticket/')) {
            io.emit('notification', { type: 'update_ticket', data });
            console.log('Update ticket notification emitted:', data);

            // Save notification using fetch
            try {
                const response = await fetch('http://localhost:5000/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ type: 'update_ticket', data }),
                });
                const savedNotification = await response.json();
                console.log('Update ticket notification saved to database:', savedNotification);
            } catch (error) {
                console.error('Error saving notification:', error);
            }
        }
        oldSend.apply(res, arguments);
    }
    next();
});

// Adicionar as rotas do router
app.use(router(express));

// Criação do servidor HTTP
const server = createServer(app);

// Inicialização do Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

// Configuração dos eventos do Socket.io
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // Evento de mensagem de chat
    socket.on('chat message', async (msg) => {
        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(msg),
            });

            const savedMessage = await response.json();
            console.log('message saved: ', savedMessage);

            const messageFilter = `id=${savedMessage.id}`

            const responseMessage = await fetch(`http://localhost:5000/chat?${messageFilter}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const fetchedMessage = await responseMessage.json()

            console.log('message saved: ', fetchedMessage);

            // Emite a mensagem salva para todos os clientes conectados
            io.emit('chat message', fetchedMessage);
            
            try {
                const responseNotification = await fetch('http://localhost:5000/notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ type: 'new_chat_message', data: fetchedMessage }),
                });
                const savedNotification = await responseNotification.json();
                console.log('New chat message notification saved to database:', savedNotification);
            } catch (error) {
                console.error('Error saving notification:', error);
            }

            // Envia uma notificação de chat
            io.emit('notification', { type: 'new_chat_message', data: savedMessage });
        } catch (error) {
            console.error('Error saving message: ', error);
        }
    });
});

AppDataSource.initialize().then(async () => {
    server.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
