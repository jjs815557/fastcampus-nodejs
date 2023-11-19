const socket = io('http://localhost:4000', {
    autoConnect : false, // 해당 파일이 로드될때 소켓 자동 연결 false -> 로그인 후 연결해야해서
});

socket.onAny((event, ...args) => { // 소켓 이벤트를 확인
    console.log(event, ...args);
});

// 전역 변수 선언
const chatBody = document.querySelector('.chat-body');
const userTitle = document.querySelector('#user-title');
const loginContainer = document.querySelector('.login-container');
const userTable = document.querySelector('.users');
const userTableline = document.querySelector('#users-tableline');
const title = document.querySelector('#active-user');
const messages = document.querySelector('.messages');
const msgDiv = document.querySelector('.msg-form');

// 로그인 form handler
const loginForm = document.querySelector('.user-login');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = document.getElementById('username');
    createSession(username.value.toLowerCase());
    username.value = '';
});

const createSession = async (username) => {
    const option = {
        method: 'post',
        headers: { 'Content-Type': 'application/josn'},
        body: JSON.stringify({ username }),
    } 
    await fetch('/session', option)
    .then(res =>{ res.json()})
    .then(data =>{
        socketConnect(data.username, data.userID);
        
        //local storage에 세션을 저장
        localStorage.setItem('session-username', data.username);
        localStorage.setItem('session-userID', data.userId);

        loginContainer.classList.add('d-none');
        chatBody.classList.remove('d-none');
        userTitle.innerHTML = data.username;
    })
    .catch(err => console.error(err));
}

const socketConnect = async (username, userID)=>{
    socket.auth = { username, userID };
    await socket.connect();
}

const setActiveUser = (element, username, userID) =>{
    title.innerHTML = username;
    title.setAttribute('userID', userID);

    const lists = document.getElementsByClassName('socet-users');
    for(let i = 0; i<lists.length; i++){
        lists[i].classList.remove('table-active');
    }
    element.classList.add('table-active');

    //사용자 선택 후 메시지 영역 표시
    msgDiv.classList.remove('d-none');
    messages.classList.remove('d-none');
    messages.innerHTML = '';
    socket.emit('fetch-messages', {receiver: userID});
    const notify = document.getElementById(userID);
    notify.classList.add('d-none');
}

const appendMessage = ({message, time, background, position})=>{
    let div = document.createElement('div');
    div.classList.add('message', 'bg-opacity-25', 'm-2', 'px-2', background, position);
    div.innerHTML = `<span class="msg-text">${message}</span> <span class="msg-time">${time}</span>`;
    messages.append(div);
    messages.scrollTop(0, messages.scrollHeight);
}

socket.on('users-data',({users})=>{
    //유저 목록에 자기 자신은 제거하기
    const index = users.findIndex(user => user.userID === socket.id);
    //findIndex에서 해당하는 값을 찾지 못하면 -1리턴
    if(index > -1){
        users.splice(index, 1);
    }

    // user table list 생성하기
    let ul = `<table class="table table-hover"></table>`;
    for(const user of users){
        ul += `<tr class="socket-users" onclick="setActiveUser(this, '${user.username}', '${user.userID}')">
            <td>${user.username}<span class="text-danger ps-1 d-none" id="${user.userID}">!</span>
            </td>
        </tr>`
    }
    ul += `</table>`;
    if(users.length > 0){
        userTagline.innerHTML = '접속 중인 유저';
        userTagline.classList.remove('text-danger');
        userTagline.classList.add('text-success');

    }else{
        userTagline.innerHTML = '접속 중인 유저 없음';
        userTagline.classList.remove('text-success');
        userTagline.classList.add('text-danger');
    }
});

const sessUsername = localStorage.getItem('session-username');
const sessUserID = localStorage.getItem('session-userID');

//페이지 새로고침시 기존의 세션 데이터가 있다면 바로 로그인하기
if(sessUsername && sessUserID){
    socketConnect(sessUsername, sessUserID);

    loginContainer.classList.add('d-node');
    chatBody.classList.remove('d-node');
    userTitle.innerHTML = sessUsername;
}

const msgForm = document.querySelector('.msgForm');
const message = document.getElementById('message');

msgForm.addEventListener('submit', e =>{
    e.preventDefault();

    const to = title.getAttribute('userID');
    const time = new Date().toLocaleString('en-US',{
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    //메시지 payload 만들기
    const payload = {
        from: socket.id,
        to,
        message: message.value,
        time
    }

    socket.emit('message-to-server', payload);

    appendMessage({...payload, background: 'bg-success', position: 'right'});

    message.value = '';
    message.focus();

});