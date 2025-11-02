import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function fetchDividendRanking(yieldThreshold = 3.5) {
  const url = 'https://finance.yahoo.co.jp/stocks/ranking/dividendYield?market=all&term=daily&page=';
  const stocks: any[] = [];

  for (let page = 1; page <= 25; page++) {
    const { data } = await axios.get(url + page);
    const $ = cheerio.load(data);

    const rows = $('table tbody tr').toArray();
    for (const el of rows) {
      const $el = $(el);
      const code = $el.find('td:nth-child(2) > ul > li:nth-child(1)').text().trim();
      const name = $el.find('td:nth-child(2) > a').text().trim();
      const market = $el.find('td:nth-child(2)').find('ul').find('li:nth-child(2)').text().trim();
      const priceRaw = $el.find('td:nth-child(3) > span.StyledNumber__1fof.StyledNumber--vertical__2aoh.RankingTable__primary__g8s8').text().trim();
      const price = parseFloat(priceRaw.replace(/,/g, '')) || 0;
      const dividend = parseFloat($el.find('td:nth-child(5)').text().trim().replace(/,/g, '')) || 0;
      const yieldRate = parseFloat($el.find('td:nth-child(6)').text().trim()) || 0;

      const sector = await getSector(code);

      stocks.push({ code, name, market, sector, price, dividend, yieldRate });

      // 3秒待つ
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    if (stocks.length > 0 && stocks.at(-1).yieldRate < yieldThreshold) {
      break;
    }
  }

  console.log(stocks);
  return stocks;
}

export async function getSector(code: string) {
  const url = `https://finance.yahoo.co.jp/quote/${code}`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const sector = $('#industry > a').text().trim();
  return sector;
}

// const res = fetchDividendRanking(6);
// const res = getSector('7203');
