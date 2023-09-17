const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors:{origin:'*'}
});

// a(emit)가 메시지를 보내면 => server(on)a가 보낸 메시지를 받고
// 그 메시지를 보냄(emit) => a,b,c에게 메시지 전달하는 시나리오
io.on('connection', (socket)=>{
    console.log('a user connected');
    socket.on('message1', (message)=>{
        //socket.id에는 누가 보냈는지 알 수있는 값이 들어있음
        io.emit('message2', `${socket.id.substr(0,2)} said ${message}`);
    });
})

const port = 8080;
http.listen(port,()=>{
    console.log('8080 포트 서버 실행');
});