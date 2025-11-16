import React, { useState } from 'react';
import { 
  Globe, MapPin, Users, DollarSign, TrendingUp, Database, Home,
  Layers, ArrowRight, Cloud, Building, Network, Zap, Shield,
  PieChart, Activity, CheckCircle, ChevronDown, Plus, Search,
  Calendar, FileText, ArrowDownRight, ArrowUpRight, Wallet,
  Flag, GitBranch, Box, Server, Link2
} from 'lucide-react';

const NetworkStateLOFT = () => {
  const [selectedHouse, setSelectedHouse] = useState('smithfamily');
  const [selectedEnclave, setSelectedEnclave] = useState(null);
  const [activeView, setActiveView] = useState('overview');

  const houses = [
    { id: 'smithfamily', name: 'Smith Family House', members: 8, netWorth: 2458932, enclaves: 3 },
    { id: 'techcollective', name: 'Tech Collective', members: 24, netWorth: 8920450, enclaves: 7 },
    { id: 'creatorsguild', name: 'Creators Guild', members: 15, netWorth: 4532100, enclaves: 5 }
  ];

  const enclaves = [
    { id: 1, city: 'Austin, TX', type: 'Residential', units: 12, value: 1200000, members: 15 },
    { id: 2, city: 'Miami, FL', type: 'Co-working', units: 8, value: 800000, members: 22 },
    { id: 3, city: 'Denver, CO', type: 'Mixed Use', units: 6, value: 950000, members: 10 },
    { id: 4, city: 'Portland, OR', type: 'Residential', units: 10, value: 1100000, members: 18 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Top Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-indigo-500/30 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center relative">
                <Network className="text-white" size={24} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Network State LOFT</h1>
                <p className="text-xs text-indigo-300">Distributed Financial Ledger</p>
              </div>
            </div>

            <div className="ml-6 flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
              <Globe className="text-indigo-300" size={16} />
              <span className="text-sm text-white font-medium">Cloud-First Capital</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select 
              value={selectedHouse}
              onChange={(e) => setSelectedHouse(e.target.value)}
              className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {houses.map(house => (
                <option key={house.id} value={house.id}>{house.name}</option>
              ))}
            </select>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-semibold">
              <Plus size={18} />
              New Transaction
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Network State LOFT Concept */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Network State Financial Architecture</h2>
              <p className="text-indigo-100 mb-4">Cloud-First → Network Archipelago → Diplomatic Recognition</p>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="text-yellow-300" size={16} />
                <span>One transaction in the central ledger updates all Houses across all Enclaves</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/30">
              <div className="text-center">
                <Database className="mx-auto mb-2" size={32} />
                <p className="text-xs font-semibold">Distributed Ledger</p>
                <p className="text-2xl font-bold mt-1">1,247</p>
                <p className="text-xs text-indigo-200">Total Transactions</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <Cloud className="mb-2 text-blue-200" size={24} />
              <p className="font-semibold text-sm">Digital Community</p>
              <p className="text-xs text-indigo-100">Online Treasury</p>
            </div>
            <ArrowRight className="self-center text-white/60" size={24} />
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <MapPin className="mb-2 text-green-200" size={24} />
              <p className="font-semibold text-sm">Network Archipelago</p>
              <p className="text-xs text-indigo-100">Physical Nodes</p>
            </div>
            <ArrowRight className="self-center text-white/60" size={24} />
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <Flag className="mb-2 text-purple-200" size={24} />
              <p className="font-semibold text-sm">Network State</p>
              <p className="text-xs text-indigo-100">Full Recognition</p>
            </div>
          </div>
        </div>

        {/* House Network Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <Users className="text-indigo-400" size={20} />
              </div>
              <ChevronDown className="text-slate-500" size={20} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Network Members</p>
            <p className="text-white text-2xl font-bold">47</p>
            <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
              <ArrowUpRight size={12} />
              +8 this month
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="text-purple-400" size={20} />
              </div>
              <ChevronDown className="text-slate-500" size={20} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Active Enclaves</p>
            <p className="text-white text-2xl font-bold">15</p>
            <p className="text-indigo-400 text-xs mt-2">Across 12 cities</p>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-400" size={20} />
              </div>
              <ChevronDown className="text-slate-500" size={20} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Network Worth</p>
            <p className="text-white text-2xl font-bold">$15.9M</p>
            <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
              <ArrowUpRight size={12} />
              +18.3% growth
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Building className="text-blue-400" size={20} />
              </div>
              <ChevronDown className="text-slate-500" size={20} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Physical Territory</p>
            <p className="text-white text-2xl font-bold">36</p>
            <p className="text-blue-400 text-xs mt-2">Properties owned</p>
          </div>
        </div>

        {/* Central Transaction Ledger */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 mb-6">
          <div className="border-b border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Database className="text-indigo-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Central Network Ledger</h3>
                  <p className="text-sm text-slate-400">Single source of truth across all Houses and Enclaves</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {['All Transactions', 'Cross-House', 'Cross-Enclave', 'Crowdfunding', 'Territory Purchase'].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    type === 'All Transactions'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-700">
            {[
              {
                id: 'NS-TXN-001',
                date: '2024-11-16',
                time: '14:30',
                description: 'Crowdfund New Enclave - Portland Hub',
                type: 'crowdfunding',
                amount: 125000,
                fromHouse: 'Multiple Houses',
                toEnclave: 'Portland, OR',
                contributors: 28,
                impactedStatements: ['House Balance Sheets', 'Network Equity', 'Territory Assets', 'Cash Flow'],
                propagation: 'All Houses'
              },
              {
                id: 'NS-TXN-002',
                date: '2024-11-15',
                time: '16:45',
                description: 'Cross-House Transfer - Infrastructure Investment',
                type: 'cross-house',
                amount: -45000,
                fromHouse: 'Tech Collective',
                toEnclave: 'Austin, TX',
                contributors: 1,
                impactedStatements: ['2 House Balance Sheets', 'Network Cash Flow', 'Infrastructure Assets'],
                propagation: '2 Houses'
              },
              {
                id: 'NS-TXN-003',
                date: '2024-11-15',
                time: '09:20',
                description: 'Member Contribution - Digital Treasury',
                type: 'contribution',
                amount: 5000,
                fromHouse: 'Smith Family House',
                toEnclave: 'Cloud Capital',
                contributors: 1,
                impactedStatements: ['House Balance Sheet', 'Income Statement', 'Network Cash Flow'],
                propagation: '1 House'
              },
              {
                id: 'NS-TXN-004',
                date: '2024-11-14',
                time: '11:00',
                description: 'Territory Purchase - Denver Co-living Space',
                type: 'territory',
                amount: -950000,
                fromHouse: 'Network Treasury',
                toEnclave: 'Denver, CO',
                contributors: 15,
                impactedStatements: ['All House Sheets', 'Territory Assets', 'Network Worth', 'Cash Flow'],
                propagation: 'Entire Network'
              }
            ].map((txn) => (
              <div key={txn.id} className="p-5 hover:bg-slate-700/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      txn.type === 'crowdfunding' ? 'bg-green-500/20' :
                      txn.type === 'cross-house' ? 'bg-purple-500/20' :
                      txn.type === 'contribution' ? 'bg-blue-500/20' :
                      'bg-orange-500/20'
                    }`}>
                      {txn.type === 'crowdfunding' ? (
                        <Users className="text-green-400" size={28} />
                      ) : txn.type === 'cross-house' ? (
                        <GitBranch className="text-purple-400" size={28} />
                      ) : txn.type === 'contribution' ? (
                        <Wallet className="text-blue-400" size={28} />
                      ) : (
                        <Building className="text-orange-400" size={28} />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-white text-lg">{txn.description}</span>
                        <span className="text-xs px-3 py-1 bg-slate-900 text-slate-400 rounded-full border border-slate-700">
                          {txn.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {txn.date} at {txn.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Network size={14} />
                          {txn.fromHouse} → {txn.toEnclave}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {txn.contributors} contributor{txn.contributors > 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-slate-500">Network Propagation:</span>
                        <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                          {txn.propagation}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-slate-500">Auto-updates:</span>
                        {txn.impactedStatements.map((statement) => (
                          <span
                            key={statement}
                            className="text-xs px-2 py-1 bg-purple-500/10 text-purple-300 rounded border border-purple-500/30"
                          >
                            {statement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <div className={`text-2xl font-bold ${
                      txn.amount > 0 ? 'text-green-400' : 'text-white'
                    }`}>
                      {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount).toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 capitalize">
                      {txn.type.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-900/50">
            <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
              Load more transactions →
            </button>
          </div>
        </div>

        {/* Network Archipelago Map */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="text-purple-400" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Network Archipelago</h3>
                <p className="text-sm text-slate-400">Physical nodes connected by digital infrastructure</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
              <Plus size={18} />
              Add Enclave
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {enclaves.map((enclave) => (
              <div
                key={enclave.id}
                className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors cursor-pointer"
                onClick={() => setSelectedEnclave(enclave)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Building className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{enclave.city}</h4>
                      <p className="text-xs text-slate-400">{enclave.type}</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Units</p>
                    <p className="text-white font-semibold">{enclave.units}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Value</p>
                    <p className="text-white font-semibold">${(enclave.value / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Members</p>
                    <p className="text-white font-semibold">{enclave.members}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three Financial Statements - Auto-Updated */}
        <div className="grid grid-cols-3 gap-6">
          {/* Network Balance Sheet */}
          <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="border-b border-slate-700 p-4 bg-slate-900/50">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="text-indigo-400" size={20} />
                <h3 className="font-bold text-white">Network Balance Sheet</h3>
              </div>
              <p className="text-xs text-slate-400">Aggregated from all Houses & Enclaves</p>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">Assets</span>
                  <span className="text-sm font-bold text-white">$18.2M</span>
                </div>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Digital Treasury</span>
                    <span className="text-white">$3.5M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Physical Territory</span>
                    <span className="text-white">$12.8M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Crypto Assets</span>
                    <span className="text-white">$1.9M</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">Liabilities</span>
                  <span className="text-sm font-bold text-white">$2.3M</span>
                </div>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Property Loans</span>
                    <span className="text-white">$1.8M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Obligations</span>
                    <span className="text-white">$500K</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-indigo-500/30">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Network Equity</span>
                  <span className="font-bold text-indigo-400">$15.9M</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Distributed across 47 members</p>
              </div>
            </div>
          </div>

          {/* Network Income Statement */}
          <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="border-b border-slate-700 p-4 bg-slate-900/50">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-green-400" size={20} />
                <h3 className="font-bold text-white">Network Income</h3>
              </div>
              <p className="text-xs text-slate-400">Combined House performance</p>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">Revenue</span>
                  <span className="text-sm font-bold text-green-400">$342K</span>
                </div>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Member Contributions</span>
                    <span className="text-white">$185K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Rental Income</span>
                    <span className="text-white">$95K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Business Revenue</span>
                    <span className="text-white">$62K</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">Expenses</span>
                  <span className="text-sm font-bold text-red-400">$198K</span>
                </div>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Property Maintenance</span>
                    <span className="text-white">$85K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Infrastructure</span>
                    <span className="text-white">$62K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Operations</span>
                    <span className="text-white">$51K</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-green-500/30">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Net Income</span>
                  <span className="font-bold text-green-400">$144K</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Monthly average</p>
              </div>
            </div>
          </div>

          {/* Network Cash Flow */}
          <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="border-b border-slate-700 p-4 bg-slate-900/50">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="text-blue-400" size={20} />
                <h3 className="font-bold text-white">Network Cash Flow</h3>
              </div>
              <p className="text-xs text-slate-400">Distributed liquidity tracking</p>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">Operating</span>
                  <span className="text-sm font-bold text-green-400">$144K</span>
                </div>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Cash from Operations</span>
                    <span className="text-green-400">+$342K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Operating Expenses</span>
                    <span className="text-red-400">-$198K</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">Investing</span>
                  <span className="text-sm font-bold text-orange-400">-$950K</span>
                </div>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Territory Purchase</span>
                    <span className="text-red-400">-$950K</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-300">Financing</span>
                  <span className="text-sm font-bold text-green-400">$850K</span>
                </div>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Member Crowdfunding</span>
                    <span className="text-green-400">+$850K</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-blue-500/30">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Net Cash Flow</span>
                  <span className="font-bold text-green-400">$44K</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Monthly net change</p>
              </div>
            </div>
          </div>
        </div>

        {/* Network State Progression */}
        <div className="mt-6 bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Flag className="text-indigo-400" size={24} />
            Network State Progression
          </h3>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="space-y-6">
              {[
                {
                  stage: 'Digital Community',
                  status: 'complete',
                  icon: Cloud,
                  metrics: { members: 47, treasury: '$3.5M' },
                  color: 'bg-green-500'
                },
                {
                  stage: 'Network Archipelago',
                  status: 'active',
                  icon: MapPin,
                  metrics: { enclaves: 15, territory: '36 properties' },
                  color: 'bg-indigo-500 animate-pulse'
                },
                {
                  stage: 'Crowdfunded Territory',
                  status: 'active',
                  icon: Building,
                  metrics: { raised: '$12.8M', properties: '36 units' },
                  color: 'bg-indigo-500'
                },
                {
                  stage: 'Network State',
                  status: 'future',
                  icon: Flag,
                  metrics: { target: '1M members', recognition: 'Pending' },
                  color: 'bg-slate-700'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="relative flex items-center gap-4">
                    <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center z-10 border-4 border-slate-800`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    
                    <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-white text-lg">{item.stage}</h4>
                          <p className="text-xs text-slate-400 capitalize">{item.status}</p>
                        </div>
                        <div className="text-right">
                          {Object.entries(item.metrics).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-slate-400">{key}: </span>
                              <span className="text-white font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* LOFT Propagation Visualization */}
        <div className="mt-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-indigo-500/30 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="text-yellow-400" size={24} />
            Transaction Propagation Flow
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            How a single transaction in the central ledger automatically updates all financial statements across the entire Network State
          </p>

          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="bg-indigo-500/20 border border-indigo-500/50 rounded-lg p-4 text-center">
              <Database className="mx-auto mb-2 text-indigo-400" size={32} />
              <p className="text-white font-semibold text-sm">Transaction Entry</p>
              <p className="text-xs text-slate-400 mt-1">Single input</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="text-indigo-400" size={28} />
              <p className="text-xs text-slate-500">Propagates to</p>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4 text-center">
              <Network className="mx-auto mb-2 text-purple-400" size={32} />
              <p className="text-white font-semibold text-sm">All Houses</p>
              <p className="text-xs text-slate-400 mt-1">3 Houses updated</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="text-purple-400" size={28} />
              <p className="text-xs text-slate-500">Updates</p>
            </div>

            <div className="space-y-2">
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-2 text-center">
                <FileText className="mx-auto mb-1 text-green-400" size={20} />
                <p className="text-white font-semibold text-xs">Balance Sheets</p>
              </div>
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-2 text-center">
                <TrendingUp className="mx-auto mb-1 text-blue-400" size={20} />
                <p className="text-white font-semibold text-xs">Income Statements</p>
              </div>
              <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-2 text-center">
                <Activity className="mx-auto mb-1 text-orange-400" size={20} />
                <p className="text-white font-semibold text-xs">Cash Flow</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <CheckCircle className="text-green-400 mb-2" size={20} />
              <p className="text-white font-semibold text-sm mb-1">Cross-House Sync</p>
              <p className="text-xs text-slate-400">All Houses see the same transaction instantly</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <CheckCircle className="text-green-400 mb-2" size={20} />
              <p className="text-white font-semibold text-sm mb-1">Multi-Enclave Updates</p>
              <p className="text-xs text-slate-400">Territory changes reflected across all nodes</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <CheckCircle className="text-green-400 mb-2" size={20} />
              <p className="text-white font-semibold text-sm mb-1">Immutable Record</p>
              <p className="text-xs text-slate-400">Single source of truth, blockchain-verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkStateLOFT;