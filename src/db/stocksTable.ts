import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

import StockData from "../general/stockData.ts";
import MarketsTable from './marketsTable.ts';
import SectorsTable from './sectorsTable.ts';

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
          scores.total_score,
          s.created_at,
          s.updated_at
        FROM stocks AS s
        INNER JOIN stockPerformances AS p ON s.code = p.code
        LEFT JOIN markets AS m ON s.market = m.id
        LEFT JOIN sectors AS t ON s.sector = t.id
        -- INNER JOIN scores ON s.code = scores.code;
        LEFT JOIN scores ON s.code = scores.code;
        `, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }

  public async upsertStocks(stocks: any[]): Promise<Boolean> {
    if (!stocks || stocks.length === 0) return true;

    const marketsTable = new MarketsTable();
    const markets = await marketsTable.getAllMarkets();

    const sectorsTable = new SectorsTable();
    const sectors = await sectorsTable.getAllSectors();

    const insertSql = `
      INSERT INTO stocks (code, name, market, sector, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(code) DO UPDATE SET
        name = excluded.name,
        market = excluded.market,
        sector = excluded.sector,
        updated_at = excluded.updated_at
    `;

    const runAsync = (sql: string, params: any[] = []) =>
      new Promise<void>((resolve, reject) => {
        db.run(sql, params, function (err: Error | null) {
          err ? reject(err) : resolve();
        });
      });

    try {
      // トランザクションを開始
      await runAsync('BEGIN TRANSACTION');

      for (const s of stocks) {
        const market = markets.find((m: any) => m.name === s.market);
        const market_id = market ? market.id : null;
        const sector = sectors.find((sec: any) => sec.name === s.sector);
        const sector_id = sector ? sector.id : null;
        const now = new Date().toISOString();

        const params = [
          s.code,
          s.name,
          market_id,
          sector_id,
          s.created_at ?? now,
          s.updated_at ?? now,
        ];
        await runAsync(insertSql, params);
      }

      await runAsync('COMMIT');
      return true;
    } catch (err) {
      try {
        await runAsync('ROLLBACK');
      } catch (rollbackErr) {
        console.error('Rollback failed', rollbackErr);
      }
      throw err;
    }
  }

  public async upsertStockPerformances(stocks: any[]): Promise<Boolean> {
    if (!stocks || stocks.length === 0) return true;

    const insertSql = `
      INSERT INTO stockPerformances (code, price, dividend, yield, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(code) DO UPDATE SET
        price = excluded.price,
        dividend = excluded.dividend,
        yield = excluded.yield,
        updated_at = excluded.updated_at
    `;

    const runAsync = (sql: string, params: any[] = []) =>
      new Promise<void>((resolve, reject) => {
        db.run(sql, params, function (err: Error | null) {
          err ? reject(err) : resolve();
        });
      });

    try {
      await runAsync('BEGIN TRANSACTION');

      for (const s of stocks) {
        const now = new Date().toISOString();

        const params = [
          s.code,
          s.price,
          s.dividend,
          s.yield,
          s.created_at ?? now,
          s.updated_at ?? now,
        ];
        await runAsync(insertSql, params);
      }

      await runAsync('COMMIT');
      return true;
    } catch (err) {
      try {
        await runAsync('ROLLBACK');
      } catch (rollbackErr) {
        console.error('Rollback failed', rollbackErr);
      }
      throw err;
    }
  }
}
