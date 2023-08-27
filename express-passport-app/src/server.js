const express = require('express');

const path = require('path');
const { default: mongoose } = require('mongoose');
const port = 4000;
const app = express();
const User = require('./models/users.models');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config();


//세션 쿠키에 저장
const cookieEncryptionKey = 'supersecret-key';
app.use(cookieSession({ // express는 쿠키를 처리하는 방법을 모르기 때문에 cookieSessios 라이브러리를 설치해야함
    name : 'session',   // 설정할 쿠키의 이름, 막약 없다면 기본값은 express : sess 형식으로 들어감
    keys : [cookieEncryptionKey] // (secret text key) 쿠키 값 서명 및 확인에 사용 할 키 목록 
}));

app.use(passport.initialize()); 
app.use(passport.session()); // 로그인 세션
require('./config/passport');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 절대경로 설정
app.set('view engine', 'ejs'); // 어떤 teamplate engine를 사용할지 세팅

//<form>태그의 <input> 데이터를 전송 받기 위해 사용
app.use(express.urlencoded({ extended: false })); 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongoDB 연결 성공');
}).catch(err =>console.error(err));

app.use('/static/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});


//passport.authenticate 사용시 개념 
//nomal login => local Strategy
//Google login => Google Strategy
//Facebook login => Facebook Strategy
app.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{ // 'local'선택시 클라이언트에서 전달해준 email, password만으로 인증
        if(err){
            return next(err); // 에러 발생시 express 에러 처리기로 토스
        }
        if(!user){
            return res.json({
                success : false,
                message : info
            });
        }
        //passport에서 지원해주는 logIn메소드이며 세션을 생성해 준다
        req.logIn(user, (err)=>{
            if(err){
                return next(err);
            }
            res.redirect('/'); // 정상 로그인 성공시 첫페이지로 리다이렉션
        })
    })(req, res, next); //(req, res, next) -> 미들웨어 안에 미들웨어를 넣어주면 파라미터 값을 전달하지 못하여 이와 같이 맨끝에 넣는다
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    // user 객체를 생성
    const user = new User(req.body); // 클라이언트의 form태그의 데이터를 가져와서 User객체에 넣어준다

    try {
        //user 컬렉션에 유저를 저장 합니다
        await user.save();
        return res.status(200).json({ 
            success : true, 
        });
    }catch (err) {
        console.log(err);
    }
});

app.listen(4000, () => {
    console.log('Express 서버가 시작되었습니다.' + port);
});
