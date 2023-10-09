const socket = io(); // 서버에서 socketio 객체를 사용할 수 있게 관련 모듈을 전송해줌

const query = new URLSearchParams(location.search);

const username = query.get('username');

const room = query.get('room'); 

//join -> 임의의 이벤트 이름
//서버로 (username, room)option 파라미터, 에러 callback 함수를 전달 
socket.emit('join',(username, room),(error)=>{ 
    if(error){
        alert(error); //'사용자 이름이 사용 중입니다'
        location.href = '/'; //에러 발생시 root 페이지로 이동
    }
});

const sidebarTemplate = document.querySelector('#sidbar-template').innerHTML;

socket.on('roomData', (room, users)=>{
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    document.querySelector('#sidebar').innerHTML = html;
});

const messageTemplate = document.querySelector('#message-template').innerHTML;
socket.on('message',(message)=>{
    const html = Mustache.render(messageTemplate, {
        username: messsage.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
});

function scrollToBottom() {
    message.scrollTop = messages.scrollHeight;
}

const messageForm = document.querySelector('#message-form');
const messageFormInput = document.querySelector('input');
const messageFormButton = document.querySelector('button');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 해당 이벤트의 기본기능을 막는 함수

    messageFormButton.setAttribute('disabled', 'disabled'); // 메시지 전송 버튼을 누르고 전송되는 동안 disable

    socket.emit('sendMessage', message, (error)=>{
        messageFormButton.removeAttribute('disabled');
        messageFormInput.value =''; // 전송 후 메시지 빈칸
        messageFormInput.focus();  

        if(error){
            return console.log(error);
        }
    });
})