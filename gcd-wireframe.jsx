import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Users, BookOpen, Shield, Vote, RefreshCw, Home, Settings, User, DollarSign, TrendingUp, Calendar, FileText, AlertCircle, Check, X } from 'lucide-react';

const GCDWireframes = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      id: 1,
      title: "1. Founder's Lineage & House Creation",
      component: <FounderLineageScreen />
    },
    {
      id: 2,
      title: "2. Record of Ledger - Transaction Database",
      component: <LedgerDatabaseScreen />
    },
    {
      id: 3,
      title: "3. Golden Inner Circle - Member Management",
      component: <MemberManagementScreen />
    },
    {
      id: 4,
      title: "4. Role Structure & Voting System",
      component: <RoleVotingScreen />
    },
    {
      id: 5,
      title: "5. House Lifecycle - Rebirth, Merger, Disbandment",
      component: <HouseLifecycleScreen />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">GCD MVP Wireframes</h1>
          <p className="text-purple-300">Five Core Components - UI/UX Design</p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-8">
          {screens.map((screen, idx) => (
            <div
              key={screen.id}
              onClick={() => setCurrentScreen(idx)}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                idx === currentScreen
                  ? 'bg-purple-600 text-white scale-110'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {screens[currentScreen].title}
          </h2>
          <div className="bg-slate-900 rounded-lg p-6">
            {screens[currentScreen].component}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentScreen(Math.max(0, currentScreen - 1))}
            disabled={currentScreen === 0}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <div className="text-purple-300">
            Screen {currentScreen + 1} of {screens.length}
          </div>
          <button
            onClick={() => setCurrentScreen(Math.min(screens.length - 1, currentScreen + 1))}
            disabled={currentScreen === screens.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FounderLineageScreen = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <Home className="text-purple-400" size={24} />
          <span className="text-white font-semibold">Create New House</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500">
            Deploy House
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="text-purple-400" size={20} />
              House Foundation
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">House Name</label>
                <input
                  type="text"
                  placeholder="Enter your House name"
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">House Motto</label>
                <input
                  type="text"
                  placeholder="Your House's guiding principle"
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Founder Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="text-purple-400" size={20} />
              Lineage Configuration
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-purple-600" />
                <span className="text-slate-300">Enable Founder Lineage Succession</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-purple-600" />
                <span className="text-slate-300">Allow Family Business Integration</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-purple-600" />
                <span className="text-slate-300">Multi-Generational Asset Tracking</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="text-purple-400" size={20} />
              Founder Rules
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Core House Rules</label>
                <textarea
                  placeholder="Define the fundamental rules..."
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-purple-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Voting Mechanism</label>
                <select className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-purple-500 outline-none">
                  <option>Simple Majority</option>
                  <option>Weighted Voting</option>
                  <option>Quadratic Voting</option>
                  <option>Time-Weighted Consensus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Consensus Threshold</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    defaultValue="64"
                    className="flex-1 accent-purple-600"
                  />
                  <span className="text-white font-semibold">64%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="text-purple-400" size={20} />
              Financial Thresholds
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Consul Threshold</span>
                <input
                  type="text"
                  placeholder="$1,000,000"
                  className="w-32 px-3 py-1 bg-slate-700 text-white rounded border border-slate-600 text-right"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Senator Threshold</span>
                <input
                  type="text"
                  placeholder="$500,000"
                  className="w-32 px-3 py-1 bg-slate-700 text-white rounded border border-slate-600 text-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Lineage Structure Preview</h3>
        <div className="flex items-center justify-center gap-8 py-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-2">
              <User className="text-white" size={32} />
            </div>
            <p className="text-white font-semibold">Founder</p>
            <p className="text-slate-400 text-sm">You</p>
          </div>
          <ChevronRight className="text-slate-600" size={32} />
          <div className="text-center opacity-50">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-2">
              <User className="text-slate-500" size={32} />
            </div>
            <p className="text-slate-500 font-semibold">Heir 1</p>
            <p className="text-slate-600 text-sm">Next Gen</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LedgerDatabaseScreen = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="text-purple-400" size={24} />
          <span className="text-white font-semibold">House Ledger - Double Entry System</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 flex items-center gap-2">
            <FileText size={16} />
            Export
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 flex items-center gap-2">
            <DollarSign size={16} />
            New Transaction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg">
          <p className="text-green-100 text-sm mb-1">Total House Net Worth</p>
          <p className="text-white text-2xl font-bold">$2,458,932</p>
          <p className="text-green-200 text-xs mt-2 flex items-center gap-1">
            <TrendingUp size={12} />
            +12.4% this quarter
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg">
          <p className="text-blue-100 text-sm mb-1">Total Assets</p>
          <p className="text-white text-2xl font-bold">$3,124,567</p>
          <p className="text-blue-200 text-xs mt-2">15 verified assets</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-4 rounded-lg">
          <p className="text-orange-100 text-sm mb-1">Total Liabilities</p>
          <p className="text-white text-2xl font-bold">$665,635</p>
          <p className="text-orange-200 text-xs mt-2">3 active obligations</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg">
          <p className="text-purple-100 text-sm mb-1">Monthly Cash Flow</p>
          <p className="text-white text-2xl font-bold">+$42,380</p>
          <p className="text-purple-200 text-xs mt-2">Average past 3 months</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 bg-slate-700 text-white rounded border border-slate-600 text-sm"
            />
          </div>

          <div className="space-y-2">
            {[
              { id: 'TX-001', date: '2024-11-15', from: 'External Income', to: 'House Treasury', amount: '+$5,000', verified: true },
              { id: 'TX-002', date: '2024-11-14', from: 'House Treasury', to: 'Member: John', amount: '-$1,200', verified: true },
              { id: 'TX-003', date: '2024-11-14', from: 'Business Revenue', to: 'House Treasury', amount: '+$8,500', verified: true },
            ].map((tx) => (
              <div key={tx.id} className="bg-slate-700 p-4 rounded-lg hover:bg-slate-650 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${tx.verified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{tx.id}</span>
                        <span className="text-slate-400 text-sm">{tx.date}</span>
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        {tx.from} → {tx.to}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.amount}
                    </div>
                    <div className="text-slate-400 text-xs mt-1">
                      {tx.verified ? 'Verified' : 'Pending'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Double Entry Verification</h3>
          
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300 text-sm">Debit Entries</span>
                <Check className="text-green-500" size={20} />
              </div>
              <div className="text-white text-xl font-bold">$127,850</div>
              <div className="text-slate-400 text-xs mt-2">45 entries this month</div>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300 text-sm">Credit Entries</span>
                <Check className="text-green-500" size={20} />
              </div>
              <div className="text-white text-xl font-bold">$127,850</div>
              <div className="text-slate-400 text-xs mt-2">45 entries this month</div>
            </div>

            <div className="bg-green-900/30 border border-green-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Check className="text-green-500" size={20} />
                <span className="text-green-400 font-semibold">Balanced</span>
              </div>
              <p className="text-green-300 text-xs">All entries verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberManagementScreen = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <Shield className="text-purple-400" size={24} />
          <span className="text-white font-semibold">Golden Inner Circle - Member Registry</span>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 flex items-center gap-2">
          <Users size={16} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg">
          <Users className="text-purple-200 mb-2" size={24} />
          <p className="text-white text-2xl font-bold">24</p>
          <p className="text-purple-200 text-sm">Total Members</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg">
          <User className="text-blue-200 mb-2" size={24} />
          <p className="text-white text-2xl font-bold">3</p>
          <p className="text-blue-200 text-sm">Consul/Senator</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg">
          <TrendingUp className="text-green-200 mb-2" size={24} />
          <p className="text-white text-2xl font-bold">12</p>
          <p className="text-green-200 text-sm">Equites</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-4 rounded-lg">
          <Shield className="text-orange-200 mb-2" size={24} />
          <p className="text-white text-2xl font-bold">9</p>
          <p className="text-orange-200 text-sm">Freedmen</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-lg">
          <AlertCircle className="text-red-200 mb-2" size={24} />
          <p className="text-white text-2xl font-bold">0</p>
          <p className="text-red-200 text-sm">Nullified</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Member Directory</h3>

          <div className="space-y-2">
            {[
              { name: 'John Founder', role: 'Founder', netWorth: '$2,458,932', contribution: 98, warnings: 0 },
              { name: 'Sarah Smith', role: 'Consul', netWorth: '$1,250,000', contribution: 95, warnings: 0 },
              { name: 'Michael Chen', role: 'Senator', netWorth: '$780,000', contribution: 88, warnings: 0 },
            ].map((member, idx) => (
              <div key={idx} className="bg-slate-700 p-4 rounded-lg hover:bg-slate-650 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      member.role === 'Founder' ? 'bg-purple-600' :
                      member.role === 'Consul' ? 'bg-blue-600' : 'bg-green-600'
                    }`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{member.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          member.role === 'Founder' ? 'bg-purple-900 text-purple-200' :
                          member.role === 'Consul' ? 'bg-blue-900 text-blue-200' :
                          'bg-green-900 text-green-200'
                        }`}>
                          {member.role}
                        </span>
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        Net Worth: {member.netWorth} | Score: {member.contribution}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-500" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Member Profile</h3>
          
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              JF
            </div>
            <h4 className="text-white font-bold text-xl">John Founder</h4>
            <p className="text-purple-400">Founder</p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-300 text-sm mb-2">Financial Position</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Worth</span>
                  <span className="text-white font-semibold">$2,458,932</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assets</span>
                  <span className="text-white font-semibold">$3,124,567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoleVotingScreen = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <Vote className="text-purple-400" size={24} />
          <span className="text-white font-semibold">Role Hierarchy & Quadratic Voting</span>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500">
          Create Proposal
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">House Role Structure</h3>
        <div className="flex justify-center items-end gap-8 py-8">
          {[
            { role: 'Founder', power: 100, count: 1, color: 'from-purple-600 to-purple-800', height: 'h-64' },
            { role: 'Consul', power: 64, count: 1, color: 'from-blue-600 to-blue-800', height: 'h-56' },
            { role: 'Senator', power: 36, count: 2, color: 'from-green-600 to-green-800', height: 'h-48' },
            { role: 'Equites', power: 16, count: 12, color: 'from-orange-600 to-orange-800', height: 'h-40' },
          ].map((role) => (
            <div key={role.role} className="flex flex-col items-center">
              <div className={`w-32 ${role.height} bg-gradient-to-b ${role.color} rounded-t-lg flex flex-col items-center justify-center text-white p-4`}>
                <Shield className="mb-2" size={32} />
                <p className="font-bold text-lg">{role.role}</p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-white font-bold text-xl">{role.power}%</p>
                <p className="text-slate-400 text-sm">Voting Power</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active Proposals</h3>
          
          <div className="space-y-4">
            {[
              { id: 'PROP-001', title: 'Increase Treasury Allocation', votes: 18, required: 16, status: 'passing' },
              { id: 'PROP-002', title: 'New Member Addition', votes: 12, required: 16, status: 'active' },
            ].map((proposal) => (
              <div key={proposal.id} className="bg-slate-700 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-white font-semibold">{proposal.id}</span>
                    <p className="text-slate-300 text-sm">{proposal.title}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white">{proposal.votes}/{proposal.required} votes</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${proposal.status === 'passing' ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${(proposal.votes / proposal.required) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-900 text-green-200 rounded text-xs">
                    Vote For
                  </button>
                  <button className="px-3 py-1 bg-red-900 text-red-200 rounded text-xs">
                    Vote Against
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quadratic Voting System</h3>
          
          <div className="bg-slate-700 p-4 rounded-lg mb-4">
            <p className="text-slate-300 text-sm mb-3">Your Voting Power</p>
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-purple-400 mb-2">100</div>
              <p className="text-slate-400">Total Vote Credits</p>
            </div>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-white font-semibold mb-2 text-sm">How It Works</p>
            <div className="space-y-2 text-xs text-slate-300">
              <p>• Cost increases quadratically</p>
              <p>• Prevents vote buying</p>
              <p>• Credits refresh quarterly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HouseLifecycleScreen = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="text-purple-400" size={24} />
          <span className="text-white font-semibold">House Lifecycle Management</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { title: 'Rebirth', icon: RefreshCw, color: 'from-green-600 to-green-700', desc: 'Restore archived House' },
          { title: 'Acquisition', icon: TrendingUp, color: 'from-blue-600 to-blue-700', desc: 'Acquire another House' },
          { title: 'Merger', icon: Users, color: 'from-purple-600 to-purple-700', desc: 'Merge with another House' },
          { title: 'Disbandment', icon: X, color: 'from-red-600 to-red-700', desc: 'Disband current House' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.title} className={`bg-gradient-to-br ${action.color} p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform`}>
              <Icon className="text-white mb-3" size={32} />
              <h4 className="text-white font-bold text-lg mb-2">{action.title}</h4>
              <p className="text-white/80 text-sm">{action.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">House Merger Process</h3>
          
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-white font-semibold mb-3 text-sm">Select Target House</p>
              <select className="w-full px-4 py-2 bg-slate-600 text-white rounded border border-slate-500">
                <option>-- Choose a House --</option>
                <option>House of Innovation (15 members)</option>
                <option>Legacy House (8 members)</option>
              </select>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-white font-semibold mb-3 text-sm">Merger Preview</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 mb-2">Current House</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Members:</span>
                      <span className="text-white">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Net Worth:</span>
                      <span className="text-white">$2.4M</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 mb-2">Target House</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Members:</span>
                      <span className="text-white">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Net Worth:</span>
                      <span className="text-white">$1.8M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-purple-600 text-white rounded hover:bg-purple-500 font-semibold">
              Propose Merger
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Disbandment & Archive</h3>
          
          <div className="space-y-4">
            <div className="bg-red-900/30 border border-red-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="text-red-400" size={20} />
                <p className="text-red-300 font-semibold">Critical Action</p>
              </div>
              <p className="text-red-200 text-sm mb-4">
                Disbanding a House will archive all data and make it inaccessible.
              </p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-white font-semibold mb-3 text-sm">Disbandment Checklist</p>
              <div className="space-y-2 text-sm">
                {[
                  { item: 'All transactions settled', completed: true },
                  { item: 'All members notified', completed: true },
                  { item: 'Assets liquidated', completed: false },
                ].map((check, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {check.completed ? (
                      <Check className="text-green-500" size={16} />
                    ) : (
                      <X className="text-red-500" size={16} />
                    )}
                    <span className={check.completed ? 'text-slate-300' : 'text-slate-400'}>
                      {check.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-slate-600 text-slate-400 rounded cursor-not-allowed" disabled>
              Disband House (Disabled)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Lifecycle Timeline</h3>
        <div className="space-y-6">
          {[
            { event: 'House Founded', date: 'Jan 15, 2024', icon: Home, color: 'bg-purple-600' },
            { event: 'First 10 Members Joined', date: 'Feb 3, 2024', icon: Users, color: 'bg-blue-600' },
            { event: 'Crossed $1M Net Worth', date: 'May 22, 2024', icon: TrendingUp, color: 'bg-green-600' },
            { event: 'Current State', date: 'Nov 16, 2024', icon: Calendar, color: 'bg-purple-600' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="flex-1 bg-slate-700 p-4 rounded-lg">
                  <p className="text-white font-semibold">{item.event}</p>
                  <p className="text-slate-400 text-sm">{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GCDWireframes;