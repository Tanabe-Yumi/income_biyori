export const getHighDivendStocks = async () => {
  if (!window.electronAPI || !window.electronAPI.getHighDivendStocks) {
    throw new Error('Electron API が使えません。');
  }
  try {
    const result = await window.electronAPI.getHighDivendStocks();
    return result;
  } catch (error) {
    throw new Error('データの取得に失敗しました。');
  }
};
