var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire as createRequire$1 } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRequire } from "module";
import { promisify } from "util";
const require$1 = createRequire(import.meta.url);
const sqlite3$1 = require$1("sqlite3").verbose();
class Database {
  constructor() {
    __publicField(this, "dbGet");
    __publicField(this, "dbAll");
    __publicField(this, "dbRun");
    const db2 = new sqlite3$1.Database("stocks.db");
    this.dbGet = promisify(db2.get.bind(db2));
    this.dbAll = promisify(db2.all.bind(db2));
    this.dbRun = function(arg) {
      return new Promise((resolve, reject) => {
        db2.run.apply(
          db2,
          [
            arg,
            function(err) {
              err ? reject(err) : resolve(this);
            }
          ]
        );
      });
    };
  }
}
const require2 = createRequire(import.meta.url);
const sqlite3 = require2("sqlite3").verbose();
const db = new sqlite3.Database("stocks.db", (err) => {
  if (err) {
    console.error("データベース接続エラー:", err.message);
  } else {
    console.log("データベース接続成功:", "stocks.db");
  }
});
class StocksTable extends Database {
  async getAllStocks() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM stocks", (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  // public async selectStockByCode(code: string) {
  //   const data = await this.dbGet(`SELECT * FROM stocks WHERE code = "${code}"`);
  //   return new Stock(data.code, data.name, data.market, data.sector, data.created_at, data.updated_at);
  // }
}
createRequire$1(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minHeight: 200,
    minWidth: 300,
    title: "インカム日和",
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.webContents.openDevTools({ mode: "detach" });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
ipcMain.handle("getAllStocks", async () => {
  try {
    const stocksTable = new StocksTable();
    const stocks = await stocksTable.getAllStocks();
    return stocks;
  } catch (error) {
    console.error("getAllStocks:", error);
    throw new Error("株式情報の取得に失敗しました");
  }
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
