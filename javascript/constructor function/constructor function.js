// 생성자 함수 : 자바스크립트 함수는 재사용 가능한 코드를 묶음으로 사용하는 것 외에 객체를 생성 하기 위한 방법으로도 사용된다.

function Item(title,price){ // 생성자 함수명은 첫글자 대문자
    //함수 내부에는 this = {} and retrun this 가 각각 생략 되어있다고 생각하면 편함
    
    // this = {}

    this.title = title;
    this.price = price;
    this.showPrice = function(){
        console.log(`가격은 ${price}원 입니다`);
    }

    // retrun this;
}

const item1 = new Item('인형', 3000); // new 키워드로 생성
const item2 = new Item('가방', 4000);
const item3 = new Item('지갑', 5000);

console.log(item1, item2, item3);