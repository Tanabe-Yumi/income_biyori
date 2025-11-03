import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

// SQLiteに接続
const db = new sqlite3.Database('stocks.db', (err) => {
  if (err) {
    console.error('データベース接続エラー:', err.message);
  } else {
    console.log('データベース接続成功:', 'stocks.db');
  }
});

export default class SectorsTable {
  public async getAllSectors(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT
          *
        FROM sectors;
        `, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
