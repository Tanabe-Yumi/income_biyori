import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

import StockData from "../general/stockData.ts";

// SQLiteに接続
const db = new sqlite3.Database('stocks.db', (err) => {
  if (err) {
    console.error('データベース接続エラー:', err.message);
  } else {
    console.log('データベース接続成功:', 'stocks.db');
  }
});

export default class StocksTable {
  public async getAllStocks(): Promise<StockData[]> {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT
          s.code,
          s.name AS name,
          m.name AS market,
          t.name AS sector,
          p.price AS price,
          p.dividend AS dividend,
          p.yield AS yield,
          p.total_score AS total_score,
          s.created_at,
          s.updated_at
        FROM stocks AS s
        INNER JOIN markets AS m ON s.market = m.id
        INNER JOIN sectors AS t ON s.sector = t.id
        INNER JOIN stockPerformances AS p ON s.code = p.code;
        `, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
