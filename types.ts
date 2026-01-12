
export enum OrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export enum PaymentStatus {
  PAID = 'Paid',
  UNPAID = 'Unpaid'
}

export enum UrgencyType {
  NORMAL = 'Normal',
  EXPRESS = 'Express'
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  phone?: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  serviceType: string;
  itemDescription: string;
  urgency: UrgencyType;
  fromAddress: string;
  fromPincode: string;
  toAddress: string;
  toPincode: string;
  status: OrderStatus;
  amount: number;
  paymentStatus: PaymentStatus;
  timestamp: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  bgColor: string;
  hoverBorder: string;
}
