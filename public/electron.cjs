const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./public/vite.svg",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
    // webPreferences: { preload: join(__dirname, "main.tsx") },
  });

  // Load correctly url
  const url = isDev
    ? `http://127.0.0.1:3000/`
    : `file://${join(__dirname, "..", "build", "index.html")}`;
  // const url = 'C:\\Users\\Colla\\Desktop\\Programming\\electron\\template-react-electron\\build\\index.html';
  win.loadURL(url);
  // Open the DevTools.
  isDev && win.webContents.openDevTools();
}

// app ready
app.whenReady().then(() => {
  createWindow();

  app.on(
    "activate",
    () => BrowserWindow.getAllWindows().length === 0 && createWindow
  );
});
// close all win
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());
