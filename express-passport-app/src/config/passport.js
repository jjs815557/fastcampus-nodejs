const passport = require('passport');
const User = require('../models/users.models');
const LocalStrategy = require('passport-local').Strategy;
//단순 이메일 + 비번 으로 사용자 인증시
//passport-local 모듈을 설치해 사용 

// req.login(user)
passport.serializeUser((user, done) => { //세션의 데이터 생성 하여 클라이언트에 전달
    done(null, user.id);
});

//client => session => request
passport.deserializeUser((id, done) => { // 클라이언트에서 보낸 세션 정보(user.id)를 deserializeUser
    User.findById(id).then( // DB에서 유저 정보 찾기
        (user) => {
            done(err, user);
        });
        req.user = user;
}); 


// const LocalStrategyConfig = new LocalStrategy({
//     //input태그의 name 속성값인 username 써야하나
//     //이메일 형식을 원하면 input태그의 name 속성값을 email로 바꾸고
//     // usernameField에 'email'로 작성하여 데이터 연결
//     usernameField: 'email', 
//     passwordField: 'password',
// },
// (email, password, done) => {
//     //DB에서 사용자 정보 찾기
//     User.findOne({email: email.toLowerCase()}, (err, user) => {
//         // if(err) return done(err);
//         if(!user) return done(null, false, {message: '이메일을 찾울 수 없습니다.'});
//         user.comparePassword(password, (err, isMatch) => {
//             if(err) return done(err);
//             if(isMatch){
//                 return done(null, user);
//             }
//             return done(null, false, {message: '아이디나 비밀번호를 확인해주세요.'});
//         });
//     })

// }
// );

const LocalStrategyConfig = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email.toLowerCase() }).exec();
            if (!user) {
                return done(null, false, { message: '이메일을 찾을 수 없습니다.' });
            }
            const isMatch = await user.comparePassword(password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: '아이디나 비밀번호를 확인해주세요.' });
            }
        } catch (err) {
            return done(err);
        }
    }
);  

passport.use('local', LocalStrategyConfig);