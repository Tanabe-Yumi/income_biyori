import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import StocksTable from '../src/db/stocksTable.ts'
import fetchDividendRanking from '../src/main/scrapeYahoo.ts'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minHeight: 200,
    minWidth: 300,
    title: 'インカム日和',
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  // デベロッパーツールを別ウィンドウで起動
  win.webContents.openDevTools({ mode: 'detach' });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

// 参照: 全ての株式情報を取得
ipcMain.handle('getAllStocks', async () => {
  try {
    const stocksTable = new StocksTable();
    const stocks = await stocksTable.getAllStocks();
    return stocks;
  } catch (error) {
    console.error('getAllStocks:', error);
    throw new Error('株式情報の取得に失敗しました');
  }
});

// 高配当株リストを取得してDBに保存する
ipcMain.handle('getHighDivendStocks', async () => {
  try {
    const yieldThreshold = 6;
    console.log('Fetching high dividend stocks with yield >=', yieldThreshold);
    const stocks = await fetchDividendRanking(yieldThreshold);
    // DBに保存
    console.log('Updating database...');
    const stocksTable = new StocksTable();
    const result_stocks = await stocksTable.upsertStocks(stocks);
    const result_stockperformances = await stocksTable.upsertStockPerformances(stocks);
    console.log('Database update completed.');
    return result_stocks && result_stockperformances;

    // DBから取得し直す
  } catch (error) {
    console.error('getHighDivendStocks:', error);
    throw new Error('高配当株リストの更新に失敗しました');
  }
});
