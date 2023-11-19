const lunch = {
    name : '라면',
    taste : '매운맛',
    kilocalories: 500,
    cold : false,
}

for(const key in lunch) {  
    console.log(lunch[key]);
}
console.log('======================');
const list = [1,'가나다', false, null];

for(const item of list) {
    console.log(item);
}