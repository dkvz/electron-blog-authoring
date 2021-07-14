
const { app, shell } = require('electron');

const MenuTemplate = (mainWindow) => {
  const menu = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click() {
            mainWindow.webContents.send('newArticle');
          }
        },
        {
          label: 'Open JSON',
          accelerator: 'CmdOrCtrl+O',
          click() {
            mainWindow.webContents.send('openJSON');
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click() {
            mainWindow.webContents.send('saveJSON');
          }
        },
        {
          'label': 'Save as JSON',
          accelerator: 'CmdOrCtrl+Shift+S',
          click() {
            mainWindow.webContents.send('saveJSON', true);
          }
        },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { type: 'separator' },
        {
          label: 'Find',
          accelerator: 'CmdOrCtrl+F',
          click() {
            mainWindow.webContents.send('showSearchBox');
          }
        },
        { type: 'separator' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Insert',
      submenu: [
        {
          label: 'Paragraph',
          accelerator: 'CmdOrCtrl+Enter',
          // Note for later: click gets an event object as param.
          click() {
            mainWindow.webContents.send('insertElement', 'p');
          }
        },
        {
          label: 'Link',
          accelerator: 'CmdOrCtrl+Shift+l',
          click() {
            mainWindow.webContents.send('insertElement', 'a');
          }
        },
        {
          label: 'Local link',
          accelerator: 'CmdOrCtrl+h',
          click() {
            mainWindow.webContents.send('insertElement', 'a-int');
          }
        },
        {
          label: 'Image',
          accelerator: 'CmdOrCtrl+i',
          click() {
            mainWindow.webContents.send('insertElement', 'img');
          }
        },
        {
          label: 'Small image',
          accelerator: 'CmdOrCtrl+Shift+m',
          click() {
            mainWindow.webContents.send('insertElement', 'img-sm');
          }
        },
        {
          label: 'Image gallery',
          accelerator: 'CmdOrCtrl+Shift+g',
          click() {
            mainWindow.webContents.send('insertElement', 'img-gal');
          }
        },
        {
          label: 'Video',
          accelerator: 'CmdOrCtrl+Shift+i',
          click() {
            mainWindow.webContents.send('insertElement', 'video');
          }
        },
        {
          label: 'Code',
          accelerator: 'CmdOrCtrl+Shift+e',
          click() {
            mainWindow.webContents.send('insertElement', 'code');
          }
        },
        {
          label: 'Italic text',
          accelerator: 'CmdOrCtrl+i',
          click() {
            mainWindow.webContents.send('insertElement', 'i');
          }
        },
        {
          label: 'Bold text',
          accelerator: 'CmdOrCtrl+b',
          click() {
            mainWindow.webContents.send('insertElement', 'b');
          }
        },
        {
          label: 'Strike through text',
          accelerator: 'CmdOrCtrl+t',
          click() {
            mainWindow.webContents.send('insertElement', 'strike');
          }
        }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { shell.openExternal('https://dkvz.eu') }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    menu.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })

    // Edit menu
    menu[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    )

    // Window menu
    menu[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  }

  return menu;
};

module.exports = MenuTemplate;