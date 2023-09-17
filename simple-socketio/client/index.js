const socket = io('ws://localhost:8080');

socket.on('message2', text => {
    const element = document.createElement('li');
    element.innerHTML = text;
    document.querySelector('ul').appendChild(element);
    
});

// html에서 onclick ="" 을 js파일에서 작성
document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message1', text);
}