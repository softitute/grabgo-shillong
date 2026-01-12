
import React, { useState } from 'react';
import { User, UrgencyType, Order, OrderStatus, PaymentStatus } from '../types';
import { SERVICE_CATEGORIES } from '../constants';
import { ArrowLeft, Send, CreditCard, Clock, MapPin, Package } from 'lucide-react';

interface OrderFormViewProps {
  user: User;
  serviceId: string;
  onSubmit: (order: Order) => void;
  onCancel: () => void;
}

const OrderFormView: React.FC<OrderFormViewProps> = ({ user, serviceId, onSubmit, onCancel }) => {
  const service = SERVICE_CATEGORIES.find(s => s.id === serviceId) || SERVICE_CATEGORIES[4];
  
  const [formData, setFormData] = useState({
    fullName: user.name,
    mobileNumber: '',
    itemDescription: '',
    urgency: UrgencyType.NORMAL,
    fromAddress: '',
    fromPincode: '',
    toAddress: '',
    toPincode: ''
  });

  const [step, setStep] = useState<'details' | 'payment'>('details');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const amount = formData.urgency === UrgencyType.EXPRESS ? 180 : 100;
  
  const upiLink = `upi://pay?pa=grabgo@okhdfc&pn=GrabGo&am=${amount}&cu=INR`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const confirmOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userEmail: user.email,
      userName: formData.fullName,
      userPhone: formData.mobileNumber,
      serviceType: service.name,
      itemDescription: formData.itemDescription,
      urgency: formData.urgency,
      fromAddress: formData.fromAddress,
      fromPincode: formData.fromPincode,
      toAddress: formData.toAddress,
      toPincode: formData.toPincode,
      status: OrderStatus.PENDING,
      amount: amount,
      paymentStatus: PaymentStatus.UNPAID,
      timestamp: new Date().toISOString()
    };
    onSubmit(newOrder);
  };

  const sleekInput = "w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-black focus:bg-white text-black font-medium outline-none transition-all placeholder:text-gray-400";

  if (step === 'payment') {
    return (
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-md mx-auto animate-scale-up border border-gray-100">
        <h2 className="text-3xl font-black mb-6 text-center tracking-tight">Checkout</h2>
        <div className="bg-gray-50 rounded-3xl p-8 mb-8 border-2 border-dashed border-gray-200">
          <div className="flex justify-between mb-3">
            <span className="text-gray-500 font-medium">Service</span>
            <span className="font-bold text-black">{service.name}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-500 font-medium">Urgency</span>
            <span className={formData.urgency === UrgencyType.EXPRESS ? 'text-red-600 font-black' : 'text-black font-black'}>
              {formData.urgency}
            </span>
          </div>
          <div className="border-t-2 border-gray-100 pt-4 mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Total</span>
            <span className="text-3xl font-black text-black">₹{amount}</span>
          </div>
        </div>

        <div className="space-y-4">
          <a 
            href={upiLink}
            className="flex items-center justify-center space-x-3 w-full bg-[#f2ca52] text-black py-5 rounded-[1.5rem] font-black hover:bg-black hover:text-[#f2ca52] transition-all duration-300 shadow-xl shadow-gray-200 active:scale-95"
          >
            <CreditCard className="w-6 h-6" />
            <span>Pay with UPI</span>
          </a>
          <button 
            onClick={confirmOrder}
            className="w-full bg-gray-100 text-gray-800 py-4 rounded-[1.5rem] font-bold hover:bg-black hover:text-white transition-all active:scale-95"
          >
            Pay on Delivery
          </button>
          <button 
            onClick={() => setStep('details')}
            className="w-full text-gray-400 py-2 text-xs hover:text-gray-600 font-medium"
          >
            Modify order details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={onCancel}
        className="flex items-center text-gray-400 hover:text-black font-bold transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className={`${service.bgColor} p-8 border-b border-gray-100`}>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">New {service.name} Request</h2>
          <p className="text-gray-500 font-medium mt-1">Reliable pickup across Shillong city limits.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          <div>
            <div className="flex items-center space-x-3 mb-6 text-black">
              <Package size={20} />
              <span className="font-black text-lg tracking-tight">Contact Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={sleekInput} />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Mobile Number</label>
                <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required placeholder="9876543210" className={sleekInput} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6 text-black">
              <Clock size={20} />
              <span className="font-black text-lg tracking-tight">Order Specifics</span>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Item Description</label>
                <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} required rows={2} placeholder={`What are we picking up?`} className={sleekInput + " resize-none"} />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Urgency (Normal ₹100 / Express ₹180)</label>
                <select name="urgency" value={formData.urgency} onChange={handleChange} className={sleekInput}>
                  <option value={UrgencyType.NORMAL}>Normal (₹100)</option>
                  <option value={UrgencyType.EXPRESS}>Express (₹180)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6 text-black">
              <MapPin size={20} />
              <span className="font-black text-lg tracking-tight">Delivery Routes</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-max">Pickup Location</div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Address</label>
                  <input type="text" name="fromAddress" value={formData.fromAddress} onChange={handleChange} required placeholder="Shop, Landmark, Locality" className={sleekInput} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Pincode</label>
                  <input type="text" name="fromPincode" value={formData.fromPincode} onChange={handleChange} required maxLength={6} placeholder="793001" className={sleekInput} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-max">Delivery Destination</div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Address</label>
                  <input type="text" name="toAddress" value={formData.toAddress} onChange={handleChange} required placeholder="House No, Road, Locality" className={sleekInput} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Pincode</label>
                  <input type="text" name="toPincode" value={formData.toPincode} onChange={handleChange} required maxLength={6} placeholder="793010" className={sleekInput} />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#f2ca52] text-black py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center space-x-3 hover:bg-black hover:text-[#f2ca52] transition-all duration-300 shadow-2xl shadow-gray-200 active:scale-[0.98]"
          >
            <span>Proceed to Checkout</span>
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderFormView;
