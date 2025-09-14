import React, { useState } from 'react';
import {
  Search,
  Bell,
  Settings,
  Home,
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Briefcase,
  Zap,
  Utensils,
  Wallet,
  Plane,
  BarChart3,
  Plus,
  Send,
  Receipt,
  RotateCcw,
  FolderOpen,
  PieChart,
  Users,
  Target,
  FileText,
  BarChart,
  HelpCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function ExpenzoDashboard() {
  const [activeTab, setActiveTab] = useState('week');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactionSearch, setTransactionSearch] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", message: "Your budget for 'Shopping' is running low.", timestamp: "3h ago", read: false },
    { id: 2, type: "success", message: "Salary deposit of $2750.00 has been processed.", timestamp: "1d ago", read: false },
    { id: 3, type: "warning", message: "You have a recurring bill due tomorrow.", timestamp: "2d ago", read: true },
    { id: 4, type: "message", message: "John has accepted your payment request.", timestamp: "3d ago", read: true },
    { id: 5, type: "info", message: "A new feature, 'Goals', is now available.", timestamp: "1w ago", read: true }
  ]);

  // Mock data
  const summaryData = [
    { label: "Total Balance", amount: "$14,278.45", change: "+2.6%", is_positive: true, icon: "dollar-sign" },
    { label: "Monthly Income", amount: "$3,100.00", change: "+5.1%", is_positive: true, icon: "trending-up" },
    { label: "Monthly Expenses", amount: "$1,823.75", change: "-12.3%", is_positive: false, icon: "trending-down" },
    { label: "Savings Rate", amount: "41.2%", change: "+2.1%", is_positive: true, icon: "percent" }
  ];

  const chartData = {
    week: [
      { day: "Mon", value: 3000 },
      { day: "Tue", value: 4500 },
      { day: "Wed", value: 3800 },
      { day: "Thu", value: 5200 },
      { day: "Fri", value: 4800 },
      { day: "Sat", value: 6000 },
      { day: "Sun", value: 5500 }
    ],
    month: [
      { day: "Week 1", value: 25000 },
      { day: "Week 2", value: 32000 },
      { day: "Week 3", value: 28000 },
      { day: "Week 4", value: 35000 }
    ],
    year: [
      { day: "Q1", value: 120000 },
      { day: "Q2", value: 140000 },
      { day: "Q3", value: 130000 },
      { day: "Q4", value: 160000 }
    ]
  };

  const transactions = [
    { id: 1, name: "Grocery Store", date: "Today, 2:34 PM", category: "Shopping", amount: "-$84.32", is_expense: true, icon: "shopping-bag" },
    { id: 2, name: "Salary Deposit", date: "Yesterday, 9:00 AM", category: "Income", amount: "+$2,750.00", is_expense: false, icon: "dollar-sign" },
    { id: 3, name: "Electric Bill", date: "Apr 15, 2025", category: "Utilities", amount: "-$124.75", is_expense: true, icon: "bolt" },
    { id: 4, name: "Freelance Payment", date: "Apr 14, 2025", category: "Income", amount: "+$350.00", is_expense: false, icon: "briefcase" },
    { id: 5, name: "Restaurant Dinner", date: "Apr 12, 2025", category: "Food", amount: "-$85.50", is_expense: true, icon: "utensils" }
  ];

  const wallets = [
    { id: 1, name: "Main Savings", amount: "$2,543.89", change: "+3.5%", is_positive: true, icon: "credit-card" },
    { id: 2, name: "Emergency Fund", amount: "$10,234.56", change: "+0.1%", is_positive: true, icon: "wallet" },
    { id: 3, name: "Travel Budget", amount: "$1,500.00", change: "-1.3%", is_positive: false, icon: "plane" },
    { id: 4, name: "Investments", amount: "$5,678.42", change: "+3.7%", is_positive: true, icon: "bar-chart" }
  ];

  const quickActions = [
    { id: 1, label: "Add Money", icon: "plus", description: "Deposit funds into a wallet." },
    { id: 2, label: "Send Money", icon: "send", description: "Transfer to friends or banks." },
    { id: 3, label: "Pay Bills", icon: "receipt", description: "Pay your recurring bills." },
    { id: 4, label: "Transfer", icon: "rotate-ccw", description: "Move money between wallets." },
    { id: 5, label: "My Wallets", icon: "folder-open", description: "View and manage all wallets." },
    { id: 6, label: "Reports", icon: "pie-chart", description: "Export your spending data." }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, active: true },
    { id: 'budget', label: 'Budget', icon: TrendingUp, active: false },
    { id: 'bills', label: 'Bills', icon: Receipt, active: false },
    { id: 'goals', label: 'Goals', icon: Target, active: false },
    { id: 'reports', label: 'Reports', icon: BarChart, active: false },
    { id: 'docs', label: 'Docs', icon: FileText, active: false }
  ];

  const getIcon = (iconName) => {
    const iconMap = {
      'dollar-sign': DollarSign,
      'trending-up': TrendingUp,
      'trending-down': TrendingDown,
      'percent': Percent,
      'shopping-bag': ShoppingBag,
      'briefcase': Briefcase,
      'bolt': Zap,
      'utensils': Utensils,
      'credit-card': CreditCard,
      'wallet': Wallet,
      'plane': Plane,
      'bar-chart': BarChart3,
      'plus': Plus,
      'send': Send,
      'receipt': Receipt,
      'rotate-ccw': RotateCcw,
      'folder-open': FolderOpen,
      'pie-chart': PieChart
    };
    return iconMap[iconName] || DollarSign;
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    transaction.category.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    transaction.amount.toLowerCase().includes(transactionSearch.toLowerCase())
  );

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleQuickAction = (action) => {
    alert(`${action.label}: ${action.description}`);
  };

  const renderDashboardContent = () => {
    if (currentPage !== 'dashboard') {
      return (
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4 capitalize">{currentPage}</h1>
          <p className="text-[#B3B3B3]">This page is under construction.</p>
        </div>
      );
    }

    return (
      <>
        {/* Summary Cards Grid */}
        <div className="p-8 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryData.map((card, index) => {
              const IconComponent = getIcon(card.icon);
              return (
                <div key={index} className="bg-[#1E1F21] rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#242526] rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-sm flex items-center ${card.is_positive ? 'text-[#4CAF50]' : 'text-[#FF4D4D]'}`}>
                      {card.is_positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      {card.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{card.amount}</div>
                  <div className="text-[#B3B3B3] text-sm">{card.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wallet Overview Chart Section */}
        <div className="p-8 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Chart Section (60%) */}
            <div className="lg:col-span-3">
              <div className="bg-[#1E1F21] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Wallet Overview</h2>
                  <div className="flex space-x-2">
                    {['week', 'month', 'year'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setActiveTab(period)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === period
                            ? 'bg-[#2D2F32] text-white'
                            : 'text-[#B3B3B3] hover:text-white hover:bg-[#242526]'
                        }`}
                      >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData[activeTab]}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#B3B3B3', fontSize: 12 }}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1E1F21',
                          border: '1px solid #242526',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#4CAF50"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Metrics Cards */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$12,450</div>
                    <div className="text-[#B3B3B3] text-sm">Current Balance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$11,280</div>
                    <div className="text-[#B3B3B3] text-sm">Previous Balance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4CAF50]">+10.4%</div>
                    <div className="text-[#B3B3B3] text-sm">Growth</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet List (40%) */}
            <div className="lg:col-span-2">
              <div className="bg-[#1E1F21] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">My Wallets</h2>
                <div className="space-y-4">
                  {wallets.map((wallet) => {
                    const IconComponent = getIcon(wallet.icon);
                    return (
                      <div key={wallet.id} className="flex items-center justify-between p-4 bg-[#242526] rounded-lg hover:bg-[#2D2F32] transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#1E1F21] rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{wallet.name}</div>
                            <div className="text-[#B3B3B3] text-sm">{wallet.amount}</div>
                          </div>
                        </div>
                        <div className={`text-sm ${wallet.is_positive ? 'text-[#4CAF50]' : 'text-[#FF4D4D]'}`}>
                          {wallet.change}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions and Quick Actions */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Recent Transactions (60%) */}
            <div className="lg:col-span-3">
              <div className="bg-[#1E1F21] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
                
                {/* Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#777]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={transactionSearch}
                    onChange={(e) => setTransactionSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#242526] border-none rounded-full text-white placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div className="space-y-2">
                  {filteredTransactions.map((transaction) => {
                    const IconComponent = getIcon(transaction.icon);
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-[#2D2F32] rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-[#1E1F21] rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{transaction.name}</div>
                            <div className="text-[#B3B3B3] text-sm">{transaction.date}</div>
                            <div className="text-[#B3B3B3] text-xs">{transaction.category}</div>
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${transaction.is_expense ? 'text-[#FF4D4D]' : 'text-[#4CAF50]'}`}>
                          {transaction.amount}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions (40%) */}
            <div className="lg:col-span-2">
              <div className="bg-[#1E1F21] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action) => {
                    const IconComponent = getIcon(action.icon);
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action)}
                        className="p-4 bg-[#242526] rounded-xl hover:bg-[#2D2F32] transition-colors text-center"
                      >
                        <div className="w-12 h-12 bg-[#1E1F21] rounded-lg flex items-center justify-center mx-auto mb-3">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-white text-sm font-medium">{action.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#0D0E0F] text-white font-inter">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-[#151618] border-r border-[#242526] z-40">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Expenzo</span>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3 p-4 bg-[#1E1F21] rounded-lg">
            <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">JD</span>
            </div>
            <div>
              <div className="text-white font-bold">John Doe</div>
              <div className="text-[#B3B3B3] text-sm">johndoe@example.com</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-2">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-[#191B1D] border-l-4 border-[#4CAF50] text-white'
                    : 'text-[#B3B3B3] hover:bg-[#191B1D] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Quick Actions Section */}
        <div className="px-4 py-6">
          <h3 className="text-[#B3B3B3] text-sm font-medium mb-4 px-4">QUICK ACTIONS</h3>
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-[#4CAF50] hover:bg-[#449548] rounded-full transition-colors">
            <Plus className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Add New Wallet</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80">
        {/* Header */}
        <header className="h-20 bg-[#0D0E0F] border-b border-[#242526] flex items-center justify-between px-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#777]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-60 pl-10 pr-4 py-2 bg-[#242526] border-none rounded-full text-white placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-12 h-12 bg-[#242526] rounded-full flex items-center justify-center hover:bg-[#2D2F32] transition-colors"
              >
                <Bell className="w-6 h-6 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4D4D] rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#1E1F21] border border-[#242526] rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-[#242526]">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationAsRead(notification.id)}
                        className={`p-4 border-b border-[#242526] hover:bg-[#242526] cursor-pointer ${
                          !notification.read ? 'bg-[#191B1D]' : ''
                        }`}
                      >
                        <div className="text-white text-sm">{notification.message}</div>
                        <div className="text-[#B3B3B3] text-xs mt-1">{notification.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Settings Icon */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-12 h-12 bg-[#242526] rounded-full flex items-center justify-center hover:bg-[#2D2F32] transition-colors"
              >
                <Settings className="w-6 h-6 text-white" />
              </button>

              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#1E1F21] border border-[#242526] rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-white hover:bg-[#242526] rounded">Profile</button>
                    <button className="w-full text-left px-3 py-2 text-white hover:bg-[#242526] rounded">Settings</button>
                    <button className="w-full text-left px-3 py-2 text-white hover:bg-[#242526] rounded">Help</button>
                    <button className="w-full text-left px-3 py-2 text-[#FF4D4D] hover:bg-[#242526] rounded">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main>
          {renderDashboardContent()}
        </main>

        {/* Footer */}
        <footer className="bg-[#151618] border-t border-[#242526] px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-[#B3B3B3] text-sm">
              © 2025 Expenzo. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-[#B3B3B3] hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-[#B3B3B3] hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Click outside handler */}
      {(showNotifications || showSettings) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowSettings(false);
          }}
        />
      )}
    </div>
  );
}