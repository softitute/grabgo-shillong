
import React, { useState } from 'react';
import { Order, OrderStatus, PaymentStatus } from '../types';
import { Search, Filter, RefreshCcw, CheckCircle, Truck, XCircle, DollarSign } from 'lucide-react';

interface AdminViewProps {
  orders: Order[];
  onUpdateOrder: (orderId: string, updates: Partial<Order>) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ orders, onUpdateOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === OrderStatus.PENDING).length,
    delivered: orders.filter(o => o.status === OrderStatus.DELIVERED).length,
    revenue: orders.reduce((acc, o) => o.paymentStatus === PaymentStatus.PAID ? acc + o.amount : acc, 0)
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h2>
        <div className="relative mt-4 md:mt-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 border-2 border-gray-100 rounded-2xl bg-white shadow-sm focus:border-[#f2ca52] outline-none w-full md:w-64 font-medium transition-all"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, color: 'text-black', bg: 'bg-white' },
          { label: 'Pending', value: stats.pending, color: 'text-black', bg: 'bg-[#f2ca52]' },
          { label: 'Completed', value: stats.delivered, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Revenue (₹)', value: stats.revenue, color: 'text-black', bg: 'bg-white' },
        ].map((s, idx) => (
          <div key={idx} className={`p-6 rounded-[2rem] ${s.bg} border-2 border-gray-50 shadow-sm`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-8 py-5">Order ID / User</th>
                <th className="px-6 py-5">Service</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Payment</th>
                <th className="px-8 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-black text-gray-900">{order.id}</div>
                    <div className="text-gray-400 text-xs font-medium">{order.userName}</div>
                  </td>
                  <td className="px-6 py-5 font-bold text-gray-700">{order.serviceType}</td>
                  <td className="px-6 py-5 font-black text-gray-900">₹{order.amount}</td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      order.status === OrderStatus.PENDING ? 'bg-[#f2ca52] text-black' :
                      order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-700' :
                      order.status === OrderStatus.IN_PROGRESS ? 'bg-black text-white' : 'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => onUpdateOrder(order.id, { paymentStatus: order.paymentStatus === PaymentStatus.PAID ? PaymentStatus.UNPAID : PaymentStatus.PAID })}
                      className={`flex items-center space-x-1 px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all active:scale-95 ${
                        order.paymentStatus === PaymentStatus.PAID ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      <DollarSign size={10} />
                      <span>{order.paymentStatus}</span>
                    </button>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center space-x-1">
                      {order.status !== OrderStatus.DELIVERED && (
                        <>
                          <button 
                            onClick={() => onUpdateOrder(order.id, { status: OrderStatus.IN_PROGRESS })}
                            className="p-2 text-black hover:bg-[#f2ca52] rounded-xl transition-colors" title="Start Delivery"
                          >
                            <Truck size={20} />
                          </button>
                          <button 
                            onClick={() => onUpdateOrder(order.id, { status: OrderStatus.DELIVERED })}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-colors" title="Mark Delivered"
                          >
                            <CheckCircle size={20} />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => onUpdateOrder(order.id, { status: OrderStatus.CANCELLED })}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors" title="Cancel"
                      >
                        <XCircle size={20} />
                      </button>
                      <button 
                        onClick={() => onUpdateOrder(order.id, { status: OrderStatus.PENDING })}
                        className="p-2 text-gray-300 hover:text-black transition-colors" title="Reset"
                      >
                        <RefreshCcw size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
