const nodemailer = require("nodemailer");
module.exports = async(email,subject,text)=>{
    try{
        var smtpTransport = nodemailer.createTransport(({
            host: "smtp.office365.com",
            port: 587,
            auth: {
              user: "graphicalpa@outlook.com",
              pass: "1qaz2wsx#E"
            }
          }));
          var mailOptions = {
            from: "GRAPHICAL PASSWORD AUTHENTICATION <graphicalpa@outlook.com>",
            to: email,
            subject: subject,
            html: `<a href=http://${text}>verify Email</a>`,
    
            
          }
          console.log(email);
        await smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log("Message Not Send", error);
            } else {
              console.log("Message sent!");
            }
          });

    }
    catch(err){

    }
}