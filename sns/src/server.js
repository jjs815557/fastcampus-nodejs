const cookieSession = require('cookie-session');
const express = require('express');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const app = express();
const path = require('path');

const config = require('config');
const mainRouter = require('./routes/main.router');
const userRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const commentsRouter = require('./routes/comments.router');
const profileRouter = require('./routes/profile.router');
const likesRouter = require('./routes/likes.router');
const friendsRouter = require('./routes/friends.router');


const serverConfig = config.get('server');

const port = serverConfig.port;

require('dotenv').config();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/auth', userRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);
app.use('/profile/:id', profileRouter);
app.use('/friends', friendsRouter);
app.use('posts/:id/like', likesRouter);


app.listen(port, ()=>{
    console.log(`listening on ${port}`); 
});