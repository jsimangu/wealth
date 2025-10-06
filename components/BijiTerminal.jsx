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
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const clients = [
    { 
      id: 1, 
      name: 'Johnson, S', 
      fullName: 'Sarah Johnson',
      aum: 2500000, 
      returns: { ytd: 12.4, mtd: 2.1, '1yr': 14.2, '3yr': 28.5 }, 
      risk: 'Moderate', 
      status: 'Active', 
      alerts: 2,
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      since: '2019',
      holdings: [
        { 
          asset: 'US Large Cap Equity', 
          value: 1050000, 
          pct: 42, 
          return: 15.2,
          stocks: [
            { ticker: 'AAPL', name: 'Apple Inc.', shares: 1250, price: 178.45, value: 223063, return: 18.2 },
            { ticker: 'MSFT', name: 'Microsoft Corp.', shares: 850, price: 412.30, value: 350455, return: 22.1 },
            { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 950, price: 142.15, value: 135043, return: 14.8 },
            { ticker: 'AMZN', name: 'Amazon.com Inc.', shares: 780, price: 178.25, value: 139035, return: 16.5 },
            { ticker: 'NVDA', name: 'NVIDIA Corp.', shares: 340, price: 495.20, value: 168368, return: 28.7 },
            { ticker: 'META', name: 'Meta Platforms', shares: 210, price: 385.60, value: 80976, return: 12.3 }
          ]
        },
        { 
          asset: 'International Equity', 
          value: 575000, 
          pct: 23, 
          return: 8.7,
          stocks: [
            { ticker: 'VXUS', name: 'Vanguard Total International', shares: 9500, price: 60.53, value: 575035, return: 8.7 }
          ]
        },
        { 
          asset: 'Fixed Income', 
          value: 625000, 
          pct: 25, 
          return: 4.2,
          stocks: [
            { ticker: 'BND', name: 'Vanguard Total Bond', shares: 8200, price: 76.22, value: 624804, return: 4.2 }
          ]
        },
        { 
          asset: 'Alternatives', 
          value: 175000, 
          pct: 7, 
          return: 11.8,
          stocks: [
            { ticker: 'VNQ', name: 'Vanguard Real Estate', shares: 1850, price: 94.59, value: 174991, return: 11.8 }
          ]
        },
        { 
          asset: 'Cash & Equivalents', 
          value: 75000, 
          pct: 3, 
          return: 2.1,
          stocks: [
            { ticker: 'VMFXX', name: 'Vanguard Money Market', shares: 75000, price: 1.00, value: 75000, return: 2.1 }
          ]
        }
      ],
      recentActivity: [
        { date: '2025-09-28', type: 'Buy', asset: 'VTSAX', amount: 25000 },
        { date: '2025-09-15', type: 'Dividend', asset: 'Portfolio', amount: 3200 },
        { date: '2025-09-01', type: 'Rebalance', asset: 'Multiple', amount: 0 }
      ]
    },
    { 
      id: 2, 
      name: 'Chen, M', 
      fullName: 'Michael Chen',
      aum: 1800000, 
      returns: { ytd: 8.7, mtd: 1.2, '1yr': 9.8, '3yr': 22.1 }, 
      risk: 'Conservative', 
      status: 'Active', 
      alerts: 0,
      email: 'mchen@email.com',
      phone: '(555) 234-5678',
      since: '2020',
      holdings: [
        { 
          asset: 'US Large Cap Equity', 
          value: 540000, 
          pct: 30, 
          return: 12.1,
          stocks: [
            { ticker: 'VTI', name: 'Vanguard Total Stock Market', shares: 2100, price: 257.14, value: 539994, return: 12.1 }
          ]
        },
        { 
          asset: 'International Equity', 
          value: 360000, 
          pct: 20, 
          return: 7.3,
          stocks: [
            { ticker: 'VXUS', name: 'Vanguard Total International', shares: 5950, price: 60.50, value: 359975, return: 7.3 }
          ]
        },
        { 
          asset: 'Fixed Income', 
          value: 720000, 
          pct: 40, 
          return: 4.8,
          stocks: [
            { ticker: 'BND', name: 'Vanguard Total Bond', shares: 9450, price: 76.19, value: 720000, return: 4.8 }
          ]
        },
        { 
          asset: 'Alternatives', 
          value: 90000, 
          pct: 5, 
          return: 9.2,
          stocks: [
            { ticker: 'GLD', name: 'SPDR Gold Trust', shares: 480, price: 187.50, value: 90000, return: 9.2 }
          ]
        },
        { 
          asset: 'Cash & Equivalents', 
          value: 90000, 
          pct: 5, 
          return: 2.3,
          stocks: [
            { ticker: 'VMFXX', name: 'Vanguard Money Market', shares: 90000, price: 1.00, value: 90000, return: 2.3 }
          ]
        }
      ],
      recentActivity: [
        { date: '2025-09-25', type: 'Contribution', asset: 'Account', amount: 50000 },
        { date: '2025-09-20', type: 'Buy', asset: 'BND', amount: 50000 },
        { date: '2025-09-10', type: 'Dividend', asset: 'Portfolio', amount: 2100 }
      ]
    },
    { 
      id: 3, 
      name: 'Williams, E', 
      fullName: 'Elizabeth Williams',
      aum: 3200000, 
      returns: { ytd: 16.8, mtd: 3.2, '1yr': 18.9, '3yr': 35.2 }, 
      risk: 'Aggressive', 
      status: 'Review', 
      alerts: 3,
      email: 'e.williams@email.com',
      phone: '(555) 345-6789',
      since: '2018',
      holdings: [
        { 
          asset: 'US Large Cap Equity', 
          value: 1600000, 
          pct: 50, 
          return: 18.5,
          stocks: [
            { ticker: 'TSLA', name: 'Tesla Inc.', shares: 2800, price: 245.30, value: 686840, return: 35.2 },
            { ticker: 'NVDA', name: 'NVIDIA Corp.', shares: 920, price: 495.20, value: 455584, return: 28.7 },
            { ticker: 'MSFT', name: 'Microsoft Corp.', shares: 650, price: 412.30, value: 267995, return: 22.1 },
            { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 1340, price: 142.15, value: 190481, return: 14.8 }
          ]
        },
        { 
          asset: 'International Equity', 
          value: 800000, 
          pct: 25, 
          return: 12.2,
          stocks: [
            { ticker: 'EEM', name: 'iShares MSCI Emerging Markets', shares: 18500, price: 43.24, value: 799940, return: 12.2 }
          ]
        },
        { 
          asset: 'Fixed Income', 
          value: 480000, 
          pct: 15, 
          return: 3.9,
          stocks: [
            { ticker: 'AGG', name: 'iShares Core US Aggregate', shares: 4650, price: 103.23, value: 480020, return: 3.9 }
          ]
        },
        { 
          asset: 'Alternatives', 
          value: 256000, 
          pct: 8, 
          return: 14.7,
          stocks: [
            { ticker: 'VNQ', name: 'Vanguard Real Estate', shares: 2700, price: 94.81, value: 255987, return: 14.7 }
          ]
        },
        { 
          asset: 'Cash & Equivalents', 
          value: 64000, 
          pct: 2, 
          return: 2.2,
          stocks: [
            { ticker: 'VMFXX', name: 'Vanguard Money Market', shares: 64000, price: 1.00, value: 64000, return: 2.2 }
          ]
        }
      ],
      recentActivity: [
        { date: '2025-09-29', type: 'Alert', asset: 'Portfolio Drift', amount: 0 },
        { date: '2025-09-22', type: 'Buy', asset: 'QQQ', amount: 75000 },
        { date: '2025-09-12', type: 'Dividend', asset: 'Portfolio', amount: 4200 }
      ]
    },
    { 
      id: 4, 
      name: 'Rodriguez, D', 
      fullName: 'David Rodriguez',
      aum: 950000, 
      returns: { ytd: 10.2, mtd: 1.8, '1yr': 11.3, '3yr': 24.8 }, 
      risk: 'Moderate', 
      status: 'Active', 
      alerts: 1,
      email: 'drodriguez@email.com',
      phone: '(555) 456-7890',
      since: '2021',
      holdings: [
        { 
          asset: 'US Large Cap Equity', 
          value: 380000, 
          pct: 40, 
          return: 13.8,
          stocks: [
            { ticker: 'SPY', name: 'SPDR S&P 500 ETF', shares: 850, price: 447.06, value: 380001, return: 13.8 }
          ]
        },
        { 
          asset: 'International Equity', 
          value: 237500, 
          pct: 25, 
          return: 9.1,
          stocks: [
            { ticker: 'VXUS', name: 'Vanguard Total International', shares: 3925, price: 60.51, value: 237501, return: 9.1 }
          ]
        },
        { 
          asset: 'Fixed Income', 
          value: 237500, 
          pct: 25, 
          return: 4.5,
          stocks: [
            { ticker: 'BND', name: 'Vanguard Total Bond', shares: 3115, price: 76.24, value: 237488, return: 4.5 }
          ]
        },
        { 
          asset: 'Alternatives', 
          value: 66500, 
          pct: 7, 
          return: 10.9,
          stocks: [
            { ticker: 'VNQ', name: 'Vanguard Real Estate', shares: 700, price: 95.00, value: 66500, return: 10.9 }
          ]
        },
        { 
          asset: 'Cash & Equivalents', 
          value: 28500, 
          pct: 3, 
          return: 2.1,
          stocks: [
            { ticker: 'VMFXX', name: 'Vanguard Money Market', shares: 28500, price: 1.00, value: 28500, return: 2.1 }
          ]
        }
      ],
      recentActivity: [
        { date: '2025-09-27', type: 'Alert', asset: 'Tech Concentration', amount: 0 },
        { date: '2025-09-18', type: 'Contribution', asset: 'Account', amount: 10000 },
        { date: '2025-09-08', type: 'Dividend', asset: 'Portfolio', amount: 1200 }
      ]
    },
    { 
      id: 5, 
      name: 'Park, L', 
      fullName: 'Lisa Park',
      aum: 4100000, 
      returns: { ytd: 7.3, mtd: 0.9, '1yr': 8.1, '3yr': 19.7 }, 
      risk: 'Conservative', 
      status: 'Inactive', 
      alerts: 0,
      email: 'lpark@email.com',
      phone: '(555) 567-8901',
      since: '2017',
      holdings: [
        { 
          asset: 'US Large Cap Equity', 
          value: 1230000, 
          pct: 30, 
          return: 11.5,
          stocks: [
            { ticker: 'VTI', name: 'Vanguard Total Stock Market', shares: 4785, price: 257.08, value: 1229998, return: 11.5 }
          ]
        },
        { 
          asset: 'International Equity', 
          value: 820000, 
          pct: 20, 
          return: 6.8,
          stocks: [
            { ticker: 'VXUS', name: 'Vanguard Total International', shares: 13550, price: 60.52, value: 820046, return: 6.8 }
          ]
        },
        { 
          asset: 'Fixed Income', 
          value: 1640000, 
          pct: 40, 
          return: 4.3,
          stocks: [
            { ticker: 'BND', name: 'Vanguard Total Bond', shares: 21500, price: 76.28, value: 1640020, return: 4.3 }
          ]
        },
        { 
          asset: 'Alternatives', 
          value: 205000, 
          pct: 5, 
          return: 8.7,
          stocks: [
            { ticker: 'GLD', name: 'SPDR Gold Trust', shares: 1095, price: 187.21, value: 204995, return: 8.7 }
          ]
        },
        { 
          asset: 'Cash & Equivalents', 
          value: 205000, 
          pct: 5, 
          return: 2.4,
          stocks: [
            { ticker: 'VMFXX', name: 'Vanguard Money Market', shares: 205000, price: 1.00, value: 205000, return: 2.4 }
          ]
        }
      ],
      recentActivity: [
        { date: '2025-08-30', type: 'Dividend', asset: 'Portfolio', amount: 5100 },
        { date: '2025-08-15', type: 'Rebalance', asset: 'Multiple', amount: 0 },
        { date: '2025-08-01', type: 'Buy', asset: 'AGG', amount: 100000 }
      ]
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
                <div className="text-orange-400 text-xs font-bold mb-3">CLIENT ROSTER</div>
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
                        {selectedHolding.stocks.map((stock, idx) => (
                          <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                            <td className="py-3 px-2 text-orange-400 font-bold">{stock.ticker}</td>
                            <td className="py-3 px-2 text-white">{stock.name}</td>
                            <td className="text-right py-3 px-2 text-gray-300">{stock.shares.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 text-cyan-400">${stock.price.toFixed(2)}</td>
                            <td className="text-right py-3 px-2 text-white font-bold">${stock.value.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 text-gray-300">
                              {((stock.value / selectedHolding.value) * 100).toFixed(1)}%
                            </td>
                            <td className={`text-right py-3 px-2 font-bold ${stock.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {stock.return >= 0 ? '+' : ''}{stock.return.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
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

export default BijiTerminal;
