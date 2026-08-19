import React from 'react';
import { Search, Bell, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 h-16 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search records, appointments..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-teal-100 text-teal-700 font-semibold flex items-center justify-center text-sm border border-teal-200">
            {user?.name?.charAt(0) || 'U'}
          </div>
          
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800 leading-none">{user?.name}</p>
            <p className="text-xs text-teal-600 capitalize font-medium mt-1">{user?.role}</p>
          </div>

          <button 
            onClick={logout} 
            title="Logout" 
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
