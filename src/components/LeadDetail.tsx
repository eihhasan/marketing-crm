import React, { useState } from 'react';
import { useCRMStore } from '../store/crmStore';
import { X, Mail, Phone, Calendar, Clock, Tag, User as UserIcon, Send, Plus, Sparkles, Brain, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { Activity } from '../types';

export default function LeadDetail() {
  const { leads, selectedLeadId, setSelectedLeadId, users, addActivity, activities, currentUser } = useCRMStore();
  const [note, setNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const lead = leads.find((l) => l.id === selectedLeadId);
  
  if (!selectedLeadId || !lead) return null;

  const leadActivities = activities.filter(a => a.leadId === lead.id).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleAddNote = () => {
    if (!note.trim() || !currentUser) return;
    
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      leadId: lead.id,
      type: 'Note',
      description: note,
      timestamp: new Date().toISOString(),
      userId: currentUser.id
    };
    
    addActivity(newActivity);
    setNote('');
  };

  const generateAiContent = () => {
    setIsGenerating(true);
    setTimeout(() => {
        const newActivity: Activity = {
            id: Math.random().toString(36).substr(2, 9),
            leadId: lead.id,
            type: 'AI Insight',
            description: `AI generated personalized email draft for ${lead.name} focusing on ${lead.tags[0] || 'their business needs'}.`,
            timestamp: new Date().toISOString(),
            userId: 'system'
        };
        addActivity(newActivity);
        setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm transition-opacity" 
        onClick={() => setSelectedLeadId(null)}
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-zinc-100">
        {/* Header */}
        <div className="p-8 border-b border-zinc-100 flex items-start justify-between bg-zinc-50/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">{lead.name}</h2>
              <span className={clsx(
                "px-2.5 py-1 rounded-full text-xs font-medium border",
                lead.stage === 'Closed Won' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                lead.stage === 'Closed Lost' ? "bg-rose-50 text-rose-700 border-rose-200" :
                "bg-zinc-100 text-zinc-700 border-zinc-200"
              )}>
                {lead.stage}
              </span>
            </div>
            <p className="text-zinc-500 text-sm">{lead.company}</p>
          </div>
          <button 
            onClick={() => setSelectedLeadId(null)}
            className="p-2 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* AI Insights Section */}
          <div className="p-8 bg-gradient-to-b from-indigo-50/50 to-white border-b border-zinc-100">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider">AI Insights</h3>
            </div>
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-zinc-500">Conversion Probability</span>
                        <span className="text-sm font-bold text-emerald-600">{lead.aiScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{width: `${lead.aiScore}%`}}></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                    <p className="text-xs font-medium text-zinc-500 mb-1">Next Best Action</p>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-zinc-900">{lead.nextBestAction}</p>
                        <button 
                            onClick={generateAiContent}
                            disabled={isGenerating}
                            className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
                        >
                            {isGenerating ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap className="w-3 h-3" />}
                            Execute
                        </button>
                    </div>
                </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-8 grid grid-cols-3 gap-4 border-b border-zinc-100">
            <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50 transition-all group">
              <div className="p-2 bg-zinc-100 rounded-full group-hover:bg-zinc-900 text-zinc-600 group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-zinc-600 group-hover:text-zinc-900">Email</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50 transition-all group">
              <div className="p-2 bg-zinc-100 rounded-full group-hover:bg-zinc-900 text-zinc-600 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-zinc-600 group-hover:text-zinc-900">Call</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50 transition-all group">
              <div className="p-2 bg-zinc-100 rounded-full group-hover:bg-zinc-900 text-zinc-600 group-hover:text-white transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-zinc-600 group-hover:text-zinc-900">Meeting</span>
            </button>
          </div>

          {/* Details */}
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Lead Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-900">{lead.email}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-900">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <UserIcon className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-900">Owner: {users.find(u => u.id === lead.ownerId)?.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Tag className="w-4 h-4 text-zinc-400" />
                  <div className="flex gap-2">
                    {lead.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Value Prediction</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <p className="text-xs text-zinc-500 mb-2">Predicted LTV</p>
                  <p className="text-2xl font-bold text-zinc-900 tracking-tight">${lead.predictedLTV?.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <p className="text-xs text-zinc-500 mb-2">Current Deal Value</p>
                  <p className="text-2xl font-bold text-zinc-900 tracking-tight">${lead.dealValue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Timeline / Activity */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Activity Timeline</h3>
              
              {/* Add Note Input */}
              <div className="mb-6 flex gap-3">
                <input 
                  type="text" 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-300 transition-all bg-zinc-50 focus:bg-white"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                />
                <button 
                  onClick={handleAddNote}
                  className="p-2.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="relative pl-4 border-l border-zinc-200 space-y-8">
                {leadActivities.map((activity) => (
                  <div key={activity.id} className="relative">
                    <div className={clsx(
                        "absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-white ring-4 ring-zinc-50",
                        activity.type === 'AI Insight' ? "bg-indigo-500" : "bg-zinc-300"
                    )}></div>
                    <div className="flex items-start justify-between">
                      <p className={clsx("text-sm font-semibold", activity.type === 'AI Insight' ? "text-indigo-600" : "text-zinc-900")}>{activity.type}</p>
                      <span className="text-xs text-zinc-400">{format(new Date(activity.timestamp), 'MMM d, h:mm a')}</span>
                    </div>
                    <p className="text-sm text-zinc-600 mt-1 leading-relaxed">{activity.description}</p>
                    <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
                      {activity.type === 'AI Insight' ? <Sparkles className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                      {activity.userId === 'system' ? 'Nexus AI' : users.find(u => u.id === activity.userId)?.name}
                    </p>
                  </div>
                ))}
                
                {/* Initial Creation Event (Mock) */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-zinc-900 ring-4 ring-zinc-50"></div>
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-semibold text-zinc-900">Lead Created</p>
                    <span className="text-xs text-zinc-400">{format(new Date(lead.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                  <p className="text-sm text-zinc-600 mt-1">Lead captured via {lead.source}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
