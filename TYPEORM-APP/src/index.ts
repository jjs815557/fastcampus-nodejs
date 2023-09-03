import express from 'express';
import morgan from 'morgan'; // 로그 관련 모듈
import { AppDataSource } from './data-source';
import { User } from './entity/User';
const app = express();

// {username : 'john', password : '123'} 서버에서 요청 받은 json데이터
// 아래와 같은 형식으로 데이터 매칭 후 사용하는 미들웨어(app.use(express.json());)
// req.body.username = 'john
// req.body.password = '123
app.use(express.json());
app.use(morgan('dev'));// SS로그를 남기기 위한 미들웨어

app.get('/', (req, res) => {
res.send('running');
}
);

AppDataSource.initialize()
    .then(() => {
        console.log('성공')
    })
    .catch((err) => {
        console.log(err);
    });

app.post('/users', async(req, res) => {
    // getRepository는 db의 CRUD를 처리해주는 메소드
    const user = await AppDataSource.getRepository(User).create(req.body); // 클라이언트에서 보내온 데이터를 스키마에 맞게 생성
    const result = await AppDataSource.getRepository(User).save(user); // user변수를 db에 저장
    return res.send(result);
});

app.get('/users', async (req, res) => {
    // User 전체 조회
    const result = await AppDataSource.getRepository(User).find(); 
    res.json(result);
});

app.get('/users/:id', async (req, res) => {
    // 선택한 User만 조회
    const result = await AppDataSource.getRepository(User).findOneBy({ //
        id : Number(req.params.id)
    })
    return res.json(result);
});

app.put('/users/:id', async (req, res) => {
    // 일부분 업데이트 하고 저장 하기
    const user = await AppDataSource.getRepository(User).findOneBy({
        id : Number(req.params.id)
    });
    AppDataSource.getRepository(User).merge(user, req.body);
    const reuslt = await AppDataSource.getRepository(User).save(user);
    return res.send(reuslt);
});

app.delete('/users/:id', async (req, res) => {
    const result = await AppDataSource.getRepository(User).delete(req.params.id);
    res.json(result);
});

const port = 4000;
app.listen(port, ()=>{
    console.log(`serer running at http://localhost:${port}`);

})