const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const { default: mongoose } = require('mongoose');
const crypto = require('crypto');

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const { saveMessaages } = require('./utils/message');
const io = new Server(server);

const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));
app.use(express.json());

mongoose.connect('mongodb+srv://jjs815:<password>@cluster0.igl0w.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(err => {
        console.error(err);
    });

    const randomId = () => crypto.randomBytes(8).toString('hex');

    app.post('/session', (req, res) => {
        const data = {
            username: req.body.username,
            userID: randomId()
        }
        res.send(data);
    });

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const userID = socket.handshake.auth.userID;
    if(!username){
        return next(new Error('Invalid username'));
    }
    socket.username = username;
    socket.id = userID;
    next();
});

let users = [];
io.on('connection', async socket =>{ // socket 이벤트 'connection'될 때의 이벤트 처리
    let userData = {
        username: socket.username,
        userID: socket.id
    };
    users.push(userData);
    io.emit('users-data', { users });

    //클라이언트에서 보내온 메시지
    socket.on('message-to-server', (payload)=>{
        io.to(payload.to).emit('message-to-server', payload);
        saveMessaages(payload);
    });

    //데이터베이스에서 메시지 가져오기
    socket.on('fetch-messages', ()=>{

    }); 

    //유저가 방에서 나갔을 때
    socket.on('disconnect',()=>{

    });

});

server.listen(port, () => {
    console.log('listening on port)' + port);
});
