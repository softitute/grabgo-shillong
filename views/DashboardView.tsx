import React from 'react';
import { User } from '../types';
import { SERVICE_CATEGORIES, getServiceIcon } from '../constants';
import { ChevronRight, Package, MapPin } from 'lucide-react';

interface DashboardViewProps {
  user: User;
  onSelectService: (serviceId: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, onSelectService }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
            <div className="flex items-center space-x-2 mb-1">
              <MapPin size={14} className="text-[#f2ca52]" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Current Location: Shillong</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Kumno, {user.name.split(' ')[0]}!</h2>
            <p className="text-gray-500 mt-1 font-medium">What can we grab for you today?</p>
        </div>
        <div className="flex -space-x-2">
            <div className="w-12 h-12 rounded-2xl border-4 border-white bg-[#f2ca52] flex items-center justify-center shadow-md">
                <Package className="w-6 h-6 text-black" />
            </div>
            {user.photo && (
              <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-2xl border-4 border-white shadow-md object-cover" />
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_CATEGORIES.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className={`flex flex-col items-start p-8 ${service.bgColor} rounded-[2.5rem] border-2 border-transparent ${service.hoverBorder} hover:shadow-xl transition-all duration-300 text-left group relative overflow-hidden`}
          >
            <div className="p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform mb-6 relative z-10">
              {getServiceIcon(service.icon)}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight relative z-10">{service.name}</h3>
            <p className="text-gray-600 text-sm font-medium mb-6 leading-relaxed relative z-10">{service.description}</p>
            <div className="mt-auto flex items-center bg-white text-black font-bold text-xs group-hover:bg-black group-hover:text-[#f2ca52] transition-all duration-300 px-5 py-3 rounded-xl shadow-sm relative z-10">
              Book Delivery <ChevronRight className="w-4 h-4 ml-1" />
            </div>
            {/* Background decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
               {getServiceIcon(service.icon)}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-black rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative group">
        <div className="relative z-10">
          <div className="bg-[#f2ca52] text-black text-[9px] font-black uppercase px-3 py-1 rounded-full w-max mb-4">Membership</div>
          <h3 className="text-3xl font-black mb-3 tracking-tight">GrabGo Prime</h3>
          <p className="text-gray-400 max-w-sm font-medium leading-relaxed">Coming soon to Shillong! Get flat ₹80 delivery for all your monthly errands.</p>
        </div>
        <div className="mt-8 md:mt-0 relative z-10">
          <button className="bg-[#f2ca52] text-black px-8 py-4 rounded-2xl font-black hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg group-hover:scale-105">Notify Me</button>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 text-white transform group-hover:rotate-12 transition-transform duration-700">
           <Package size={240} />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;