// class Person{
//     constructor(name, email, birthday){
//         this.name = name;
//         this.email = email;
//         this.birthday = new Date(birthday);
//     }
//     //클래스 생성시 해당 클래스의 object에 
//     //Object.create(personsPrototype) OR Person.prototype.calculateAge 과 같이
//     //사용하고자 하는 속성 값을 주입시켰으나 
//     //ES6 부터는 속성을 주입시키지 않아도 자동(introduce()가)으로 들어가짐
//     introduce(){
//         return `Hello my name is ${this.name}`;
//     }
    
//     // static은 해당 클래스 객체의 constructor속성에 포함된다
//     // static 함수를 사용할려면 객체에서 접근하는게 아니라 클래스 이름으로 접근한다
//     // 예) Person.multipleNumbers(2,3)
//     static multipleNumbers(x,y){ 
//         return x*y;
//     }
// }

// const john = new Person('john', 'john@example.com','10-3-98');
// console.log(john);

class Person{
    constructor(name, email){
        this.name = name;
        this.email = email;
    }
    introduce(){
        return `Hello my name is ${this.name}`;
    }
}

class Client extends Person{
    constructor(name, email, phone, address){
        super(name, email);

        this.phone = phone;
        this.address = address;
    }
    
}

const john = new Client('john', 'john@example.com', '123-456-78', 'New York');
console.log(john.introduce());

class Car{
    constructor(brand){
        this.carname = brand;
    }
    present(){
        return 'i have ' + this.carname;
    }
}

// super 키워드의 사용법
// 1. super키워드를 사용하여 부모클래스의 생성자를 호출
// 2. 부모클래스의 메소드를 호출
class Model extends Car{
    constructor(brand, mod){
        super(brand); // 부모클래스 생성자 호출
        this.model = mod;
    }
    show(){
        // console.log(this.present());
        return super.present() + ', it is a '+ this.model; // 부모클래스의 메소드 호출
    }
}
const test = new Model('Ford', 'Mustang');
console.log(test.present());
console.log(test.show());