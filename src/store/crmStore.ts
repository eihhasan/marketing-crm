import { create } from 'zustand';
import { Lead, User, Activity, DealStage, LeadStatus, Campaign } from '../types';
import { format, subDays } from 'date-fns';

interface CRMState {
  leads: Lead[];
  users: User[];
  activities: Activity[];
  campaigns: Campaign[];
  currentUser: User | null;
  selectedLeadId: string | null;
  isAddLeadModalOpen: boolean;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  moveLeadStage: (id: string, newStage: DealStage) => void;
  addActivity: (activity: Activity) => void;
  setCurrentUser: (user: User) => void;
  setSelectedLeadId: (id: string | null) => void;
  setAddLeadModalOpen: (isOpen: boolean) => void;
}

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Admin', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Sarah Sales', role: 'Sales Manager', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', name: 'Mike Marketing', role: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?u=u3' },
  { id: 'u4', name: 'John Exec', role: 'Sales Executive', avatar: 'https://i.pravatar.cc/150?u=u4' },
];

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: 'c1', name: 'Q1 AI Growth', platform: 'Google', status: 'Active', budget: 5000, spent: 2340, clicks: 1200, conversions: 85, aiOptimizationScore: 92, roi: 3.5 },
  { id: 'c2', name: 'Retargeting Alpha', platform: 'Facebook', status: 'Active', budget: 3000, spent: 1800, clicks: 950, conversions: 45, aiOptimizationScore: 88, roi: 2.1 },
  { id: 'c3', name: 'LinkedIn B2B', platform: 'LinkedIn', status: 'Paused', budget: 4000, spent: 1200, clicks: 300, conversions: 12, aiOptimizationScore: 65, roi: 0.8 },
  { id: 'c4', name: 'Insta Lifestyle', platform: 'Instagram', status: 'Active', budget: 2500, spent: 2100, clicks: 2400, conversions: 110, aiOptimizationScore: 95, roi: 4.2 },
];

const generateMockLeads = (): Lead[] => {
  const leads: Lead[] = [];
  const stages: DealStage[] = ['New Lead', 'AI Nurturing', 'Demo Scheduled', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'];
  const sources = ['Facebook Ads', 'Google Ads', 'Instagram', 'Website', 'Referral', 'Manual', 'LinkedIn', 'TikTok'];
  const actions = ['Send AI Email', 'Schedule Demo', 'Call Lead', 'Send Case Study', 'Connect on LinkedIn'];
  
  for (let i = 0; i < 50; i++) {
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const score = Math.floor(Math.random() * 100);
    
    leads.push({
      id: `l${i}`,
      name: `Lead ${i + 1}`,
      company: `Company ${i + 1}`,
      email: `lead${i + 1}@example.com`,
      phone: `+1 555 010 ${i.toString().padStart(3, '0')}`,
      source: source as any,
      score: score,
      aiScore: Math.floor(score * (0.8 + Math.random() * 0.4)), // Correlated with score but varied
      predictedLTV: Math.floor(Math.random() * 50000) + 5000,
      nextBestAction: actions[Math.floor(Math.random() * actions.length)],
      ownerId: MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)].id,
      createdAt: subDays(new Date(), Math.floor(Math.random() * 30)).toISOString(),
      lastInteraction: subDays(new Date(), Math.floor(Math.random() * 5)).toISOString(),
      status: 'Opportunity', // Simplified for mock
      dealValue: Math.floor(Math.random() * 10000) + 1000,
      stage: stage,
      priority: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
      tags: Math.random() > 0.5 ? ['High Intent'] : ['Nurture'],
      nextFollowUp: Math.random() > 0.5 ? format(new Date(), 'yyyy-MM-dd') : undefined,
    });
  }
  return leads;
};

export const useCRMStore = create<CRMState>((set) => ({
  leads: generateMockLeads(),
  users: MOCK_USERS,
  activities: [],
  campaigns: MOCK_CAMPAIGNS,
  currentUser: MOCK_USERS[0],
  selectedLeadId: null,
  isAddLeadModalOpen: false,
  addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
  updateLead: (id, updates) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),
  moveLeadStage: (id, newStage) =>
    set((state) => {
      const lead = state.leads.find((l) => l.id === id);
      if (!lead || lead.stage === newStage) return state;

      const newActivity: Activity = {
        id: Math.random().toString(36).substr(2, 9),
        leadId: id,
        type: 'Status Change',
        description: `Stage changed from ${lead.stage} to ${newStage}`,
        timestamp: new Date().toISOString(),
        userId: state.currentUser?.id || 'system',
      };

      return {
        leads: state.leads.map((l) =>
          l.id === id
            ? {
                ...l,
                stage: newStage,
                lastInteraction: new Date().toISOString(),
              }
            : l
        ),
        activities: [newActivity, ...state.activities],
      };
    }),
  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedLeadId: (id) => set({ selectedLeadId: id }),
  setAddLeadModalOpen: (isOpen) => set({ isAddLeadModalOpen: isOpen }),
}));
