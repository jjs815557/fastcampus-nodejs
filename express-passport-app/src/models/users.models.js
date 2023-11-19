const mongoose = require('mongoose');

/*  sparse : true 넣는 이유
    1. email + password => 로그인 ==> google : null
    2. google           => 로그인 ==> google : jjs7083(사용자 구글아이디)
    3. email + password => 로그인 ==> google : null

    사용자가 1,2,3번과 같이 로그인을 시도 하였을 경우
    이전에 2번 방법으로 구글 로그인을 하였음에도 불구하고 3번과 같이 로그인을 성공하면 "google : null" (유니크 값이 변경)
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

userSchema.methods.comparePassword = async function(plainPassword, cb) {
    //bcrypt.compare -> 클라이언트에서 보내온 비번(plainPassword)을 암호화 하여 저장
    // bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    //     if (err) throw err;
    //     cb(null, isMatch);
    // });

    //plainPassword => client, this.password => 데이터베이스에 있는 비번
    //bcrypt.compare를 우선 사용하지 않고 넘어 갈 수 있기 위해 아래 코딩
    
    
    // if (plainPassword === this.password) {
    //     if (plainPassword === this.password) {
    //         cb(null, true);
    //     }else {
    //         cb(null, false);
    //     }
    //     return cb({error : 'error'});
    // }; 
    try {
        return this.password === plainPassword;
    } catch (err) {
        throw err;
    }
}
const User = mongoose.model('User', userSchema); // mongoose DB모델 생성

module.exports = User;