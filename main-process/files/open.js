const { ipcMain, dialog } = require('electron');
const XLSX = require('xlsx');

ipcMain.on('open-file-dialog', event => {
  dialog.showOpenDialog(
    {
      properties: ['openFile'],
      filters: [{ name: 'xls文件', extensions: ['xls', 'xlsx'] }]
    },
    files => {
      if (files && files.length > 0) {
        let workbook = XLSX.readFile(files[0]);
        if (workbook.SheetNames.length > 0) {
          event.sender.send('selected-file', XLSX.utils.sheet_to_html(workbook.Sheets[workbook.SheetNames[0]]));
        }
      }
    }
  );
});
