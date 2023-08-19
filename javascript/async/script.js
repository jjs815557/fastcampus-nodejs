// function fetchData() {
//     return new Promise((resolve, reject) =>{
//         // 비동기 요청
//         const success = true;
//         if (success) {
//             resolve('success');
//         }else{
//             reject('error');
//         }
//         // setTimeout(function() {
//         //     resolve('data');
//         // }, 1000);
//     });
// }

// // then은 비동기 함수(fetchData)를 실행하고 나온 결과 값을 가지고
// // 내부 함수를 실행
// fetchData().then((response)=>{ 
//     console.log(response);
// }).catch((error)=>{
//     console.log(error);
// });

// fetch 함수는 비동기를 처리하는 전용 함수이며
// Promise를 지원하고 있어 fetch함수는 따로 Promise 생성자를 만들지 않아도 된다
// 단 Promise()생성자는 프로미스를 지원하지 않는 함수를 감쌀 때 사용함
fetch('http://jsonlaceholder.typicode.com/todos/1')
.then(response => response.json())//then으로 비동기를 값을 받아올때 json으로 한번 처리 해줘야함
.then(json => {
    console.log(json);
})
.finally(() => { //finally 함수는 앞의 비동기 함수 처리가 성공이 되든 실패를 하든 무조건 실행하는 함수
    console.log('작업끝'); 
});

// 1. Promise.all의 파라미터로 순회가능한 객체 or 배열을 넣는다
// 2. [promise1, promise2, promise3]각 프로미스가 모두 성공해야 then으로 넘어간다
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 1000,'foo');
});

Promise.all([promise1, promise2, promise3])
.then((response) => {
    console.log(response);
}).catch((error) => { // promise1 이 Promise.reject일때의 경우 Promise.all의 에러 처리

});


const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 500, 'one');
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 100, 'two');
});
Promise.race([promise1, promise2])
.then((response) => {
    console.log(response);// 가장 먼저 끝나는 promise2의 값을 리턴
})