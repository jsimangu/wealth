export default async function handler(req, res) {
  const { tickers } = req.query;
  
  if (!tickers) {
    return res.status(400).json({ error: 'No tickers provided' });
  }

  try {
    const API_KEY = process.env.ALPHA_VANTAGE_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const tickerArray = tickers.split(',');
    const stockData = [];

    // Fetch prices for each ticker
    // Note: Alpha Vantage has rate limits (5 calls/minute on free tier)
    // So we'll fetch sequentially with a small delay
    for (const ticker of tickerArray) {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
        );
        const data = await response.json();
        
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
          const quote = data['Global Quote'];
          stockData.push({
            ticker: ticker,
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change']),
            changePct: parseFloat(quote['10. change percent'].replace('%', '')),
            high: parseFloat(quote['03. high']),
            low: parseFloat(quote['04. low']),
            volume: parseInt(quote['06. volume'])
          });
        } else {
          // If API fails, return null for this ticker
          stockData.push({
            ticker: ticker,
            price: null,
            error: 'No data available'
          });
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
        
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
    console.error('Stock prices error:', error);
    res.status(500).json({ error: 'Failed to fetch stock prices' });
  }
}
