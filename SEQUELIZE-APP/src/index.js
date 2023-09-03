const express = require('express');
const app = express();
const db = require('./models');

const User = db.users; 

//시작할때 데이터베이스를 비워주며 스키마를 재업데이트
//이전 프로젝트 "typeorm-app"에서 사용하던 스키마 및 저장된 db를 초기화
// db.sequelize.sync({force: true}).then(()=>{
//     console.log('데이터베이스를 drop 및 sync를 다시 맞춤');
// }); 

app.use(express.json());

// user 생성
app.post('/users', (req,res)=>{
    const { firstName, lastName, hasCar} = req.body;

    const user = {
        firstName : firstName,
        lastName : lastName,
        hasCar : hasCar,
    }

    User.create(user).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            messasage: err.message || '유저를 생성하는데 에러가 발생하였습니다'
        });
    })
})

// user 전체 조회
app.get('/users', (req, res) => {
    
    User.findAll().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || '유저 정보를 가져오는데 실패 했습니다'
        });
    });
});

// user 부분 조회
app.get('/users/:id',(req, res)=>{
    const id = req.params.id;
    User.findByPk(id).then(user => {
        if(user){
            res.send(user);
        }else{
            res.status(404).send({
                message: `id가 ${id}인 유저가 없습니다`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || `${id}인 유저를 찾는데 에러가 발생`
        });
    });
});

// user 업데이트
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where : { id }
    }).then(result => {
        res.send(result); // 성공시 '1'값 리턴 실패시 '0'값 리턴
    }).catch(err => {
        res.status(500).send({
            message : err.message || `${id}인 유저를 업데이트 에러 발생`
        });
    });
});

//user 삭제
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.destroy({
        where : { id }
    }).then(num => {
        if(num[0] === 1){ // num == 1 사용가능 
            res.send({
                message : "유자가 성공적으로 삭제 되었습니다"
            });
        }else{
            res.send({ 
                message : `${id} 유저를 찾지 못 했습니다`
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message : err.message || `${id} 유저를 삭제하는데 실패 했습니다`
        });
    });
});

const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`서버가 실행되었습니다 ${PORT}`);
});