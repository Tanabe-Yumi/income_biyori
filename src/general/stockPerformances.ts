export default class StockPerformance {
  // PK
  code: string;
  price: number;
  dividend: number;
  yield: number;
  total_score: number;
  created_at: Date;
  updated_at: Date;

  constructor(code: string, price: number, dividend: number, dividend_yield: number, total_score: number, created_at: Date, updated_at: Date) {
    this.code = code;
    this.price = price;
    this.dividend = dividend;
    this.yield = dividend_yield;
    this.total_score = total_score;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
