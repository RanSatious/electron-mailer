/**
 * 发邮件 工具类
 * xuess<wuniu2010@126.com>
 * 2018年03月29日 修改
 */
const { emailName, emailPassword } = require('../mail.json'); //配置文件
const nodemailer = require('nodemailer'); //发邮件

const transporter = nodemailer.createTransport({
  //https://nodemailer.com/smtp/well-known/ 支持列表
  //https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json 配置
  // host: "smtp.exmail.qq.com", // 主机
  service: 'QQex',
  port: 465, // SMTP 端口
  secureConnection: true, // 使用 SSL
  auth: {
    user: emailName,
    pass: emailPassword
  }
});

/**
 * 发邮件 普通 html
 * @param {Object} title 标题
 * @param {Object} text 内容
 */
async function sendMailForHtml(title, toEmail, text) {
  //今天日期
  let mailOptions = {
    from: emailName, // 发件地址
    to: toEmail, // 收件列表
    subject: title, // 标题
    //text和html两者只支持一种
    html: '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' + text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = {
  sendMail: sendMailForHtml
};
