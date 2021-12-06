const nodemailer = require("nodemailer");
const ejs=require("ejs");
const path=require("path");
const signupPath=path.join(__dirname,"../templates/welcomesignup.ejs");
const resetPath=path.join(__dirname,"../templates/resetPass.ejs");
/*var transport = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS,
    }
  });*/

  var transport = nodemailer.createTransport({
    service:process.env.SMTP_SERVICE,
    auth: {
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS,
    }
  });

exports.sendWelcomeMail=async function(email){
  const data = await ejs.renderFile(signupPath,{ name: 'Mahendra Kumar Sahu' });
  const mainOptions = {
    from: 'mahendrasahu1212@gmail.com',
    to: email,
    subject: 'welcomeMail',
    html: data
  };
  
  transport.sendMail(mainOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });

}

exports.sendResetPasswordMail=async function(email,token){
  const data = await ejs.renderFile(resetPath,{token});
  const mainOptions = {
    from: 'mahendrasahu1212@gmail.com',
    to: email,
    subject: 'welcomeMail',
    html: data
  };
   await transport.sendMail(mainOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
}