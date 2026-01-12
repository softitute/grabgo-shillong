
import React from 'react';
import { User } from '../types';
import { LayoutDashboard, History, ShieldCheck, LogOut, Package } from 'lucide-react';

interface NavbarProps {
  user: User;
  currentView: string;
  onNavigate: (view: any) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentView, onNavigate, onLogout }) => {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
            <div className="bg-[#f2ca52] p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
               <Package className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">GrabGo</span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-4">
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`p-3 rounded-2xl transition-all flex items-center space-x-2 ${currentView === 'dashboard' ? 'bg-[#f2ca52] text-black shadow-lg font-black' : 'text-gray-500 hover:bg-[#f2ca52] hover:text-black font-bold'}`}
              title="Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden sm:inline text-sm tracking-tight">Home</span>
            </button>

            <button 
              onClick={() => onNavigate('history')}
              className={`p-3 rounded-2xl transition-all flex items-center space-x-2 ${currentView === 'history' ? 'bg-[#f2ca52] text-black shadow-lg font-black' : 'text-gray-500 hover:bg-[#f2ca52] hover:text-black font-bold'}`}
              title="History"
            >
              <History className="w-5 h-5" />
              <span className="hidden sm:inline text-sm tracking-tight">Orders</span>
            </button>

            {user.isAdmin && (
              <button 
                onClick={() => onNavigate('admin')}
                className={`p-3 rounded-2xl transition-all flex items-center space-x-2 ${currentView === 'admin' ? 'bg-black text-[#f2ca52] shadow-lg font-black' : 'text-gray-500 hover:bg-[#f2ca52] hover:text-black font-bold'}`}
                title="Admin Panel"
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="hidden sm:inline text-sm tracking-tight">Admin</span>
              </button>
            )}

            <button 
              onClick={onLogout}
              className="p-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all active:scale-90"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
