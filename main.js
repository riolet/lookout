const electron = require('electron')
//const {app, Menu, Tray} = require('electron')
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./lookout.properties');

// Module to control application life.
const app = electron.app
const Tray = electron.Tray

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray=null

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 960, height: 600})
  mainWindow.setIcon('images/mailicon.png')
  if (tray == null) {
    tray = new Tray('images/mailicontray.png')
    tray.setToolTip('Lookout')
    //tray.setContextMenu(contextMenu)
    tray.on ('click', function (){
      if (mainWindow === null) {
        createWindow()
      } else {
        mainWindow.show()
      }
    })
  }

  // and load the index.html of the app.
  var url
  if(process.env.SERVER_URL) { 
    url = process.env.SERVER_URL;
  }
  else { 
    url = properties.get('server.url');
  }
  console.log(url)
  mainWindow.loadURL(url)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }

})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
