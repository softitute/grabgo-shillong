import React, { useState, useEffect } from 'react';
import { User, Order, OrderStatus, PaymentStatus } from './types.ts';
import { ADMIN_EMAIL } from './constants.tsx';
import HomeView from './views/HomeView.tsx';
import DashboardView from './views/DashboardView.tsx';
import OrderFormView from './views/OrderFormView.tsx';
import HistoryView from './views/HistoryView.tsx';
import AdminView from './views/AdminView.tsx';
import Navbar from './components/Navbar.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'order-form' | 'history' | 'admin'>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('grabgo_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grabgo_orders', JSON.stringify(orders));
  }, [orders]);

  const handleLogin = (mockUser: User) => {
    setUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const createOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCurrentView('history');
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...updates } : o));
  };

  const renderView = () => {
    if (!user) return <HomeView onLogin={handleLogin} />;

    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView 
            user={user} 
            onSelectService={(id) => {
              setSelectedService(id);
              setCurrentView('order-form');
            }} 
          />
        );
      case 'order-form':
        return (
          <OrderFormView 
            user={user} 
            serviceId={selectedService || 'others'} 
            onSubmit={createOrder}
            onCancel={() => setCurrentView('dashboard')}
          />
        );
      case 'history':
        return <HistoryView user={user} orders={orders} />;
      case 'admin':
        return user.isAdmin ? <AdminView orders={orders} onUpdateOrder={updateOrder} /> : <DashboardView user={user} onSelectService={() => {}} />;
      default:
        return <DashboardView user={user} onSelectService={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {user && (
        <Navbar 
          user={user} 
          currentView={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        />
      )}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {renderView()}
      </main>
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GrabGo Shillong. Instant Pick & Drop.</p>
      </footer>
    </div>
  );
};

export default App;