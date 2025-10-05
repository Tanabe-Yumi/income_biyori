import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  // jaJP
} from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';

// カラム定義
const columns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'コード',
    type: 'string',
    align: 'center',
    flex: 1.0,
  },
  {
    field: 'name',
    headerName: '名称',
    type: 'string',
    align: 'left',
    flex: 2.0,
  },
  {
    field: 'sector',
    headerName: 'セクター',
    type: 'string',
    align: 'left',
    flex: 1.5,
  },
  {
    field: 'price',
    headerName: '株価',
    type: 'number',
    align: 'right',
    flex: 1.0,
  },
  {
    field: 'dividend',
    headerName: '一株配当',
    type: 'number',
    align: 'right',
    flex: 1.0,
  },
  {
    field: 'yield',
    headerName: '配当利回り',
    type: 'number',
    align: 'right',
    flex: 1.0,
    valueFormatter: (value, row) => `${row.yield}%`,
  },
  {
    field: 'totalScore',
    headerName: 'スコア',
    type: 'number',
    flex: 1.0,
    // valueGetter: (value, row) => sum(row.scores.values),
  },
];

// ダミーデータ
const rows = [
  {
    id: 1,
    code: "8306",
    name: "三菱ＵＦＪフィナンシャル・グループ",
    sector: "銀行業",
    price: 1450,
    dividend: 55,
    yield: 3.79,
    totalScore: 34,
  },
  {
    id: 2,
    code: "4502",
    name: "武田薬品工業",
    sector: "医薬品",
    price: 4500,
    dividend: 180,
    yield: 4.0,
    totalScore: 28,
  },
  {
    id: 3,
    code: "9432",
    name: "日本電信電話（ＮＴＴ）",
    sector: "情報・通信業",
    price: 185,
    dividend: 6.0,
    yield: 3.24,
    totalScore: 38,
  },
  {
    id: 4,
    code: "2914",
    name: "日本たばこ産業（ＪＴ）",
    sector: "食料品",
    price: 3950,
    dividend: 200,
    yield: 5.06,
    totalScore: 36,
  },
  {
    id: 5,
    code: "5020",
    name: "ＥＮＥＯＳホールディングス",
    sector: "石油・石炭製品",
    price: 610,
    dividend: 28,
    yield: 4.59,
    totalScore: 30,
  },
  {
    id: 6,
    code: "8058",
    name: "三菱商事",
    sector: "卸売業",
    price: 3400,
    dividend: 180,
    yield: 5.29,
    totalScore: 37,
  },
  {
    id: 7,
    code: "8591",
    name: "オリックス",
    sector: "その他金融業",
    price: 2870,
    dividend: 100,
    yield: 3.48,
    totalScore: 33,
  },
  {
    id: 8,
    code: "3382",
    name: "セブン＆アイ・ホールディングス",
    sector: "小売業",
    price: 6500,
    dividend: 220,
    yield: 3.38,
    totalScore: 31,
  },
  {
    id: 9,
    code: "4503",
    name: "アステラス製薬",
    sector: "医薬品",
    price: 1650,
    dividend: 70,
    yield: 4.24,
    totalScore: 29,
  },
  {
    id: 10,
    code: "9202",
    name: "ＡＮＡホールディングス",
    sector: "空運業",
    price: 3250,
    dividend: 120,
    yield: 3.69,
    totalScore: 27,
  },
  {
    id: 11,
    code: "6758",
    name: "ソニーグループ",
    sector: "電気機器",
    price: 13800,
    dividend: 280,
    yield: 2.03,
    totalScore: 35,
  },
  {
    id: 12,
    code: "7203",
    name: "トヨタ自動車",
    sector: "輸送用機器",
    price: 3100,
    dividend: 140,
    yield: 4.52,
    totalScore: 37,
  },
  {
    id: 13,
    code: "7751",
    name: "キヤノン",
    sector: "電気機器",
    price: 4400,
    dividend: 190,
    yield: 4.32,
    totalScore: 32,
  },
  {
    id: 14,
    code: "4063",
    name: "信越化学工業",
    sector: "化学",
    price: 6000,
    dividend: 270,
    yield: 4.5,
    totalScore: 39,
  },
  {
    id: 15,
    code: "8031",
    name: "三井物産",
    sector: "卸売業",
    price: 3400,
    dividend: 160,
    yield: 4.7,
    totalScore: 36,
  },
  {
    id: 16,
    code: "8316",
    name: "三井住友フィナンシャルグループ",
    sector: "銀行業",
    price: 7800,
    dividend: 340,
    yield: 4.36,
    totalScore: 35,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  return (
    // <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 30, 50]}
        checkboxSelection
        sx={{ border: 0, height: '100%', width: '99%',
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#fcfcfc',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f6f6f6',
          },
        }}
      />
    // </Paper>
  );
}
