
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  // Added missing imports
  BarChart3,
  Settings
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { UserProfile, StatItem, Activity } from '../types';
import { getDashboardInsights } from '../services/geminiService';

const chartData = [
  { name: 'Mon', revenue: 4000, users: 2400 },
  { name: 'Tue', revenue: 3000, users: 1398 },
  { name: 'Wed', revenue: 2000, users: 9800 },
  { name: 'Thu', revenue: 2780, users: 3908 },
  { name: 'Fri', revenue: 1890, users: 4800 },
  { name: 'Sat', revenue: 2390, users: 3800 },
  { name: 'Sun', revenue: 3490, users: 4300 },
];

const activities: Activity[] = [
  { id: '1', type: 'system', description: 'New version of Nexus v2.4 deployed', timestamp: '2 mins ago' },
  { id: '2', type: 'user', description: 'User Jane Doe invited to the team', timestamp: '45 mins ago' },
  { id: '3', type: 'alert', description: 'Revenue exceeded monthly targets!', timestamp: '2 hours ago' },
  { id: '4', type: 'user', description: 'New feedback received for dashboard UI', timestamp: '5 hours ago' },
];

const StatCard: React.FC<{ stat: StatItem; icon: React.ReactNode; color: string }> = ({ stat, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {stat.change}% 
        {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      </div>
    </div>
    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
    <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
  </div>
);

const Dashboard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [aiInsights, setAiInsights] = useState<string>('Generating AI insights...');

  useEffect(() => {
    const fetchInsights = async () => {
      const summary = "Revenue: $124.5k, Active Users: 12.8k, Conversion Rate: 3.2%. Trends are positive for revenue but flat for user growth.";
      const insights = await getDashboardInsights(summary);
      setAiInsights(insights || "No insights available.");
    };
    fetchInsights();
  }, []);

  const stats: StatItem[] = [
    { label: 'Total Revenue', value: '$128,430', change: 12.5, trend: 'up' },
    { label: 'Active Users', value: '14,212', change: 8.2, trend: 'up' },
    { label: 'Conversion Rate', value: '3.42%', change: 2.1, trend: 'down' },
    { label: 'System Uptime', value: '99.98%', change: 0.1, trend: 'up' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            Create New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard stat={stats[0]} icon={<DollarSign className="text-indigo-600" size={24} />} color="bg-indigo-50" />
        <StatCard stat={stats[1]} icon={<Users className="text-blue-600" size={24} />} color="bg-blue-50" />
        <StatCard stat={stats[2]} icon={<ShoppingBag className="text-orange-600" size={24} />} color="bg-orange-50" />
        <StatCard stat={stats[3]} icon={<Zap className="text-emerald-600" size={24} />} color="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Growth Overview</h2>
              <p className="text-xs text-slate-500">Revenue vs. User Acquisition</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-medium text-slate-600 rounded-md px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-500/30 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} className="text-indigo-200" />
            </div>
            <h2 className="font-bold text-lg">AI Smart Insights</h2>
          </div>
          <div className="space-y-4 flex-1">
            <div className="bg-indigo-800/50 p-4 rounded-xl border border-indigo-700/50 backdrop-blur-sm">
              <div className="prose prose-sm prose-invert max-w-none">
                {aiInsights.split('\n').map((line, i) => (
                  <p key={i} className="mb-2 text-indigo-100 last:mb-0 leading-relaxed text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="p-4 bg-indigo-500/20 rounded-xl border border-indigo-400/20">
              <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-2">Recommendation</p>
              <p className="text-sm text-white font-medium">Focus marketing efforts on the Wednesday user spike to sustain growth momentum.</p>
            </div>
          </div>
          <button className="mt-6 w-full py-2 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors text-sm">
            View Deep Analysis
          </button>
        </div>
      </div>

      {/* Bottom Section: Activities & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'system' ? 'bg-blue-50 text-blue-600' : 
                  activity.type === 'alert' ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'
                }`}>
                  {activity.type === 'system' ? <Zap size={18} /> : 
                   activity.type === 'alert' ? <TrendingUp size={18} /> : <Users size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800 font-medium">{activity.description}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <button className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-2xl transition-all group border border-transparent hover:border-indigo-100">
              <Users className="text-slate-400 group-hover:text-indigo-600 mb-2" size={24} />
              <span className="text-sm font-semibold">Invite Team</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-2xl transition-all group border border-transparent hover:border-indigo-100">
              <ShoppingBag className="text-slate-400 group-hover:text-indigo-600 mb-2" size={24} />
              <span className="text-sm font-semibold">New Sale</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-2xl transition-all group border border-transparent hover:border-indigo-100">
              <BarChart3 className="text-slate-400 group-hover:text-indigo-600 mb-2" size={24} />
              <span className="text-sm font-semibold">Report Gen</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-2xl transition-all group border border-transparent hover:border-indigo-100">
              <Settings className="text-slate-400 group-hover:text-indigo-600 mb-2" size={24} />
              <span className="text-sm font-semibold">Configure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
