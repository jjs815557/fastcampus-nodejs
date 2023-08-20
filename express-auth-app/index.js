const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;

const posts = [
    {
        username: 'juseong',
        title : 'Post 1',
    },
    {
        username: 'Han',
        title : 'Post 2',
    }
];

app.use(express.json()); // json으로 변환해주는 미들웨어
app.use(cookieParser()); // cookie를 파싱해주는 미들웨어


const secretText = 'superSecret'
const refreshSecretText = 'supersuperSecret'
let refreshTokens = []; // DB가 없으므로 배열로 대처

/*  
access token의 유효 시간을 설정하지 않으면 보안에 취약해지지만 사용자 입장에선
지속적인 로그인을 해야 하는 불편함 생긴다

[refresh token 흐름도]
1. access token과 refresh token을 같이생성하여 클라이언트에게 전송
(refresh token은 DB에 저장 한다)
2. refresh token은 access token이 만료가 되면 그 때 사용하는 토큰이다
3. 클라이언트가 access token이 만료되어 더이상 접근을 하지 못 할때 refress token을 서버에 전달
4. 서버에서 refresh token을 받아 유효한지 검증후 다시 access token을 만들어서 클라이언트에게 전달

*/
app.post('/login', (req, res) => {
    const username = req.body.username
    const user = {
        name : username,
    }
    // jwt를 이용해서 토큰생성 payload + secretText
    const accessToken = jwt.sign( user, secretText, //process.env.ACCESS_TOKEN_SECRET -> dotenv 사용 
        {expiresIn : '30s'}); // 유효기간 설정 
    const refreshToken = jwt.sign( user, refreshSecretText, //process.env.REFRESH_TOKEN_SECRET -> dotenv 사용
        {expiresIn : '1d'});
        refreshTokens.push(refreshToken);

        // refresh token을 쿠키에 넣어주기
        // 서버에서 'jwt'의 이름으로 쿠키를 생성하여 클라이언트에게 전달
        // 해당 쿠기를 받은 클라이언트 로컬에서 활용
        res.cookie('jwt', refreshToken, {
            httpOnly: true, // httpOnly 옵션을 통해 만든 파일은 클라이언트에서 'doucment.cookie'로 탈취 하거나 조작 할 수 없다
            maxAge : 24 * 60 * 60 * 1000, // 쿠키 자체의 유효한 시간 설정
        });
        res.json({
        accessToken : accessToken,
        })
}); 

app.get('/posts', authMiddleware, (req, res) => {
    res.json(posts);
});

function authMiddleware(req, res, next) {
    // 토큰을 request.headers에 가져오기
    const authHearder = req.headers['authorization'];
    const token = authHearder && authHearder.split(' ')[1];
    if(token == null){
        return res.status(401);
    }
    // 토큰이 유효한지 확인
    jwt.verify(token, secretText, (err, user) => {
        if(err){
            return res.status(403);
        }
        req.user = user; // 다른 미들웨어서도 req.user 값을 사용가능
        next();
    })
}

//서버로 어떠한 요청을 보낼때 사용자의 브라우저가 쿠키의 데이터를 자동으로 함께 보낸다
app.get('/refresh', (req, res) => {
    // cookie-parser 모듈로 쿠피 파일을 json형태로 가져올 수 있음
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.status(401);
    }
    const refreshToken = cookies.jwt;
    console.log(refreshToken);
    
    //데이터베이스에 refresh token이 있는지 확인
    if(!refreshTokens.includes(refreshToken)){
        return res.sendStatus(403);
    }

    // refreshToken이 유효한 토큰인지 확인
    jwt.verify(refreshToken, refreshSecretText, (err, user) => {
        if(err){
            return res.sendStatus(403);
        }

        // access token 생성
        const accessToken = jwt.sign({
            name : user.name,
        }, secretText, {expiresIn : '30s'}) //process.env.ACCESS_TOKEN_
        
        res.json({ accessToken })
    })
    
});



app.listen(4000, () => {
    console.log(`Server running on port ${port}`);
});

