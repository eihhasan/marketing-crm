import React, { useState } from 'react';
import { useCRMStore } from '../store/crmStore';
import { X } from 'lucide-react';
import { LeadSource, DealStage, Priority, Lead } from '../types';

export default function AddLeadModal() {
  const { isAddLeadModalOpen, setAddLeadModalOpen, addLead, currentUser } = useCRMStore();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'Website' as LeadSource,
    dealValue: 0,
    priority: 'Medium' as Priority,
  });

  if (!isAddLeadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      stage: 'New Lead',
      status: 'Lead',
      score: 10,
      ownerId: currentUser.id,
      createdAt: new Date().toISOString(),
      lastInteraction: new Date().toISOString(),
      tags: [],
    };

    addLead(newLead);
    setAddLeadModalOpen(false);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      source: 'Website',
      dealValue: 0,
      priority: 'Medium',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setAddLeadModalOpen(false)}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 border border-zinc-100">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Add New Lead</h2>
          <button 
            onClick={() => setAddLeadModalOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 transition-colors p-1 hover:bg-zinc-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Name</label>
              <input
                required
                type="text"
                className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 bg-zinc-50 focus:bg-white transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Company</label>
              <input
                required
                type="text"
                className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 bg-zinc-50 focus:bg-white transition-all"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Email</label>
              <input
                required
                type="email"
                className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 bg-zinc-50 focus:bg-white transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Phone</label>
              <input
                type="tel"
                className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 bg-zinc-50 focus:bg-white transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Source</label>
              <select
                className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 bg-zinc-50 focus:bg-white transition-all"
                value={formData.source}
                onChange={e => setFormData({...formData, source: e.target.value as LeadSource})}
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Instagram">Instagram</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Priority</label>
              <select
                className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 bg-zinc-50 focus:bg-white transition-all"
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value as Priority})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Estimated Deal Value ($)</label>
            <input
              type="number"
              min="0"
              className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 bg-zinc-50 focus:bg-white transition-all"
              value={formData.dealValue}
              onChange={e => setFormData({...formData, dealValue: parseInt(e.target.value) || 0})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 mt-6">
            <button
              type="button"
              onClick={() => setAddLeadModalOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-xl border border-zinc-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl shadow-lg shadow-zinc-900/20 transition-all"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
