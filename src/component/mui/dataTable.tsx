import * as React from 'react';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';

import Column from '../../resource/table/column.json';
import Stock from '../../resource/table/sotck.json';

// カラム定義
const columns: GridColDef[] = Column.column as GridColDef[];

// データ定義
const rows = Stock.stock.map((item, index) => ({
  id: index + 1,
  code: item.code,
  name: item.name,
  sector: item.sector,
  price: item.price,
  dividend: item.dividend,
  yield: item.yield,
  totalScore: item.totalScore,
}));

// ページネーションモデル定義
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
