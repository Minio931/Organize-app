const { app, BrowserWindow, screen } = require("electron");

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();

  const { width, height } = primaryDisplay.workAreaSize;
  let factor = primaryDisplay.scaleFactor;

  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      zoomFactor: 1.0 / factor,
    },
    autoHideMenuBar: true,
  });

  win.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
