import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('stocks.db', (err: Error | null) => {
  if (err) {
    console.error('DB open error:', err);
    return;
  }
  db.run(`CREATE TABLE IF NOT EXISTS stocks (
    code TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    market INTEGER,
    sector INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`, (err2: Error | null) => {
    if (err2) console.error('Create table error:', err2);
    else console.log('Table ensured.');
    // db.close();
  });

  db.run(`INSERT INTO stocks (code, name, market, sector, created_at, updated_at)
    VALUES (
      "7203",
      "トヨタ自動車",
      1,
      17,
      "${new Date().toISOString()}",
      "${new Date().toISOString()}"
    )`, (err2: Error | null) => {
    if (err2) console.error('Create table error:', err2);
    else console.log('Inserted.');
    db.close();
  });
});

  // FOREIGN KEY(market) REFERENCES markets(id),
  // FOREIGN KEY(sector) REFERENCES sectors(id),
