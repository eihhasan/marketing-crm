import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Kanban, Users, Settings, Bell, Search, FileCode, Command, Rocket, BarChart2 } from 'lucide-react';
import { useCRMStore } from '../store/crmStore';
import { clsx } from 'clsx';
import LeadDetail from './LeadDetail';
import AddLeadModal from './AddLeadModal';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { currentUser, users, setCurrentUser } = useCRMStore();

  const navItems = [
    { icon: LayoutDashboard, label: 'Marketing Hub', path: '/' },
    { icon: Users, label: 'Leads', path: '/leads' },
    { icon: Kanban, label: 'Pipeline', path: '/pipeline' },
    { icon: Rocket, label: 'AI Campaigns', path: '/campaigns' },
    { icon: BarChart2, label: 'Analytics', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans text-zinc-900">
      {/* Sidebar - Minimal Dark or High Contrast */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col fixed h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shadow-lg shadow-zinc-900/20">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-900">Nexus AI</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                )}
              >
                <item.icon className={clsx('w-4 h-4', isActive ? 'text-zinc-900' : 'text-zinc-400')} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-100">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer group">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full bg-zinc-200 ring-2 ring-white"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 truncate group-hover:text-black">{currentUser?.name}</p>
              <p className="text-xs text-zinc-500 truncate">
                <select 
                  className="bg-transparent border-none p-0 text-xs focus:ring-0 cursor-pointer hover:text-zinc-700"
                  value={currentUser?.id}
                  onChange={(e) => {
                    const user = users.find(u => u.id === e.target.value);
                    if (user) setCurrentUser(user);
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.role}</option>
                  ))}
                </select>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-w-0 overflow-hidden bg-[#F9FAFB]">
        {/* Header - Floating/Minimal */}
        <header className="h-16 flex items-center justify-between px-8 py-4 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
              <input
                type="text"
                placeholder="Search (Cmd+K)"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-transparent bg-white shadow-sm text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-200 transition-all hover:bg-white/80 hover:shadow-md"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <div className="p-1 rounded bg-zinc-100 border border-zinc-200">
                  <Command className="w-3 h-3 text-zinc-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-zinc-400 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      <LeadDetail />
      <AddLeadModal />
    </div>
  );
}
