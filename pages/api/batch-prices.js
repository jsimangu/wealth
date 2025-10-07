export default async function handler(req, res) {
  const { tickers } = req.query;
  
  if (!tickers) {
    return res.status(400).json({ error: 'No tickers provided' });
  }

  try {
    const tickerArray = tickers.split(',');
    const stockData = [];

    // Using Yahoo Finance unofficial API (no key needed, but less reliable)
    // For production, consider using Finnhub or Polygon.io
    for (const ticker of tickerArray) {
      try {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`
        );
        const data = await response.json();
        
        if (data.chart && data.chart.result && data.chart.result[0]) {
          const result = data.chart.result[0];
          const quote = result.meta;
          const currentPrice = quote.regularMarketPrice;
          const previousClose = quote.previousClose || quote.chartPreviousClose;
          const change = currentPrice - previousClose;
          const changePct = (change / previousClose) * 100;
          
          stockData.push({
            ticker: ticker,
            price: currentPrice,
            change: change,
            changePct: changePct,
            high: quote.regularMarketDayHigh,
            low: quote.regularMarketDayLow,
            volume: quote.regularMarketVolume
          });
        } else {
          stockData.push({
            ticker: ticker,
            price: null,
            error: 'No data available'
          });
        }
      } catch (error) {
        console.error(`Error fetching ${ticker}:`, error);
        stockData.push({
          ticker: ticker,
          price: null,
          error: error.message
        });
      }
    }

    res.status(200).json({ stocks: stockData });
    
  } catch (error) {
    console.error('Batch prices error:', error);
    res.status(500).json({ error: 'Failed to fetch stock prices' });
  }
}
