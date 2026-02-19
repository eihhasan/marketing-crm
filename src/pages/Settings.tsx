import React from 'react';

export default function Settings() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Settings</h1>
      <p className="text-zinc-500 mb-8">Manage your account settings and preferences.</p>
      
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm divide-y divide-zinc-50">
        <div className="p-8">
          <h2 className="text-lg font-bold text-zinc-900 mb-6">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Company Name</label>
              <input type="text" className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 transition-all" defaultValue="Acme Corp" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Timezone</label>
              <select className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 transition-all">
                <option>Pacific Time (US & Canada)</option>
                <option>Eastern Time (US & Canada)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-lg font-bold text-zinc-900 mb-6">Automation Rules</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-900">Auto-assign leads</p>
                <p className="text-sm text-zinc-500 mt-0.5">Automatically assign new leads to sales reps based on round-robin.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-900">Stale lead alerts</p>
                <p className="text-sm text-zinc-500 mt-0.5">Notify owner if a lead hasn't been contacted in 7 days.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
