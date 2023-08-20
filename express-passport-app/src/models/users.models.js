const mongoose = require('mongoose');

/*  sparse : true 넣는 이유
    1. email + password => 로그인 ==> google : null
    2. google           => 로그인 ==> google : whvjsohwe
    3. email + password => 로그인 ==> google : null

    사용자가 1,2,3번과 같이 로그인을 시도 하였을 경우
    이전에 구글 로그인을 하였음에도 불구하고 "google : null"
    값을 가지게 된다 이것을 방지해 주기위해 "sparse : true"사용
*/

const userSchema = mongoose.Schema({
    email : {
        type : String,
        unique : true,
    },
    password: {
        type : String,
        minLength : 5,
    },
    googleId : {
        type : String,
        unique : true,
        sparse : true,
    }
});

const User = mongoose.model('User', userSchema); // mongoose DB모델 생성

module.exports = User;