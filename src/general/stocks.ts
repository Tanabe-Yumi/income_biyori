export default class Stock {
  // PK
  private code: string;
  private name: string;
  // FK
  private market: number;
  // FK
  private sector: number;
  private created_at: Date;
  private updated_at: Date;

  constructor(code: string, name: string, market: number, sector: number, created_at: Date, updated_at: Date) {
    this.code = code;
    this.name = name;
    this.market = market;
    this.sector = sector;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public getCode(): string {
    return this.code;
  }

  public getName(): string {
    return this.name;
  }

  public getMarket(): number {
    return this.market;
  }

  public getSector(): number {
    return this.sector;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }

  public getUpdatedAt(): Date {
    return this.updated_at;
  }
}
