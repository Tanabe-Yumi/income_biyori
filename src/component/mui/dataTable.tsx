import * as React from 'react';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';

import Column from '../../resource/table/column.json';
import Stock from '../../general/stock.ts';
import { getAllStocks } from '../../handlers/stockService.ts';

// カラム定義
const columns: GridColDef[] = Column.column as GridColDef[];

// データ定義
// const rows = Stocks.stock.map((item, index) => ({
//   id: index + 1,
//   code: item.code,
//   name: item.name,
//   sector: item.sector,
//   price: item.price,
//   dividend: item.dividend,
//   yield: item.yield,
//   totalScore: item.totalScore,
// }));

// ページネーションモデル定義
const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  const [rows, setRows] = React.useState<Stock[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        // preload で contextBridge 経由にしておく想定
        // window.api.getStocks() は main/preload が sqlite3 を使って実装
        // const data = await (window as any).api?.StocksTable.selectAllStocks() ?? [];
        const data = await getAllStocks();
        setRows(data);
        console.log('DataTable: loaded rows', data);
      } catch (err) {
        console.error('DataTable: failed to load rows', err);
      }
    })();
  }, []);

  (window as any).api?.off();

  return (
    // <Paper sx={{ height: '100%', width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row: any) => row.code}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10, 30, 50]}
      checkboxSelection
      sx={{
        border: 0, height: '100%', width: '99%',
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
