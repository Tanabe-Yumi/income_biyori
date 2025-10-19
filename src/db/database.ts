import { createRequire } from 'module';
import { promisify } from "util";

const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

export default abstract class Database {
  protected dbGet;
  protected dbAll;
  protected dbRun;

  constructor() {
    const db = new sqlite3.Database('stocks.db');
    this.dbGet = promisify(db.get.bind(db));
    this.dbAll = promisify(db.all.bind(db));
    this.dbRun = function (arg: string) {
      return new Promise<any>((resolve, reject) => {
        db.run.apply(db, [
          arg,
          function (this: sqlite3.Database, err: Error) {
            err ? reject(err) : resolve(this)
          }
        ]
        );
      });
    }
  }
}
