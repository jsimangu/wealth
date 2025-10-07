import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  FileText, 
  Bell, 
  Menu, 
  X, 
  BarChart3, 
  PieChart, 
  Target, 
  Users, 
  AlertTriangle, 
  ArrowUp,
  ArrowDown,
  Download, 
  Brain, 
  UserPlus, 
  AlertCircle, 
  Calculator,
  Activity,
  Search,
  Settings,
  LogOut,
  Maximize2,
  TrendingDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const BijiTerminal = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [time, setTime] = useState(new Date());
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDetail, setShowClientDetail] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [showHoldingDetail, setShowHoldingDetail] = useState(false);
  const [showAllHoldings, setShowAllHoldings] = useState(false);
  const [realTimePrices, setRealTimePrices] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [dbClients, setDbClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real-time prices when client is selected
useEffect(() => {
  if (selectedClient && showClientDetail) {
    fetchRealTimePrices(selectedClient);
    
    // Refresh prices every 30 seconds
    const interval = setInterval(() => {
      fetchRealTimePrices(selectedClient);
    }, 30000);
    
    return () => clearInterval(interval);
  }
}, [selectedClient, showClientDetail]);

// Function to fetch real prices
const fetchRealTimePrices = async (client) => {
  setLoadingPrices(true);
  
  try {
    // Collect all tickers from client's holdings
    const allTickers = [];
    client.holdings.forEach(holding => {
      holding.stocks.forEach(stock => {
        if (!allTickers.includes(stock.ticker)) {
          allTickers.push(stock.ticker);
        }
      });
    });
    
    // Fetch prices
    const response = await fetch(`/api/batch-prices?tickers=${allTickers.join(',')}`);
    const data = await response.json();
    
    if (data.stocks) {
      // Create price lookup object
      const priceMap = {};
      data.stocks.forEach(stock => {
        if (stock.price !== null) {
          priceMap[stock.ticker] = stock;
        }
      });
      setRealTimePrices(priceMap);
    }
    
    setLoadingPrices(false);
  } catch (error) {
    console.error('Error fetching real-time prices:', error);
    setLoadingPrices(false);
  }
};

// Function to calculate updated portfolio values with real prices
const calculateRealTimeValue = (stock) => {
  if (realTimePrices[stock.ticker]) {
    const realPrice = realTimePrices[stock.ticker].price;
    const realValue = stock.shares * realPrice;
    const realReturn = ((realPrice - stock.price) / stock.price) * 100;
    
    return {
      ...stock,
      currentPrice: realPrice,
      currentValue: realValue,
      currentReturn: stock.return + realReturn,
      priceChange: realPrice - stock.price,
      isLive: true
    };
  }
  return {
    ...stock,
    currentPrice: stock.price,
    currentValue: stock.value,
    currentReturn: stock.return,
    priceChange: 0,
    isLive: false
  };
};
  // Market data with realistic values
  const marketData = {
    indices: [
      { symbol: 'SPX', name: 'S&P 500', price: 6034.52, change: 48.23, changePct: 0.81, high: 6045.21, low: 5998.34 },
      { symbol: 'DJI', name: 'Dow Jones', price: 43256.78, change: -127.45, changePct: -0.29, high: 43401.22, low: 43198.56 },
      { symbol: 'IXIC', name: 'Nasdaq', price: 19456.33, change: 156.78, changePct: 0.81, high: 19501.45, low: 19367.89 },
      { symbol: 'VIX', name: 'Volatility', price: 15.42, change: -0.67, changePct: -4.17, high: 16.23, low: 15.12 }
    ],
    fx: [
      { pair: 'EUR/USD', rate: 1.0834, change: 0.0023, changePct: 0.21 },
      { pair: 'GBP/USD', rate: 1.2645, change: -0.0012, changePct: -0.09 },
      { pair: 'USD/JPY', rate: 149.23, change: 0.45, changePct: 0.30 }
    ],
    commodities: [
      { name: 'Gold', price: 2048.30, change: 12.45, changePct: 0.61, unit: '/oz' },
      { name: 'Oil WTI', price: 72.34, change: -0.89, changePct: -1.22, unit: '/bbl' },
      { name: 'Nat Gas', price: 2.89, change: 0.05, changePct: 1.76, unit: '/mmbtu' }
    ]
  };

// Fetch clients from database
useEffect(() => {
  fetchClients();
}, []);

const fetchClients = async () => {
  setLoadingClients(true);
  try {
    const response = await fetch('/api/clients');
    const data = await response.json();
    
    if (data.clients) {
      // Transform database data to match expected format
      const transformedClients = data.clients.map(client => ({
        id: client.id,
        name: client.name,
        fullName: client.full_name,
        aum: parseFloat(client.aum),
        returns: { ytd: 0, mtd: 0, '1yr': 0, '3yr': 0 }, // Default for now
        risk: client.risk_profile || 'Moderate',
        status: client.status || 'Active',
        alerts: client.alerts || 0,
        email: client.email || '',
        phone: client.phone || '',
        since: client.member_since || new Date().getFullYear().toString(),
        holdings: [], // We'll fetch these separately later
        recentActivity: []
      }));
      setDbClients(transformedClients);
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
  setLoadingClients(false);
};

// Use dbClients, or fallback to sample data if database is empty
const clients = dbClients.length > 0 ? dbClients : [
  { 
    id: '1', 
    name: 'Sample Client', 
    fullName: 'Sample Client',
    aum: 1000000, 
    returns: { ytd: 0, mtd: 0, '1yr': 0, '3yr': 0 },
    risk: 'Moderate', 
    status: 'Active', 
    alerts: 0,
    email: 'sample@email.com',
    phone: '(555) 000-0000',
    since: '2024',
    holdings: [],
    recentActivity: []
  }
];

  const performanceData = [
    { date: 'JAN', value: 100, benchmark: 100 },
    { date: 'FEB', value: 102.4, benchmark: 101.2 },
    { date: 'MAR', value: 104.8, benchmark: 103.6 },
    { date: 'APR', value: 103.2, benchmark: 102.4 },
    { date: 'MAY', value: 107.6, benchmark: 105.8 },
    { date: 'JUN', value: 109.2, benchmark: 107.2 },
    { date: 'JUL', value: 111.8, benchmark: 108.6 },
    { date: 'AUG', value: 113.4, benchmark: 110.1 },
    { date: 'SEP', value: 115.2, benchmark: 111.8 }
  ];

  const allocationData = [
    { name: 'US Equity', value: 42, color: '#FF8C42' },
    { name: 'Intl Equity', value: 23, color: '#4ECDC4' },
    { name: 'Fixed Income', value: 25, color: '#45B7D1' },
    { name: 'Alternatives', value: 7, color: '#F95738' },
    { name: 'Cash', value: 3, color: '#96CEB4' }
  ];

  const aiAlerts = [
    { type: 'Rebal', priority: 'HIGH', client: 'Williams, E', message: 'Portfolio drift >5% - immediate rebalancing recommended', value: '$45K tax impact' },
    { type: 'Tax', priority: 'MED', client: 'Johnson, S', message: 'Tax-loss harvesting opportunity identified', value: '$18K savings' },
    { type: 'Risk', priority: 'HIGH', client: 'Rodriguez, D', message: 'Concentration risk detected in tech sector', value: '42% allocation' },
    { type: 'Market', priority: 'LOW', client: 'All Clients', message: 'VIX decline suggests reduced volatility ahead', value: '15.42 (-4.2%)' }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono">
      {/* Top Bar - Bloomberg Style */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-1 flex items-center justify-between border-b-2 border-orange-400">
        <div className="flex items-center space-x-6">
          <div className="font-bold text-black text-lg tracking-wider">Biji Terminal</div>
          <div className="text-black text-sm font-semibold">
            {time.toLocaleTimeString('en-US', { hour12: false })} EST
          </div>
          <div className="text-black text-sm">
            {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-black text-sm font-semibold">Market: Open</div>
          <Bell className="h-4 w-4 text-black" />
          <Settings className="h-4 w-4 text-black" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Left Sidebar - Navigation */}
        <div className="w-48 bg-gray-900 border-r border-gray-800 min-h-screen">
          <div className="p-3 space-y-1">
            {[
              { id: 'dashboard', label: 'MONITOR', icon: BarChart3 },
              { id: 'clients', label: 'CLIENTS', icon: Users },
              { id: 'portfolio', label: 'PORTFOLIO', icon: PieChart },
              { id: 'trading', label: 'TRADING', icon: TrendingUp },
              { id: 'analytics', label: 'ANALYTICS', icon: Activity },
              { id: 'alerts', label: 'ALERTS', icon: AlertTriangle },
              { id: 'research', label: 'RESEARCH', icon: Brain }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-left text-xs font-semibold transition-colors ${
                  currentView === item.id 
                    ? 'bg-orange-600 text-black' 
                    : 'text-orange-400 hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {currentView === 'dashboard' && !showClientDetail && (
            <div className="p-4 space-y-3">
              {/* Market Indices Ticker */}
              <div className="bg-gray-900 border border-gray-800 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-orange-400 text-xs font-bold">MARKET OVERVIEW</div>
                  <div className="text-green-400 text-xs">● Live</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {marketData.indices.map(idx => (
                    <div key={idx.symbol} className="space-y-1">
                      <div className="text-gray-400 text-xs">{idx.symbol}</div>
                      <div className="text-white text-lg font-bold">{idx.price.toFixed(2)}</div>
                      <div className={`text-sm flex items-center ${idx.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {idx.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePct >= 0 ? '+' : ''}{idx.changePct.toFixed(2)}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* KPIs */}
                <div className="bg-gray-900 border border-gray-800 p-3">
                  <div className="text-orange-400 text-xs font-bold mb-3">FIRM METRICS</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">Total AUM</span>
                      <span className="text-green-400 font-bold">$45.6M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">Active Clients</span>
                      <span className="text-cyan-400 font-bold">147</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">Alpha YTD</span>
                      <span className="text-green-400 font-bold">+4.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">Tax Saved</span>
                      <span className="text-yellow-400 font-bold">$127K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">Alerts</span>
                      <span className="text-red-400 font-bold">8</span>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="col-span-2 bg-gray-900 border border-gray-800 p-3">
                  <div className="text-orange-400 text-xs font-bold mb-2">PORTFOLIO VS BENCHMARK YTD</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                      <YAxis stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', fontSize: '11px' }}
                        labelStyle={{ color: '#F97316' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#4ECDC4" fillOpacity={1} fill="url(#colorPortfolio)" strokeWidth={2} />
                      <Line type="monotone" dataKey="benchmark" stroke="#F59E0B" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Asset Allocation & AI Alerts */}
              <div className="grid grid-cols-2 gap-3">
                {/* Asset Allocation */}
                <div className="bg-gray-900 border border-gray-800 p-3">
                  <div className="text-orange-400 text-xs font-bold mb-3">AGGREGATE ALLOCATION</div>
                  <div className="space-y-2">
                    {allocationData.map(asset => (
                      <div key={asset.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">{asset.name}</span>
                          <span className="text-white font-bold">{asset.value}%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: `${asset.value}%`, backgroundColor: asset.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Alerts */}
                <div className="bg-gray-900 border border-gray-800 p-3">
                  <div className="text-orange-400 text-xs font-bold mb-3">AI INTELLIGENCE ALERTS</div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {aiAlerts.map((alert, idx) => (
                      <div key={idx} className="bg-gray-800 border-l-2 border-orange-500 p-2">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-bold ${
                              alert.priority === 'HIGH' ? 'text-red-400' :
                              alert.priority === 'MED' ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              [{alert.type}]
                            </span>
                            <span className="text-gray-400 text-xs">{alert.client}</span>
                          </div>
                          <span className="text-cyan-400 text-xs">{alert.value}</span>
                        </div>
                        <div className="text-white text-xs">{alert.message}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client List */}
              <div className="bg-gray-900 border border-gray-800 p-3">
                <div className="flex justify-between items-center mb-3">
  <div className="text-orange-400 text-xs font-bold">CLIENT ROSTER</div>
  <button
    onClick={() => setShowAddClientModal(true)}
    className="px-3 py-1 bg-green-600 text-black font-bold text-xs hover:bg-green-500 transition-colors"
  >
    + ADD CLIENT
  </button>
</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 text-gray-400 font-semibold">Client</th>
                        <th className="text-right py-2 text-gray-400 font-semibold">AUM</th>
                        <th className="text-right py-2 text-gray-400 font-semibold">YTD</th>
                        <th className="text-right py-2 text-gray-400 font-semibold">MTD</th>
                        <th className="text-center py-2 text-gray-400 font-semibold">Risk</th>
                        <th className="text-center py-2 text-gray-400 font-semibold">Status</th>
                        <th className="text-center py-2 text-gray-400 font-semibold">Alerts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(client => (
                        <tr 
                          key={client.id} 
                          className="border-b border-gray-800 hover:bg-orange-900 hover:bg-opacity-20 cursor-pointer transition-all duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedClient(client);
                            setShowClientDetail(true);
                          }}
                        >
                          <td className="py-2 text-white font-semibold">{client.name}</td>
                          <td className="text-right text-cyan-400">${(client.aum / 1000000).toFixed(2)}M</td>
                          <td className={`text-right font-bold ${client.returns.ytd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {client.returns.ytd >= 0 ? '+' : ''}{client.returns.ytd.toFixed(1)}%
                          </td>
                          <td className={`text-right ${client.returns.mtd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {client.returns.mtd >= 0 ? '+' : ''}{client.returns.mtd.toFixed(1)}%
                          </td>
                          <td className="text-center text-yellow-400">{client.risk}</td>
                          <td className="text-center">
                            <span className={`px-2 py-0.5 text-xs ${
                              client.status === 'Active' ? 'text-green-400' :
                              client.status === 'Review' ? 'text-yellow-400' : 'text-gray-500'
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td className="text-center">
                            {client.alerts > 0 && (
                              <span className="text-red-400 font-bold">{client.alerts}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Market Data Footer */}
              <div className="bg-gray-900 border border-gray-800 p-3">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="text-orange-400 font-bold mb-2">FOREX</div>
                    <div className="space-y-1">
                      {marketData.fx.map(fx => (
                        <div key={fx.pair} className="flex justify-between">
                          <span className="text-gray-400">{fx.pair}</span>
                          <span className={fx.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {fx.rate.toFixed(4)} ({fx.changePct >= 0 ? '+' : ''}{fx.changePct.toFixed(2)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-orange-400 font-bold mb-2">COMMODITIES</div>
                    <div className="space-y-1">
                      {marketData.commodities.map(comm => (
                        <div key={comm.name} className="flex justify-between">
                          <span className="text-gray-400">{comm.name}</span>
                          <span className={comm.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                            ${comm.price.toFixed(2)} ({comm.changePct >= 0 ? '+' : ''}{comm.changePct.toFixed(2)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-orange-400 font-bold mb-2">SYSTEM STATUS</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Feed</span>
                        <span className="text-green-400">● Connected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">AI Engine</span>
                        <span className="text-green-400">● Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">API Calls</span>
                        <span className="text-cyan-400">18/25 Today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Client Detail View */}
          {currentView === 'dashboard' && showClientDetail && selectedClient && (
            <div className="p-4 space-y-3">
              {/* Header with Back Button */}
              <div className="bg-gray-900 border border-orange-500 p-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setShowClientDetail(false)}
                    className="px-3 py-1 bg-orange-600 text-black font-bold text-xs hover:bg-orange-500 transition-colors"
                  >
                    ← BACK TO ROSTER
                  </button>
                  <div>
                    <div className="text-orange-400 text-lg font-bold">{selectedClient.fullName}</div>
                    <div className="text-gray-400 text-xs">Client ID: {selectedClient.id} | Member Since: {selectedClient.since}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 text-xs font-bold ${
                    selectedClient.status === 'Active' ? 'bg-green-900 text-green-400' :
                    selectedClient.status === 'Review' ? 'bg-yellow-900 text-yellow-400' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {selectedClient.status.toUpperCase()}
                  </div>
                  <div className="text-cyan-400 font-bold text-lg">
                    ${(selectedClient.aum / 1000000).toFixed(2)}M AUM
                  </div>
                </div>
              </div>

              {/* Contact & Risk Info */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-900 border border-gray-800 p-3">
                  <div className="text-orange-400 text-xs font-bold mb-3">CONTACT INFORMATION</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-cyan-400">{selectedClient.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white">{selectedClient.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Profile:</span>
                      <span className="text-yellow-400 font-bold">{selectedClient.risk}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-3">
                  <div className="text-orange-400 text-xs font-bold mb-3">PERFORMANCE METRICS</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">MTD Return:</span>
                      <span className={selectedClient.returns.mtd >= 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                        {selectedClient.returns.mtd >= 0 ? '+' : ''}{selectedClient.returns.mtd.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">YTD Return:</span>
                      <span className={selectedClient.returns.ytd >= 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                        {selectedClient.returns.ytd >= 0 ? '+' : ''}{selectedClient.returns.ytd.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">1-Year:</span>
                      <span className={selectedClient.returns['1yr'] >= 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                        {selectedClient.returns['1yr'] >= 0 ? '+' : ''}{selectedClient.returns['1yr'].toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">3-Year:</span>
                      <span className={selectedClient.returns['3yr'] >= 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                        {selectedClient.returns['3yr'] >= 0 ? '+' : ''}{selectedClient.returns['3yr'].toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-3">
                  <div className="text-orange-400 text-xs font-bold mb-3">ALERTS & NOTIFICATIONS</div>
                  <div className="space-y-2 text-xs">
                    {selectedClient.alerts > 0 ? (
                      <>
                        <div className="flex items-center space-x-2 text-red-400">
                          <AlertTriangle className="h-3 w-3" />
                          <span className="font-bold">{selectedClient.alerts} Active Alert{selectedClient.alerts > 1 ? 's' : ''}</span>
                        </div>
                        <div className="text-gray-400 mt-2">
                          Review required for portfolio optimization
                        </div>
                      </>
                    ) : (
                      <div className="text-green-400 flex items-center space-x-2">
                        <span>✓</span>
                        <span>No active alerts</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Holdings Breakdown */}
              <div className="bg-gray-900 border border-gray-800 p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-orange-400 text-xs font-bold">
  PORTFOLIO HOLDINGS
  <span className="text-gray-400 text-xs font-normal ml-3">(Click "View" to see detailed positions)</span>
  {loadingPrices && (
    <span className="text-yellow-400 text-xs font-normal ml-3">● Updating prices...</span>
  )}
  {!loadingPrices && Object.keys(realTimePrices).length > 0 && (
    <span className="text-green-400 text-xs font-normal ml-3">● Live prices</span>
  )}
</div>
                  <button
                    onClick={() => setShowAllHoldings(true)}
                    className="px-4 py-2 bg-orange-600 text-black font-bold text-xs hover:bg-orange-500 transition-colors"
                  >
                    VIEW ALL HOLDINGS
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 text-gray-400 font-semibold">Asset Class</th>
                        <th className="text-right py-2 text-gray-400 font-semibold">Value</th>
                        <th className="text-right py-2 text-gray-400 font-semibold">Allocation</th>
                        <th className="text-right py-2 text-gray-400 font-semibold">Return</th>
                        <th className="text-center py-2 text-gray-400 font-semibold">Visual</th>
                        <th className="text-center py-2 text-gray-400 font-semibold">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClient.holdings.map((holding, idx) => (
                        <tr 
                          key={idx} 
                          className="border-b border-gray-800 hover:bg-cyan-900 hover:bg-opacity-20 transition-all duration-200"
                        >
                          <td className="py-2 text-white">{holding.asset}</td>
                          <td className="text-right text-cyan-400">${(holding.value / 1000).toFixed(0)}K</td>
                          <td className="text-right text-white font-bold">{holding.pct}%</td>
                          <td className={`text-right font-bold ${holding.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {holding.return >= 0 ? '+' : ''}{holding.return.toFixed(1)}%
                          </td>
                          <td className="text-center">
                            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-orange-500 rounded-full"
                                style={{ width: `${holding.pct}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedHolding(holding);
                                setShowHoldingDetail(true);
                              }}
                              className="px-2 py-1 bg-cyan-600 text-black font-bold text-xs hover:bg-cyan-500 transition-colors"
                            >
                              VIEW
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-900 border border-gray-800 p-3">
                <div className="text-orange-400 text-xs font-bold mb-3">RECENT ACTIVITY</div>
                <div className="space-y-2">
                  {selectedClient.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-800 p-2 text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400">{activity.date}</span>
                        <span className={`px-2 py-0.5 font-bold ${
                          activity.type === 'Buy' ? 'text-green-400' :
                          activity.type === 'Sell' ? 'text-red-400' :
                          activity.type === 'Alert' ? 'text-yellow-400' :
                          activity.type === 'Contribution' ? 'text-cyan-400' :
                          'text-gray-400'
                        }`}>
                          {activity.type.toUpperCase()}
                        </span>
                        <span className="text-white">{activity.asset}</span>
                      </div>
                      {activity.amount > 0 && (
                        <span className="text-cyan-400 font-bold">
                          ${(activity.amount / 1000).toFixed(1)}K
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-orange-600 text-black font-bold text-xs py-3 hover:bg-orange-500 transition-colors">
                  GENERATE REPORT
                </button>
                <button className="flex-1 bg-gray-800 text-orange-400 font-bold text-xs py-3 hover:bg-gray-700 border border-orange-500 transition-colors">
                  SCHEDULE MEETING
                </button>
                <button className="flex-1 bg-gray-800 text-cyan-400 font-bold text-xs py-3 hover:bg-gray-700 border border-cyan-500 transition-colors">
                  SEND MESSAGE
                </button>
              </div>
            </div>
          )}

          {/* All Holdings View */}
          {showAllHoldings && selectedClient && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 border-2 border-orange-500 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-900 to-orange-800 p-4 flex items-center justify-between border-b-2 border-orange-500">
                  <div>
                    <div className="text-orange-300 text-xl font-bold">Complete Portfolio Holdings</div>
                    <div className="text-gray-300 text-sm">{selectedClient.fullName} - All Positions</div>
                  </div>
                  <button 
                    onClick={() => setShowAllHoldings(false)}
                    className="px-4 py-2 bg-orange-600 text-black font-bold text-xs hover:bg-orange-500 transition-colors"
                  >
                    ✕ CLOSE
                  </button>
                </div>

                {/* Summary Stats */}
                <div className="p-4 bg-gray-800 border-b border-gray-700">
                  <div className="grid grid-cols-5 gap-4 text-xs">
                    <div>
                      <div className="text-gray-400 mb-1">Total Portfolio Value</div>
                      <div className="text-orange-400 text-lg font-bold">${(selectedClient.aum / 1000000).toFixed(2)}M</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Total Positions</div>
                      <div className="text-cyan-400 text-lg font-bold">
                        {selectedClient.holdings.reduce((sum, h) => sum + h.stocks.length, 0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Asset Classes</div>
                      <div className="text-white text-lg font-bold">{selectedClient.holdings.length}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">YTD Return</div>
                      <div className={`text-lg font-bold ${selectedClient.returns.ytd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedClient.returns.ytd >= 0 ? '+' : ''}{selectedClient.returns.ytd.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Risk Profile</div>
                      <div className="text-yellow-400 text-lg font-bold">{selectedClient.risk}</div>
                    </div>
                  </div>
                </div>

                {/* All Holdings by Asset Class */}
                <div className="p-4 space-y-4">
                  {selectedClient.holdings.map((holding, holdingIdx) => (
                    <div key={holdingIdx} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                      {/* Asset Class Header */}
                      <div className="bg-gray-750 p-3 border-b border-gray-700 flex items-center justify-between">
                        <div>
                          <div className="text-orange-400 text-sm font-bold">{holding.asset}</div>
                          <div className="text-gray-400 text-xs mt-1">
                            {holding.stocks.length} position{holding.stocks.length > 1 ? 's' : ''} • 
                            ${(holding.value / 1000).toFixed(0)}K • 
                            {holding.pct}% of portfolio
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${holding.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {holding.return >= 0 ? '+' : ''}{holding.return.toFixed(1)}%
                        </div>
                      </div>

                      {/* Stocks Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-800 border-b border-gray-700">
                              <th className="text-left py-2 px-3 text-cyan-400 font-semibold">Ticker</th>
                              <th className="text-left py-2 px-3 text-cyan-400 font-semibold">Security Name</th>
                              <th className="text-right py-2 px-3 text-cyan-400 font-semibold">Shares</th>
                              <th className="text-right py-2 px-3 text-cyan-400 font-semibold">Price</th>
                              <th className="text-right py-2 px-3 text-cyan-400 font-semibold">Market Value</th>
                              <th className="text-right py-2 px-3 text-cyan-400 font-semibold">% of Class</th>
                              <th className="text-right py-2 px-3 text-cyan-400 font-semibold">% of Portfolio</th>
                              <th className="text-right py-2 px-3 text-cyan-400 font-semibold">Return</th>
                            </tr>
                          </thead>
                          <tbody>
                            {holding.stocks.map((stock, stockIdx) => (
                              <tr key={stockIdx} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                                <td className="py-2 px-3 text-orange-400 font-bold">{stock.ticker}</td>
                                <td className="py-2 px-3 text-white">{stock.name}</td>
                                <td className="text-right py-2 px-3 text-gray-300">{stock.shares.toLocaleString()}</td>
                                <td className="text-right py-2 px-3 text-cyan-400">${stock.price.toFixed(2)}</td>
                                <td className="text-right py-2 px-3 text-white font-semibold">${stock.value.toLocaleString()}</td>
                                <td className="text-right py-2 px-3 text-gray-300">
                                  {((stock.value / holding.value) * 100).toFixed(1)}%
                                </td>
                                <td className="text-right py-2 px-3 text-gray-300">
                                  {((stock.value / selectedClient.aum) * 100).toFixed(2)}%
                                </td>
                                <td className={`text-right py-2 px-3 font-bold ${stock.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {stock.return >= 0 ? '+' : ''}{stock.return.toFixed(1)}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-800 border-t-2 border-gray-600">
                              <td colSpan="4" className="py-2 px-3 text-orange-400 font-bold text-right">SUBTOTAL:</td>
                              <td className="text-right py-2 px-3 text-orange-400 font-bold">
                                ${holding.value.toLocaleString()}
                              </td>
                              <td className="text-right py-2 px-3 text-white font-bold">100%</td>
                              <td className="text-right py-2 px-3 text-white font-bold">{holding.pct}%</td>
                              <td className={`text-right py-2 px-3 font-bold ${holding.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {holding.return >= 0 ? '+' : ''}{holding.return.toFixed(1)}%
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  ))}

                  {/* Grand Total */}
                  <div className="bg-gradient-to-r from-orange-900 to-orange-800 border-2 border-orange-500 rounded-lg p-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-orange-300 font-bold text-lg">PORTFOLIO TOTAL</div>
                      <div className="flex items-center space-x-8">
                        <div>
                          <div className="text-gray-300 text-xs">Total Value</div>
                          <div className="text-orange-300 text-xl font-bold">${selectedClient.aum.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-300 text-xs">Positions</div>
                          <div className="text-cyan-300 text-xl font-bold">
                            {selectedClient.holdings.reduce((sum, h) => sum + h.stocks.length, 0)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-300 text-xs">YTD Return</div>
                          <div className={`text-xl font-bold ${selectedClient.returns.ytd >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                            {selectedClient.returns.ytd >= 0 ? '+' : ''}{selectedClient.returns.ytd.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-gray-800 border-t border-gray-700 flex space-x-3">
                  <button className="flex-1 bg-orange-600 text-black font-bold text-xs py-3 hover:bg-orange-500 transition-colors">
                    EXPORT FULL PORTFOLIO
                  </button>
                  <button className="flex-1 bg-gray-700 text-orange-400 font-bold text-xs py-3 hover:bg-gray-600 border border-orange-500 transition-colors">
                    GENERATE REPORT
                  </button>
                  <button 
                    onClick={() => setShowAllHoldings(false)}
                    className="flex-1 bg-gray-700 text-cyan-400 font-bold text-xs py-3 hover:bg-gray-600 border border-cyan-500 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Holding Detail View */}
          {showHoldingDetail && selectedHolding && selectedClient && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-900 to-cyan-800 p-4 flex items-center justify-between border-b-2 border-cyan-500">
                  <div>
                    <div className="text-cyan-300 text-lg font-bold">{selectedHolding.asset}</div>
                    <div className="text-gray-300 text-sm">{selectedClient.fullName} - Detailed Holdings</div>
                  </div>
                  <button 
                    onClick={() => setShowHoldingDetail(false)}
                    className="px-4 py-2 bg-cyan-600 text-black font-bold text-xs hover:bg-cyan-500 transition-colors"
                  >
                    ✕ CLOSE
                  </button>
                </div>

                {/* Summary Stats */}
                <div className="p-4 bg-gray-800 border-b border-gray-700">
                  <div className="grid grid-cols-4 gap-4 text-xs">
                    <div>
                      <div className="text-gray-400 mb-1">Total Value</div>
                      <div className="text-cyan-400 text-lg font-bold">${(selectedHolding.value / 1000).toFixed(1)}K</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Portfolio %</div>
                      <div className="text-white text-lg font-bold">{selectedHolding.pct}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Total Return</div>
                      <div className={`text-lg font-bold ${selectedHolding.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedHolding.return >= 0 ? '+' : ''}{selectedHolding.return.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-1">Positions</div>
                      <div className="text-orange-400 text-lg font-bold">{selectedHolding.stocks.length}</div>
                    </div>
                  </div>
                </div>

                {/* Individual Stocks Table */}
                <div className="p-4">
                  <div className="text-orange-400 text-sm font-bold mb-3">INDIVIDUAL POSITIONS</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b-2 border-cyan-700 bg-gray-800">
                          <th className="text-left py-3 px-2 text-cyan-400 font-bold">Ticker</th>
                          <th className="text-left py-3 px-2 text-cyan-400 font-bold">Security Name</th>
                          <th className="text-right py-3 px-2 text-cyan-400 font-bold">Shares</th>
                          <th className="text-right py-3 px-2 text-cyan-400 font-bold">Price</th>
                          <th className="text-right py-3 px-2 text-cyan-400 font-bold">Market Value</th>
                          <th className="text-right py-3 px-2 text-cyan-400 font-bold">% of Holding</th>
                          <th className="text-right py-3 px-2 text-cyan-400 font-bold">Return</th>
                        </tr>
                      </thead>
                      <tbody>
  {selectedHolding.stocks.map((stock, idx) => {
    const liveStock = calculateRealTimeValue(stock);
    return (
      <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
        <td className="py-3 px-2 text-orange-400 font-bold">
          {liveStock.ticker}
          {liveStock.isLive && <span className="ml-1 text-green-400 text-xs">●</span>}
        </td>
        <td className="py-3 px-2 text-white">{liveStock.name}</td>
        <td className="text-right py-3 px-2 text-gray-300">{liveStock.shares.toLocaleString()}</td>
        <td className="text-right py-3 px-2">
          <div className="flex flex-col items-end">
            <span className="text-cyan-400 font-bold">${liveStock.currentPrice.toFixed(2)}</span>
            {liveStock.isLive && liveStock.priceChange !== 0 && (
              <span className={`text-xs ${liveStock.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {liveStock.priceChange >= 0 ? '+' : ''}{liveStock.priceChange.toFixed(2)}
              </span>
            )}
          </div>
        </td>
        <td className="text-right py-3 px-2 text-white font-bold">${liveStock.currentValue.toLocaleString()}</td>
        <td className="text-right py-3 px-2 text-gray-300">
          {((liveStock.currentValue / selectedHolding.value) * 100).toFixed(1)}%
        </td>
        <td className={`text-right py-3 px-2 font-bold ${liveStock.currentReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {liveStock.currentReturn >= 0 ? '+' : ''}{liveStock.currentReturn.toFixed(1)}%
        </td>
      </tr>
    );
  })}
</tbody>
                      <tfoot>
                        <tr className="border-t-2 border-cyan-700 bg-gray-800">
                          <td colSpan="4" className="py-3 px-2 text-cyan-400 font-bold text-right">TOTAL:</td>
                          <td className="text-right py-3 px-2 text-cyan-400 font-bold text-lg">
                            ${selectedHolding.value.toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-2 text-white font-bold">100%</td>
                          <td className={`text-right py-3 px-2 font-bold text-lg ${selectedHolding.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {selectedHolding.return >= 0 ? '+' : ''}{selectedHolding.return.toFixed(1)}%
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-gray-800 border-t border-gray-700 flex space-x-3">
                  <button className="flex-1 bg-cyan-600 text-black font-bold text-xs py-2 hover:bg-cyan-500 transition-colors">
                    EXPORT DATA
                  </button>
                  <button className="flex-1 bg-gray-700 text-cyan-400 font-bold text-xs py-2 hover:bg-gray-600 border border-cyan-500 transition-colors">
                    REBALANCE ALERT
                  </button>
                  <button 
                    onClick={() => setShowHoldingDetail(false)}
                    className="flex-1 bg-gray-700 text-orange-400 font-bold text-xs py-2 hover:bg-gray-600 border border-orange-500 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView !== 'dashboard' && (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center bg-gray-900 border border-orange-500 p-8">
                <div className="text-orange-400 text-lg font-bold mb-2 capitalize">{currentView} Module</div>
                <div className="text-gray-400 text-sm">Feature under development</div>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mt-4 px-4 py-2 bg-orange-600 text-black font-bold text-xs hover:bg-orange-500"
                >
                  Return to Monitor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-6">
          <span className="text-orange-400">Biji Terminal v2.4.1</span>
          <span className="text-gray-500">|</span>
          <span className="text-green-400">● Data: Simulated</span>
          <span className="text-gray-500">|</span>
          <span className="text-cyan-400">User: demo_advisor</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Latency: 12ms</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">Updates: 5min</span>
        </div>
      </div>
    </div>
  );
};
{/* Add Client Modal */}
{showAddClientModal && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 border-2 border-green-500 rounded-lg max-w-2xl w-full">
      <div className="bg-gradient-to-r from-green-900 to-green-800 p-4 flex items-center justify-between border-b-2 border-green-500">
        <div className="text-green-300 text-xl font-bold">Add New Client</div>
        <button 
          onClick={() => setShowAddClientModal(false)}
          className="px-4 py-2 bg-green-600 text-black font-bold text-xs hover:bg-green-500"
        >
          ✕ CLOSE
        </button>
      </div>
      
      <form onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newClient = {
          name: formData.get('name'),
          full_name: formData.get('full_name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          aum: parseFloat(formData.get('aum')),
          risk_profile: formData.get('risk_profile'),
          status: 'Active',
          member_since: new Date().getFullYear().toString(),
          alerts: 0
        };
        
        try {
          const response = await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newClient)
          });
          
          if (response.ok) {
            setShowAddClientModal(false);
            fetchClients(); // Refresh the list
          }
        } catch (error) {
          console.error('Error adding client:', error);
        }
      }} className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-xs block mb-1">Last Name, First Initial</label>
            <input name="name" required className="w-full bg-gray-800 text-white p-2 text-sm border border-gray-700 rounded" placeholder="Johnson, S" />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Full Name</label>
            <input name="full_name" required className="w-full bg-gray-800 text-white p-2 text-sm border border-gray-700 rounded" placeholder="Sarah Johnson" />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Email</label>
            <input name="email" type="email" className="w-full bg-gray-800 text-white p-2 text-sm border border-gray-700 rounded" placeholder="sarah@email.com" />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Phone</label>
            <input name="phone" className="w-full bg-gray-800 text-white p-2 text-sm border border-gray-700 rounded" placeholder="(555) 123-4567" />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">AUM ($)</label>
            <input name="aum" type="number" required className="w-full bg-gray-800 text-white p-2 text-sm border border-gray-700 rounded" placeholder="1000000" />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Risk Profile</label>
            <select name="risk_profile" required className="w-full bg-gray-800 text-white p-2 text-sm border border-gray-700 rounded">
              <option>Conservative</option>
              <option>Moderate</option>
              <option>Aggressive</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button type="submit" className="flex-1 bg-green-600 text-black font-bold text-sm py-3 hover:bg-green-500">
            CREATE CLIENT
          </button>
          <button type="button" onClick={() => setShowAddClientModal(false)} className="flex-1 bg-gray-700 text-white font-bold text-sm py-3 hover:bg-gray-600">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  </div>
)}

export default BijiTerminal;
