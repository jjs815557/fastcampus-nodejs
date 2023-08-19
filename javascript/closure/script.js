//closure innerFuntion 함수를 호출할때 
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
newFuntion('insid');