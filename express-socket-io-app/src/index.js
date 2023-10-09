//express 와 socketio 연동 (socketio 에서도 자체 서버를 생성가능)
//express 와 socketio가 http 통신을 하는 개념
//express 서버 <-> http <-> socket 서버

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const path = require('path');
const { addUser, getUsersInRoom } = require('./utils/users');
const {generateMessage} = require('./utils/users');

io.on('connection', (socket)=>{
    console.log('socket', socket.id);

    socket.on('join', (options, callback)=>{
        //addUser가 에러 또는 유저 정보를 리턴
        const { error, user } = addUser({id : socket.id, ...options});

        if(error){
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Admin', `${user.room} 방에 오신 걸 환영합니다`));
        socket.broadcast.to(user.room).emit(message),generateMessage('',`${user.username}가 방에 참여 했습니다`);

        //같은 그룹에 있는 모든 사람들에게 전송
        io.to(user.room).emit('roomData',{
            room: user.room,
            users: getUsersInRoom(user.room)
        })

    });

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    socket.on('disconnect', ()=>{
        console.log('socket disconnect', socket.id);
        const user = removeUser(socket.id);
    });
});

app.use(express.static(path.join(__dirname, '../public')));

const port = 4000
server.listen(port, ()=>{
    console.log(`server is up on port  ${port}`);
});