
import React from 'react';
import { User, Order, OrderStatus } from '../types';
import { MapPin, Package, Clock, IndianRupee } from 'lucide-react';

interface HistoryViewProps {
  user: User;
  orders: Order[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ user, orders }) => {
  const userOrders = orders.filter(o => o.userEmail === user.email);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-700';
      case OrderStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-700';
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-700';
      case OrderStatus.CANCELLED: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Your Orders</h2>
        <p className="text-gray-500 mt-1 md:mt-0">{userOrders.length} orders total</p>
      </div>

      {userOrders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-100 shadow-sm">
          <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
            <Package size={48} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-600">No orders found</h3>
          <p className="text-gray-400 mt-2">Any pickups you schedule will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b pb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{order.id}</span>
                  <h3 className="text-lg font-bold text-gray-900">{order.serviceType}</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-tight">From</p>
                      <p className="text-gray-700 font-medium">{order.fromAddress}</p>
                      <p className="text-gray-400">{order.fromPincode}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-tight">To</p>
                      <p className="text-gray-700 font-medium">{order.toAddress}</p>
                      <p className="text-gray-400">{order.toPincode}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1 tracking-tight">Item Info</p>
                    <p className="text-sm text-gray-700 italic">"{order.itemDescription}"</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center text-gray-500 space-x-2">
                        <Clock size={16} />
                        <span className="text-xs">{new Date(order.timestamp).toLocaleDateString()} {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                     </div>
                     <div className="flex items-center text-blue-600 font-extrabold text-xl">
                        <IndianRupee size={18} />
                        <span>{order.amount}</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
