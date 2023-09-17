const WebSocket = require('ws');
const wss = new WebSocket.Server({port:7071});

wss.on('connection', (ws)=>{
    ws.send('hello world');
    ws.on('message', (messageFormClient)=>{
        const message = JSON.parse(messageFormClient);
        console.log(message);
    });
});

