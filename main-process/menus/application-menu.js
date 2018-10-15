const { BrowserWindow, Menu, app, shell, dialog } = require('electron');

let template = [
  {
    label: '帮助',
    role: 'help',
    submenu: []
  }
];

function addUpdateMenuItems(items, position) {
  if (process.mas) return;

  const version = app.getVersion();
  let updateItems = [
    {
      label: `版本 ${version}`
    }
  ];

  items.splice.apply(items, [position, 0].concat(updateItems));
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu;
  addUpdateMenuItems(helpMenu, 0);
}

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
