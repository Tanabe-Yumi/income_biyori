import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { getHighDivendStocks } from '../../handlers/stockService.ts';

export default function OperationButtons() {
  const [inactive, setInactive] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleUpdate = async () => {
    try {
      setInactive(true);
      setUpdating(true);
      const result = await getHighDivendStocks();
      if (result) {
        alert('更新に成功しました。');
      } else {
        alert('更新が完了しましたが、結果は false でした。');
      }
    } catch (err) {
      console.error('Update failed', err);
      alert('更新に失敗しました。コンソールを確認してください。');
    } finally {
      setInactive(false);
      setUpdating(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // イベント発火
    window.dispatchEvent(new Event('refreshStocks'));

    setRefreshing(false);
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={handleUpdate}
        disabled={inactive}
      >
        {updating ? 'Updating...' : 'Update'}
      </Button>

      <Button
        variant="outlined"
        startIcon={<AutorenewIcon />}
        onClick={handleRefresh}
        disabled={inactive}
      >
        {refreshing ? 'Refreshing...' : 'Refresh'}
      </Button>
    </Stack>
  );
}
