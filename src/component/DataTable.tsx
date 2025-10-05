import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

// カラム定義
const columns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Code',
    width: 70 },
  {
    field: 'name',
    headerName: 'Name',
    width: 130
  },
  {
    field: 'industry',
    headerName: 'Industry',
    type: 'string',
    width: 130
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 90,
  },
  {
    field: 'dividend',
    headerName: 'Dividend',
    type: 'number',
    width: 90,
  },
  {
    field: 'yield',
    headerName: 'Yield',
    type: 'number',
    width: 90,
  },
  {
    field: 'totalScore',
    headerName: 'Score',
    // description: 'This column has a value getter.',
    type: 'number',
    width: 70,
    // valueGetter: (value, row) => sum(row.scores.values),
  },
];

// ダミーデータ
const rows = [
  // ID必須
  {
    id: 1,
    code: "8306",
    name: "三菱ＵＦＪフィナンシャル・グループ",
    industry: "銀行業",
    price: 1450,
    dividend: 55,
    yield: 3.79,
    totalScore: 34,
    // scores: {
    //   sales: 4,
    //   operatingMargin: 4,
    //   eps: 5,
    //   equityRatio: 3,
    //   operatingCF: 5,
    //   cash: 4,
    //   dividendStability: 4,
    //   payoutRatio: 5,
    // },
  },
  {
    id: 2,
    code: "4502",
    name: "武田薬品工業",
    industry: "医薬品",
    price: 4500,
    dividend: 180,
    yield: 4.0,
    totalScore: 28,
    // scores: {
    //   sales: 3,
    //   operatingMargin: 4,
    //   eps: 3,
    //   equityRatio: 3,
    //   operatingCF: 3,
    //   cash: 3,
    //   dividendStability: 5,
    //   payoutRatio: 4,
    // },
  },
  {
    id: 3,
    code: "9432",
    name: "日本電信電話（ＮＴＴ）",
    industry: "情報・通信業",
    price: 185,
    dividend: 6.0,
    yield: 3.24,
    totalScore: 38,
    // scores: {
    //   sales: 5,
    //   operatingMargin: 5,
    //   eps: 5,
    //   equityRatio: 5,
    //   operatingCF: 4,
    //   cash: 4,
    //   dividendStability: 5,
    //   payoutRatio: 5,
    // },
  },
  {
    id: 4,
    code: "2914",
    name: "日本たばこ産業（ＪＴ）",
    industry: "食料品",
    price: 3950,
    dividend: 200,
    yield: 5.06,
    totalScore: 36,
    // scores: {
    //   sales: 4,
    //   operatingMargin: 4,
    //   eps: 4,
    //   equityRatio: 4,
    //   operatingCF: 5,
    //   cash: 5,
    //   dividendStability: 5,
    //   payoutRatio: 5,
    // },
  },
  {
    id: 5,
    code: "5020",
    name: "ＥＮＥＯＳホールディングス",
    industry: "石油・石炭製品",
    price: 610,
    dividend: 28,
    yield: 4.59,
    totalScore: 30,
    // scores: {
    //   sales: 3,
    //   operatingMargin: 3,
    //   eps: 3,
    //   equityRatio: 3,
    //   operatingCF: 4,
    //   cash: 3,
    //   dividendStability: 4,
    //   payoutRatio: 3,
    // },
  },  
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 30, 50]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
