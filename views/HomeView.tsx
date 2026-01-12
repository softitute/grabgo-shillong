
import React from 'react';
import { User } from '../types';
import { ADMIN_EMAIL } from '../constants';
import { Package } from 'lucide-react';

interface HomeViewProps {
  onLogin: (user: User) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onLogin }) => {
  const handleGoogleSignIn = () => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: "John Doe",
      email: "john@example.com",
      photo: "https://picsum.photos/seed/user/100/100",
      isAdmin: false
    };
    onLogin(mockUser);
  };

  const handleAdminSignIn = () => {
    const mockAdmin: User = {
      id: "admin-123",
      name: "GrabGo Admin",
      email: ADMIN_EMAIL,
      photo: "https://picsum.photos/seed/admin/100/100",
      isAdmin: true
    };
    onLogin(mockAdmin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="mb-10 w-32 h-32 bg-[#f2ca52] rounded-3xl shadow-xl flex items-center justify-center animate-fade-in-up">
        <Package className="w-16 h-16 text-black" />
      </div>
      
      <h1 className="text-6xl font-black text-gray-900 mb-2 tracking-tighter">GrabGo</h1>
      <p className="text-xl font-bold text-gray-500 mb-12 max-w-sm leading-relaxed uppercase tracking-tight">
        Quick Pickup & Dropping Service
      </p>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button 
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center space-x-3 bg-[#f2ca52] text-black py-4 px-6 rounded-2xl shadow-lg border-2 border-transparent hover:bg-black hover:text-[#f2ca52] transition-all duration-300 active:scale-95 group font-bold"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 group-hover:brightness-150 transition-all" />
          <span>Sign in with Google</span>
        </button>

        <p className="text-[10px] text-gray-400 mt-6 leading-relaxed font-black uppercase tracking-[0.2em]">
          Available across Shillong
        </p>

        <button 
          onClick={handleAdminSignIn}
          className="text-[10px] text-gray-300 hover:text-gray-500 transition-colors mt-12 uppercase tracking-widest font-bold"
        >
          Administrator Access
        </button>
      </div>
    </div>
  );
};

export default HomeView;
