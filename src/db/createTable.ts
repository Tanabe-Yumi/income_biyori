import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = 'stocks.db'
const sqlFile = path.join(__dirname, 'db.sql');

const sql = fs.readFileSync(sqlFile, 'utf8');

const db = new sqlite3.Database(dbFile, (err: Error | null) => {
  if (err) {
    console.error('DB open error:', err);
    return;
  }

  db.serialize(() => {
    // DB初期セットアップ
    db.exec(sql, (execErr: Error | null) => {
      if (execErr) {
        console.error('Create table error:', execErr);
        db.close();
        return;
      }
      console.log('Table ensured.');

      // テストデータ挿入
      const now = new Date().toISOString();
      db.run(
        `INSERT OR IGNORE INTO stocks (code, name, market, sector, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
        ['7203', 'トヨタ自動車', 1, 17, now, now],
        function (stockInsertErr: Error | null) {
          if (stockInsertErr) {
            console.error('Insert stocks error:', stockInsertErr);
            db.close();
            return;
          }
          console.log('Insert stocks succeeded.');

          // 続けて stockPerformances に挿入
          db.run(
            `INSERT OR IGNORE INTO stockPerformances (code, price, dividend, yield, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
            ['7203', 1450, 55, 3.79, now, now],
            function (perfInsertErr: Error | null) {
              if (perfInsertErr) {
                console.error('Insert stockPerformances error:', perfInsertErr);
                db.close();
                return;
              }
              console.log('Insert stockPerformances succeeded.');

              db.run(
                `INSERT OR IGNORE INTO scores (
                  code,
                  total_score,
                  sales_score,
                  operating_profit_score,
                  eps_score,
                  equity_ratio_score,
                  sales_cf_score,
                  cash_score,
                  dividend_per_share_score,
                  dividend_payout_ratio_score,
                  created_at,
                  updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                ['7203', 32, 3, 5, 3, 5, 5, 5, 1, 5, now, now],
                function (scoreInsertErr: Error | null) {
                  if (scoreInsertErr) {
                    console.error('Insert scores error:', scoreInsertErr);
                  } else {
                    console.log('Insert scores succeeded.');
                  }

                  // 最後に一度だけ閉じる
                  db.close((closeErr: Error | null) => {
                    if (closeErr) console.error('DB close error:', closeErr);
                  });
                }
              );
            }
          );
        }
      );
    });
  });
});
