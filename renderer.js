const { ipcRenderer } = require('electron');
const Isemail = require('isemail');

let btnSelect = $('#select');
let btnSend = $('#send');
btnSelect.on('click', () => {
  ipcRenderer.send('open-file-dialog');
});

ipcRenderer.on('selected-file', (event, html) => {
  $('#content').html($(html)[2]);
  $('#result').html('');
});
ipcRenderer.on('mail-sended', (event, user, isSuccess, err) => {
  let msg = isSuccess ? '发送成功' : `发送失败 [${JSON.stringify(err)}]`;
  $('#result').append($('<p>').html(`${user.name} ${msg}`));
});

btnSend.on('click', () => {
  try {
    let userInfos = [];
    let title =
      $('#title')
        .val()
        .trim() || '无标题';
    let head = $('table').find('tr')[0].outerHTML;
    $('table')
      .find('tr')
      .each((i, e) => {
        if (i > 0) {
          let name = $(e).find('td')[0].innerHTML;
          let email = $(e).find('td')[1].innerHTML;
          let tr = $(e.outerHTML);
          tr.find('td')[1].remove();

          userInfos.push({
            name,
            email,
            html: $('<table>')
              .append(head)
              .append(tr)[0].outerHTML
          });
          console.log(userInfos);
        }
      });

    if (userInfos.length == 0) {
      alert('无有效数据');
      return;
    }
    if (!userInfos.every(d => Isemail.validate(d.email))) {
      alert(`${d.name} 邮箱设置错误`);
      return;
    }

    ipcRenderer.send('send-mail', title, userInfos);
  } catch (error) {
    alert('文件解析失败');
  }
});
