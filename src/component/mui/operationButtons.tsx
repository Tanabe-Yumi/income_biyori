import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import { getHighDivendStocks } from '../../handlers/stockService.ts';

export default function OperationButtons() {
  const [loading, setLoading] = React.useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        startIcon={<RotateLeftIcon />}
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </Button>
    </Stack>
  );
}
