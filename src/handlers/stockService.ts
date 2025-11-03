import Stock from '../general/stockData.ts';

export const getAllStocks = async (): Promise<Stock[]> => {
  if (!window.electronAPI || !window.electronAPI.getAllStocks) {
    throw new Error('Electron API が使えません。');
  }
  try {
    const stocks = await window.electronAPI.getAllStocks();
    return stocks;
  } catch (error) {
    throw new Error('データの取得に失敗しました。');
  }
};

export const getHighDivendStocks = async (): Promise<Boolean> => {
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
