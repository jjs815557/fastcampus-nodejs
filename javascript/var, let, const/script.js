for(let i = 0 ; i<10 ; i++){
    if(i === 3){
        console.log('it is 3')
        continue; // 해당 if문이 끝나고 아래로 내려가지 않고 for반복문으로 올라감
    }
    if( i ===5 ){
        console.log('5 stop the loop')
        break
    }
    console.log('number ' + i)
}

const user ={
    name : 'han',
    province : '경기도',
    city : '성남시'
}

for (let x in user){
    console.log(`${x} : ${user[x]}`)
}

const locations = [ '서울', '부산', '경기도', '대구']
for( let i = 0 ; i < locations.length; i++){
    console.log(locations[i]);
}

//foreach -> 배열에서 사용
locations.forEach(function(location,index,array){
    console.log(`${index} : ${location}`)
    console.log(array)
})

//map -> 배열에서 사용
locations.map(function(location){
    console.log(location)
})