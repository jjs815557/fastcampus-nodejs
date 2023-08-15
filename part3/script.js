function calculateHandler(){
   let loan = $("#loan").val();
   let interest = $("#interest").val();
   let period = $("#period").val();

   loan = parseFloat(loan);
   interest = parseFloat(interest);
   period = parseFloat(period);

   let interestMonth = interest / 12 / 100;
   let div1 = loan * interestMonth * (1+interestMonth)** period; //분자
   let div2 = (1+interestMonth)**period -1;

   let result = div1 / div2;
   let resultText = `고객님의 ${period}개월동안 월 상환액은 <mark> ${Math.round(result).toLocaleString()}원</mark> 입니다`
   $("#result").html(resultText); // <mark></mark> -> html 태그를 사용해야하므로 html형식으로 출력
   //    $("#result").text(resultText); // 문자형식 그대로 출력
}

$(document).ready(function(){
    $("#calculate").click(calculateHandler);
});