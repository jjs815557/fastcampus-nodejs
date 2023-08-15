// let user = {
//     name : 'John',
//     age : 30,

// }

// console.log(user.name);
// console.log(user.hasOwnProperty('email'));

// function Person(name, email, birthday) {
//     this.name = name;
//     this.email = email;
//     this.birthday = birthday;
//     this.calculateAge = function () {
//         const diff = Date.new()-this.birthday.getTime();
//         const ageDate = new Date(diff);
//         return Math.abs(ageDate.getUTCFullYear() - 1970);
//     }
// }

// const john = new Person('John', 'jjs815@naver.com', '7-10-91');
// const han = new Person('Han', 'jjs815@gmail.com', '2-11-91');

// console.log(john);
// console.log(han);

// // prototype(object객체)에 calculateAge함수를 넣어서
// // 다른 클래스에서 객체 생성시 꺼내어 사용 가능하다
// Person.prototype.calculateAge = function () { 
//         const diff = Date.new()-this.birthday.getTime();
//         const ageDate = new Date(diff);
//         return Math.abs(ageDate.getUTCFullYear() - 1970);
// };

function Person(name, email, birthday) {
    // Person 객체를 생성할시 최상위 object객체에 personsPrototype(커스텀 속성)를 주입시킨다
    const person = Object.create(personsPrototype); 
    this.name = name;
    this.email = email;
    this.birthday = birthday;
}

const personsPrototype = function () { 
    calculateAge = function () {
        const diff = Date.new()-this.birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
