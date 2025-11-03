import * as React from 'react';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

import Column from '../../resource/table/column.json';
import StockData from '../../general/stockData.ts';
import { getAllStocks } from '../../handlers/stockService.ts';

// カラム定義
const columns: GridColDef[] = Column.column as GridColDef[];

// ページネーションモデル定義
const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  const [rows, setRows] = React.useState<StockData[]>([]);

  const loadData = React.useCallback(async () => {
    try {
      const data = await getAllStocks();
      setRows(data);
    } catch (err) {
      console.error('DataTable: failed to load rows', err);
    }
  }, []);

  React.useEffect(() => {
    loadData();
    const onRefresh = () => {
      loadData();
    };
    window.addEventListener('refreshStocks', onRefresh);
    return () => {
      window.removeEventListener('refreshStocks', onRefresh);
    };
  }, [loadData]);

  // (window as any).api?.off();

  return (
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
  );
}
