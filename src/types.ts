export type Role = 'Admin' | 'Marketing Manager' | 'Sales Manager' | 'Sales Executive';

export type LeadSource = 'Facebook Ads' | 'Google Ads' | 'Instagram' | 'Website' | 'Referral' | 'Manual' | 'LinkedIn' | 'TikTok';

export type LeadStatus = 'Visitor' | 'Lead' | 'MQL' | 'SQL' | 'Opportunity' | 'Won' | 'Lost';

export type DealStage = 'New Lead' | 'AI Nurturing' | 'Demo Scheduled' | 'Proposal Sent' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export type Priority = 'Low' | 'Medium' | 'High';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar: string;
}

export interface Activity {
  id: string;
  leadId: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note' | 'Status Change' | 'AI Insight' | 'Campaign Interaction';
  description: string;
  timestamp: string;
  userId: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: LeadSource;
  campaign?: string;
  tags: string[];
  score: number; // 0-100
  aiScore: number; // 0-100 (AI predicted conversion probability)
  predictedLTV: number; // Predicted Lifetime Value
  nextBestAction: string; // AI recommended action
  ownerId: string;
  createdAt: string;
  lastInteraction: string;
  status: LeadStatus;
  dealValue: number;
  stage: DealStage;
  priority: Priority;
  nextFollowUp?: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'Google' | 'Facebook' | 'LinkedIn' | 'Email' | 'Instagram';
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  budget: number;
  spent: number;
  clicks: number;
  conversions: number;
  aiOptimizationScore: number; // 0-100
  roi: number;
}
