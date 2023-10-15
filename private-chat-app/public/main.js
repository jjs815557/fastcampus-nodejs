const socket = io('http://localhost:4000', {
    autoConnect : false, // 해당 파일이 로드될때 소켓 자동 연결 false -> 로그인 후 연결해야해서
});

socket.onAny((event, ...args) => { // 소켓 이벤트를 확인
    console.log(event, ...args);
});

// 전역 변수 선언
const chatBody = document.querySelector('.chat-body');
const userTitle = document.querySelector('user-title');
const loginContainer = document.querySelector('.login-container');
const userTable = document.querySelector('.users');
const userTableline = document.querySelector('#users-tableline');
const title = document.querySelector('#active-user');
const messages = document.querySelector('.messages');
const msgDiv = document.querySelector('.msg-form');
