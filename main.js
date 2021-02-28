const { app, BrowserWindow, Menu, ipcMain} = require('electron')



let currentSubject = ""
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600, 
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  //opens dev tools
  win.webContents.openDevTools()
  
  //build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu)
  win.loadFile('src/index.html')

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('current-subject', (event, ...args) => {
  currentSubject = args[0];
})

ipcMain.on('subjectname-message', (event, arg) => {
  event.returnValue = currentSubject
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


//create menu template
const mainMenuTemplate = [
  {
    label: 'quickFormula',
    submenu: [
      {
        label: 'Home',
        click(){
          win.loadFile('src/index.html')
        }
      },
      {
        label: 'Refresh',
        accelerator: 'ctrl+R',
        click() {
          win.reload()
        }

      },
      {
        label: 'Quit',
        click() {
          app.quit();
        }
      }
    ]
  }
];