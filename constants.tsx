
import React from 'react';
import { Pill, Home, FileText, PenTool, Box } from 'lucide-react';
import { ServiceCategory } from './types';

// The yellow color from the brand identity
export const THEME_YELLOW = "#f2ca52"; 

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { 
    id: 'medicines', 
    name: 'Medicines', 
    icon: 'pill', 
    description: 'Pharmacy pickups',
    bgColor: 'bg-emerald-50',
    hoverBorder: 'hover:border-emerald-300'
  },
  { 
    id: 'household', 
    name: 'Household Items', 
    icon: 'home', 
    description: 'Groceries & more',
    bgColor: 'bg-sky-50',
    hoverBorder: 'hover:border-sky-300'
  },
  { 
    id: 'documents', 
    name: 'Documents & Files', 
    icon: 'file-text', 
    description: 'Safe paper delivery',
    bgColor: 'bg-orange-50',
    hoverBorder: 'hover:border-orange-300'
  },
  { 
    id: 'stationery', 
    name: 'Stationery', 
    icon: 'pen-tool', 
    description: 'Office/School supplies',
    bgColor: 'bg-purple-50',
    hoverBorder: 'hover:border-purple-300'
  },
  { 
    id: 'others', 
    name: 'Others', 
    icon: 'box', 
    description: 'Custom pickups',
    bgColor: 'bg-slate-100',
    hoverBorder: 'hover:border-slate-400'
  },
];

export const ADMIN_EMAIL = 'admin@grabgo.in';

export const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'pill': return <Pill className="w-8 h-8 text-emerald-600" />;
    case 'home': return <Home className="w-8 h-8 text-sky-600" />;
    case 'file-text': return <FileText className="w-8 h-8 text-orange-600" />;
    case 'pen-tool': return <PenTool className="w-8 h-8 text-purple-600" />;
    default: return <Box className="w-8 h-8 text-slate-600" />;
  }
};
