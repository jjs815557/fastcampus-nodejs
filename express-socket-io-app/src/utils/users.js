const users = [];

const addUser = ({id, username, room})=>{
    username = username.trim();
    room = room.trim();

    if(!username || !room) 
    {
        return {
            error : '사용자 이름과 방이 필요합니다'
        }
    }

    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username;
    });
    if(existingUser) {
        return {
            error : '사용자 이름이 사용 중입니다'
        }
    }
    //유저 저장
    const user =  { id, username, room }
    users.push(user);

    return {
        user
    }

    
    
}   

const getUsersInRoom = (room) =>{
    room = room.trim();

    return users.find(user => user.id === id);
}

const getUser = (id)=>{
    return users.filter((user)=> user.id === id);
}

const removeUser = (id)=>{
    // 지우려고 하는 유저가 있는지 찾기
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        // 만약 있다면 지우기
        return users.splice(index, 1)[0];
    }
    // splice() 배열의 인덱스를 바꾸거나 추가
    // splice( , 0 or 1, ) 0-> 추가 / 1-> 교체
    // 그리고 추가 및 교체된 값이 무엇인지 반환 해줌
}

module.exports ={
    addUser,
    getUsersInRoom,
    getUser,
    removeUser
}