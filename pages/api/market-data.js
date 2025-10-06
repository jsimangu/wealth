export default async function handler(req, res) {
  try {
    const API_KEY = process.env.ALPHA_VANTAGE_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }
    
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (data['Global Quote']) {
      const quote = data['Global Quote'];
      res.status(200).json({
        symbol: 'SPX',
        name: 'S&P 500',
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePct: parseFloat(quote['10. change percent'].replace('%', ''))
      });
    } else {
      res.status(500).json({ error: 'No data received from API' });
    }
  } catch (error) {
    console.error('Market data error:', error);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
}
