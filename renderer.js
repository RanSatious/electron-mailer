const { ipcRenderer } = require('electron');

document.querySelector('#select').addEventListener('click', event => {
  ipcRenderer.send('open-file-dialog');
});

ipcRenderer.on('selected-file', (event, path) => {
  console.log(path);
});

document.querySelector('#send').addEventListener('click', () => {
  console.log('test');
});
