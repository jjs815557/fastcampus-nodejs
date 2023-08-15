// 문서가 load 될 때 이 함수를 실행
// window.onload = function(){
//     //아이디가 'text'인 요소를 return 
//     let text = document.getElementById('text');
//     text.innerText = 'HTML 문서 loaded';
// }

// const aElement = document.querySelector('a');

// aElement.addEventListener('click',()=>{
//     alert('a element clicked');
// });

// const buttonElement = document.querySelector('.btn2');
// buttonElement.addEventListener('click',(event)=>{
//     let val;
//     val = event.target.id;

//     console.log(val);
// })

const submitBtn = document.querySelector('.submit-btn');


//click Event
// submitBtn.addEventListener('click', handleEvent);
// submitBtn.addEventListener('dblclick', handleEvent);
// submitBtn.addEventListener('mousedown', handleEvent);
// submitBtn.addEventListener('mouseup', handleEvent);
// submitBtn.addEventListener('mouseenter', handleEvent);
// submitBtn.addEventListener('mouseleave', handleEvent);
// submitBtn.addEventListener('mousemove', handleEvent);


//form Event
const form = document.querySelector('form');
const emailInput = document.getElementById('email');

form.addEventListener('submit', handleEvent); // form 안의 submit 버튼을 누르면 form안의 요소 이벤트가 발생
emailInput.addEventListener('keydown', handleEvent);
emailInput.addEventListener('keyup', handleEvent);
emailInput.addEventListener('keypress', handleEvent);
emailInput.addEventListener('focus', handleEvent);
emailInput.addEventListener('blur', handleEvent); // 커서가 밖으로 나갈때 실행
emailInput.addEventListener('cut', handleEvent); // input 텍스트를 잘라낼때 실행
emailInput.addEventListener('paste', handleEvent); // 붙여넣기 할때 실행
emailInput.addEventListener('input', handleEvent); // input 요소 값이 달라졌을 때


const title = document.querySelector('h2');

function handleEvent(e) {
    if(e.type ==='submit'){
        e.preventDefault(); // submit 버튼을 누를시 브라우저의 refreshf 기능을 막아줌
    }
    
    console.log(`Event type: ${e.type}`);
    
    // event.offsetX -> 요소로 부터의 거리 좌표 
    // event.clientX -> 윈도우로 부터의 거리 좌표
    // title.textContent = `Mousex : ${e.offsetX} Mousey : ${e.offsetY}`; 
    
    title.textContent = e.target.value; 
}