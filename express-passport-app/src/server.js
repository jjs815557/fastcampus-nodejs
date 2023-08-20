const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');
const port = 3000;
const app = express();


app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 절대경로 설정
app.set('view engine', 'ejs'); // 어떤 teamplate engine를 사용할지 세팅

//<form>태그의 <input> 데이터를 전송 받기 위해 사용
app.use(express.urlencoded({ extended: false })); 
mongoose.connect('mongodb+srv://jjs815:aktkszldzhd815@cluster0.igl0w.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('mongoDB 연결 성공');
}).catch(err =>console.error(err));

app.use('/static/', express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.listen(4000, () => {
    console.log('Express 서버가 시작되었습니다.' + port);
});