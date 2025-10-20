import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

import Stock from "../general/stock.ts";
import Database from "./database.ts";

// SQLiteに接続
const db = new sqlite3.Database('stocks.db', (err) => {
  if (err) {
    console.error('データベース接続エラー:', err.message);
  } else {
    console.log('データベース接続成功:', 'stocks.db');
  }
});

// FOREIGN KEY(market) REFERENCES markets(id),
// FOREIGN KEY(sector) REFERENCES sectors(id),

export default class StocksTable {
  public async getAllStocks(): Promise<Stock[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM stocks', (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
