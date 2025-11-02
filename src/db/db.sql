-- 外部キー制約を有効化
PRAGMA foreign_keys = ON;

-- stocksテーブル
CREATE TABLE IF NOT EXISTS markets (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

-- sectorsテーブル
CREATE TABLE IF NOT EXISTS sectors (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

-- stocksテーブル
CREATE TABLE IF NOT EXISTS stocks (
  code TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  market INTEGER,
  sector INTEGER,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY(market) REFERENCES markets(id),
  FOREIGN KEY(sector) REFERENCES sectors(id)
);

-- stockPerformancesテーブル
CREATE TABLE IF NOT EXISTS stockPerformances (
  code TEXT PRIMARY KEY NOT NULL,
  price INTEGER,
  dividend INTEGER,
  yield REAL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY(code) REFERENCES stocks(code)
);

-- scoresテーブル
CREATE TABLE IF NOT EXISTS scores (
  code TEXT PRIMARY KEY NOT NULL,
  total_score INTEGER,
  sales_score INTEGER,
  operating_profit_score INTEGER,
  eps_score INTEGER,
  equity_ratio_score INTEGER,
  sales_cf_score INTEGER,
  cash_score INTEGER,
  dividend_per_share_score INTEGER,
  dividend_payout_ratio_score INTEGER,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- 初期データ挿入
INSERT INTO markets (id, name) VALUES (1, "東証PRM");
INSERT INTO markets (id, name) VALUES (2, "東証STD");
INSERT INTO markets (id, name) VALUES (3, "東証GRT");

INSERT INTO sectors (id, name) VALUES (1, "水産・農林業");
INSERT INTO sectors (id, name) VALUES (2, "鉱業");
INSERT INTO sectors (id, name) VALUES (3, "建設業");
INSERT INTO sectors (id, name) VALUES (4, "食料品");
INSERT INTO sectors (id, name) VALUES (5, "繊維製品");
INSERT INTO sectors (id, name) VALUES (6, "パルプ・紙");
INSERT INTO sectors (id, name) VALUES (7, "化学");
INSERT INTO sectors (id, name) VALUES (8, "医薬品");
INSERT INTO sectors (id, name) VALUES (9, "石油・石炭製品");
INSERT INTO sectors (id, name) VALUES (10, "ゴム製品");
INSERT INTO sectors (id, name) VALUES (11, "ガラス・土石製品");
INSERT INTO sectors (id, name) VALUES (12, "鉄鋼");
INSERT INTO sectors (id, name) VALUES (13, "非鉄金属");
INSERT INTO sectors (id, name) VALUES (14, "金属製品");
INSERT INTO sectors (id, name) VALUES (15, "機械");
INSERT INTO sectors (id, name) VALUES (16, "電気機器");
INSERT INTO sectors (id, name) VALUES (17, "輸送用機器");
INSERT INTO sectors (id, name) VALUES (18, "精密機器");
INSERT INTO sectors (id, name) VALUES (19, "その他製品");
INSERT INTO sectors (id, name) VALUES (20, "電気・ガス業");
INSERT INTO sectors (id, name) VALUES (21, "陸運業");
INSERT INTO sectors (id, name) VALUES (22, "海運業");
INSERT INTO sectors (id, name) VALUES (23, "空運業");
INSERT INTO sectors (id, name) VALUES (24, "倉庫・運輸関連業");
INSERT INTO sectors (id, name) VALUES (25, "情報・通信業");
INSERT INTO sectors (id, name) VALUES (26, "卸売業");
INSERT INTO sectors (id, name) VALUES (27, "小売業");
INSERT INTO sectors (id, name) VALUES (28, "銀行業");
INSERT INTO sectors (id, name) VALUES (29, "証券業");
INSERT INTO sectors (id, name) VALUES (30, "保険業");
INSERT INTO sectors (id, name) VALUES (31, "その他金融業");
INSERT INTO sectors (id, name) VALUES (32, "不動産業");
INSERT INTO sectors (id, name) VALUES (33, "サービス業");
INSERT INTO sectors (id, name) VALUES (34, "REIT");
INSERT INTO sectors (id, name) VALUES (99, "分類外");
  