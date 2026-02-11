
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const data = [
  { name: 'Jan', desktop: 4000, mobile: 2400, tablet: 2400 },
  { name: 'Feb', desktop: 3000, mobile: 1398, tablet: 2210 },
  { name: 'Mar', desktop: 2000, mobile: 9800, tablet: 2290 },
  { name: 'Apr', desktop: 2780, mobile: 3908, tablet: 2000 },
  { name: 'May', desktop: 1890, mobile: 4800, tablet: 2181 },
  { name: 'Jun', desktop: 2390, mobile: 3800, tablet: 2500 },
  { name: 'Jul', desktop: 3490, mobile: 4300, tablet: 2100 },
];

const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b'];

const pieData = [
  { name: 'Search', value: 400 },
  { name: 'Direct', value: 300 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 200 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Advanced Analytics</h1>
          <p className="text-slate-500">Deep dive into your traffic and conversion metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Calendar size={18} />
            Oct 2023 - Dec 2023
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Traffic by Platform</h2>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="desktop" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mobile" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tablet" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Traffic Sources</h2>
          <div className="h-96 w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full grid grid-cols-2 gap-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                  <span className="text-xs font-semibold text-slate-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Top Performing Pages</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Page Path</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Visitors</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Bounce Rate</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { path: '/dashboard/home', visitors: '12,402', bounce: '24.2%', trend: '+12%' },
                { path: '/features/ai-agent', visitors: '8,230', bounce: '18.5%', trend: '+45%' },
                { path: '/pricing', visitors: '4,510', bounce: '42.1%', trend: '-2%' },
                { path: '/docs/getting-started', visitors: '3,892', bounce: '12.0%', trend: '+8%' },
                { path: '/about-nexus', visitors: '1,202', bounce: '35.4%', trend: '+5%' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-sm font-medium text-indigo-600">{row.path}</td>
                  <td className="py-4 text-sm text-slate-700 font-bold">{row.visitors}</td>
                  <td className="py-4 text-sm text-slate-500">{row.bounce}</td>
                  <td className={`py-4 text-sm font-bold ${row.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {row.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
