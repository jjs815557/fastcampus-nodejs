const express = require('express');
const jwt = require('jsonwebtoken');
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

const secretText = 'superSecret'
app.post('/login', (req, res) => {
    const username = req.body.username
    const user = {
        name : username,
    }
    // jwt를 이용해서 토큰생성 payload + secretText
    const accessToken = jwt.sign(user, secretText); //process.env.ACCESS_TOKEN_SECRET -> dotenv 사용
    res.json({
        accessToken : accessToken
    })
}); 

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});