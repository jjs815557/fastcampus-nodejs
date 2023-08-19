// closure -> 내부의 함수에서 외부 함수의 매개변수를 접근할 수있게한다
// closure innerFuntion 함수를 호출할때 
// outerFuntion 함수의 매개변수 outerVariable의 값('outsid')을 기억한다

function outerFuntion(outerVariable){
    return function innerFuntion(innerVariable){
        console.log('outer function : '+ outerVariable);
        console.log('inner function : '+ innerVariable);
    }
}
// newFuntion === outerFuntion
// outerFuntion 함수의 return 키워드에 의해 innerFuntion 함수가 된다
const newFuntion = outerFuntion('outsid');
console.log('new function : ' + newFuntion);


// 예제) 해결 전
// let a = 'a';
// function functionB(){
//     let c = 'c';
//     console.log(a, b, c);
// }

// function functionA(){
//     let b = 'b';
//     console.log(a, b);
// }
// functionA();

// 예제) 해결 후
let a = 'a';

function functionA(){
    let b = 'b';
    function functionB(){
        let c = 'c';
        console.log(a, b, c);
    }
    functionB();
    console.log(a, b);
}
functionA();