const mailer = require('nodemailer');
const  welcome  = require('./welcome_template');
const  goodbye  = require('./goodbye_template');
const getEmailData = (to, name, template) => {
    let data = null; 

    switch (template) {
        case 'welcome' : data = {
            from : '',
            to : to,
            subject : `Hello ${name}`,
            html : welcome()
        }
        break;

        case 'goodbye' : data = {
            from : '',
            to : to,
            subject : `goodbye ${name}`,
            html : goodbye()
        }
        break;

        default : data 
    }
    return data;
}

const sendMail = (to, name, type) => {
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jjs81555@gmail.com',
            pass: '' // 구글 smtp 서버를 사용시 2차 인증설정 후 생성된 비번을 넣어서 사용
        }
    });
    
    const mail = getEmailData(to, name, type);
    transporter.sendMail(mail,(error, response)=>{
        if(error){
            console.log(error);
        }else{
            console.log('email sent successfully');
        }
        transporter.close();
    });
}

module.exports = sendMail;