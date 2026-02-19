import React, { useState } from 'react';
import { useCRMStore } from '../store/crmStore';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { clsx } from 'clsx';

export default function Reports() {
  const { leads, users, campaigns } = useCRMStore();
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Mock Data for Detailed Reports
  const salesPerformanceData = [
    { name: 'Week 1', revenue: 12000, target: 10000 },
    { name: 'Week 2', revenue: 15000, target: 12000 },
    { name: 'Week 3', revenue: 8000, target: 12000 },
    { name: 'Week 4', revenue: 18000, target: 15000 },
  ];

  const conversionBySourceData = [
    { name: 'Google Ads', leads: 400, won: 45 },
    { name: 'Facebook', leads: 300, won: 25 },
    { name: 'LinkedIn', leads: 150, won: 18 },
    { name: 'Email', leads: 200, won: 30 },
    { name: 'Organic', leads: 250, won: 40 },
  ];

  const teamPerformanceData = users.filter(u => u.role.includes('Sales')).map(user => ({
    name: user.name,
    leads: Math.floor(Math.random() * 50) + 20,
    deals: Math.floor(Math.random() * 10) + 2,
    revenue: Math.floor(Math.random() * 50000) + 10000,
    conversion: Math.floor(Math.random() * 20) + 5,
  }));

  const COLORS = ['#18181B', '#52525B', '#71717A', '#A1A1AA', '#E4E4E7'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Analytics & Reports</h1>
          <p className="text-zinc-500 mt-1">Deep dive into sales performance and marketing ROI.</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {dateRange}
            </button>
            <button className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-zinc-900">$124,500</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12.5%</span>
                <span className="text-xs text-zinc-400">vs last period</span>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Avg. Deal Size</p>
            <p className="text-3xl font-bold text-zinc-900">$4,200</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+5.2%</span>
                <span className="text-xs text-zinc-400">vs last period</span>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Sales Cycle</p>
            <p className="text-3xl font-bold text-zinc-900">18 Days</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">-2 Days</span>
                <span className="text-xs text-zinc-400">vs last period</span>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Win Rate</p>
            <p className="text-3xl font-bold text-zinc-900">24.8%</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">-1.2%</span>
                <span className="text-xs text-zinc-400">vs last period</span>
            </div>
        </div>
      </div>

      {/* Sales Performance Chart */}
      <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-zinc-900">Sales Performance vs Target</h3>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-900"></span>
                    <span className="text-xs text-zinc-500">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-300"></span>
                    <span className="text-xs text-zinc-500">Target</span>
                </div>
            </div>
        </div>
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesPerformanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717A', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717A', fontSize: 12}} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                        cursor={{fill: '#F4F4F5', radius: 4}}
                        contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E4E4E7', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="revenue" fill="#18181B" radius={[4, 4, 0, 0]} barSize={32} />
                    <Bar dataKey="target" fill="#E4E4E7" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion by Source */}
        <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-8">Lead Conversion by Source</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={conversionBySourceData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F4F4F5" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#71717A', fontSize: 12, fontWeight: 500}} width={100} />
                        <Tooltip 
                            cursor={{fill: '#F4F4F5', radius: 4}}
                            contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E4E4E7', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="leads" name="Total Leads" fill="#E4E4E7" radius={[0, 4, 4, 0]} barSize={12} />
                        <Bar dataKey="won" name="Won Deals" fill="#18181B" radius={[0, 4, 4, 0]} barSize={12} />
                        <Legend />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Team Performance Table */}
        <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Team Leaderboard</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100">
                            <th className="pb-3 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Rep</th>
                            <th className="pb-3 font-semibold text-zinc-500 text-xs uppercase tracking-wider text-right">Revenue</th>
                            <th className="pb-3 font-semibold text-zinc-500 text-xs uppercase tracking-wider text-right">Deals</th>
                            <th className="pb-3 font-semibold text-zinc-500 text-xs uppercase tracking-wider text-right">Conv. %</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {teamPerformanceData.map((member, index) => (
                            <tr key={index} className="group">
                                <td className="py-3 font-medium text-zinc-900">{member.name}</td>
                                <td className="py-3 text-right text-zinc-600">${member.revenue.toLocaleString()}</td>
                                <td className="py-3 text-right text-zinc-600">{member.deals}</td>
                                <td className="py-3 text-right">
                                    <span className={clsx(
                                        "px-2 py-0.5 rounded-full text-xs font-medium",
                                        member.conversion > 15 ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                                    )}>
                                        {member.conversion}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}
