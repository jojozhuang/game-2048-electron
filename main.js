const {app, BrowserWindow, Menu, MenuItem} = require('electron')
const url = require('url')
const path = require('path')
const config = require('./package.json')
const electron = require('electron')

let win

app.on('ready', () => {	
    createWindow()
})

function createWindow() {
   win = new BrowserWindow({
        width: 530, 
        height: 740, 
        minWidth: 530,
        minHeight: 740,
        resizable: false,
        title: config.windowtitle,
        icon: path.join(__dirname, 'build/icons/64x64.png') })
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
   setMainMenu();
}
function addUpdateMenuItems (items, position) {
    if (process.mas) return
    items.splice.apply(items, [position, 0])
  }

function setMainMenu() {
    let template = [
        {
            label: 'View',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'toggledevtools'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetzoom'
                },
                {
                    type: 'separator'
                }
            ]
        },
        {
            role: 'window',
            submenu: [
                {
                    role: 'minimize'
                },
                {
                    role: 'close'
                }
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [{
                label: 'Learn More',
                click: function () {
                    electron.shell.openExternal('http://jojozhuang.github.io/blog/2016/11/03/build-cross-platform-apps-with-electron/')
                }
            }]
       }
    ];

    if (process.platform === 'darwin') {
        const name = config.windowtitle;
        template.unshift({
          label: name,
          submenu: [{
            label: `About ${name}`,
            role: 'about'
          }, {
            type: 'separator'
          }, {
            type: 'separator'
          }, {
            label: `Hide ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
          }, {
            label: 'Hide Others',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
          }, {
            label: 'Show All',
            role: 'unhide'
          }, {
            type: 'separator'
          }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
              app.quit()
            }
          }]
        })
            
        addUpdateMenuItems(template[0].submenu, 1)
    }
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

