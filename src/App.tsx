
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { View, UserProfile } from './types';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AIChat from './components/AIChat';
import Analytics from './components/Analytics';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex Rivera',
    email: 'alex.rivera@nexus.io',
    role: 'Senior Product Designer',
    avatar: 'https://picsum.photos/id/64/200/200',
    bio: 'Passionate about crafting seamless user experiences and leveraging AI to solve complex problems.',
    location: 'San Francisco, CA'
  });

  const navItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.ANALYTICS, label: 'Analytics', icon: BarChart3 },
    { id: View.AI_ASSISTANT, label: 'AI Assistant', icon: MessageSquare },
    { id: View.PROFILE, label: 'My Profile', icon: User },
    { id: View.SETTINGS, label: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard user={user} />;
      case View.PROFILE:
        return <Profile user={user} setUser={setUser} />;
      case View.AI_ASSISTANT:
        return <AIChat />;
      case View.ANALYTICS:
        return <Analytics />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out bg-white border-r border-slate-200 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            {isSidebarOpen && <span className="font-bold text-slate-800 text-lg">Nexus</span>}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-100 rounded-md lg:block hidden"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                currentView === item.id 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
              {currentView === item.id && isSidebarOpen && (
                <div className="ml-auto">
                  <ChevronRight size={14} />
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 p-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-indigo-600 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">3</span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
                <p className="text-xs text-slate-500 mt-1">{user.role}</p>
              </div>
              <img src={user.avatar} alt="User Avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100" />
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
