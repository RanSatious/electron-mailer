const { ipcMain } = require('electron');
const { sendMail } = require('../../lib/mail');
ipcMain.on('send-mail', (event, title, users) => {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    sendMail(title, user.email, user.html)
      .then(() => {
        event.sender.send('mail-sended', user, true);
      })
      .catch(error => {
        event.sender.send('mail-sended', user, false, error);
      });
  }
});
