export default class StockData {
  private code: string;
  private name: string;
  private market: string;
  private sector: string;
  private price: number;
  private dividend: number;
  private yield: number;
  private total_score: number;
  private created_at: Date;
  private updated_at: Date;

  constructor(code: string, name: string, market: string, sector: string, price: number, dividend: number, dividend_yield: number, total_score: number, created_at: Date, updated_at: Date) {
    this.code = code;
    this.name = name;
    this.market = market;
    this.sector = sector;
    this.price = price
    this.dividend = dividend;
    this.yield = dividend_yield;
    this.total_score = total_score
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public getCode(): string {
    return this.code;
  }

  public getName(): string {
    return this.name;
  }

  public getMarket(): string {
    return this.market;
  }

  public getSector(): string {
    return this.sector;
  }

  public getPrice(): number {
    return this.price;
  }

  public getDividend(): number {
    return this.dividend;
  }

  public getYield(): number {
    return this.yield;
  }

  public getTotalScore(): number {
    return this.total_score;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }

  public getUpdatedAt(): Date {
    return this.updated_at;
  }
}
