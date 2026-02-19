import React, { useState } from 'react';
import { useCRMStore } from '../store/crmStore';
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

export default function Leads() {
  const { leads, setSelectedLeadId, setAddLeadModalOpen } = useCRMStore();
  const [filter, setFilter] = useState('');

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(filter.toLowerCase()) ||
    lead.company.toLowerCase().includes(filter.toLowerCase()) ||
    lead.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Leads</h1>
          <p className="text-zinc-500 mt-1">Manage and track your potential customers.</p>
        </div>
        <button 
          onClick={() => setAddLeadModalOpen(true)}
          className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-2 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-2">
        <div className="relative flex-1 max-w-md ml-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border-none bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all placeholder-zinc-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="h-6 w-px bg-zinc-200 mx-2"></div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50/50 border-b border-zinc-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">AI Score</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Next Action</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id} 
                onClick={() => setSelectedLeadId(lead.id)}
                className="hover:bg-zinc-50/80 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center font-bold text-xs border border-zinc-200">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900">{lead.name}</div>
                      <div className="text-zinc-500 text-xs">{lead.company}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "px-2.5 py-1 rounded-full text-xs font-medium border",
                    lead.stage === 'Closed Won' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                    lead.stage === 'Closed Lost' ? "bg-rose-50 text-rose-700 border-rose-100" :
                    "bg-zinc-100 text-zinc-700 border-zinc-200"
                  )}>
                    {lead.stage}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div 
                        className={clsx("h-full rounded-full", 
                          lead.aiScore > 70 ? "bg-emerald-500" : 
                          lead.aiScore > 40 ? "bg-amber-500" : "bg-rose-500"
                        )} 
                        style={{width: `${lead.aiScore}%`}}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-zinc-600">{lead.aiScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                    <span className="text-xs text-zinc-600 font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-100">
                        {lead.nextBestAction}
                    </span>
                </td>
                <td className="px-6 py-4 text-zinc-600">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-50 border border-zinc-100 text-xs">
                        {lead.source}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
