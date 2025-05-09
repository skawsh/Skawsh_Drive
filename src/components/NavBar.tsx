
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Truck, FileText, User, Settings } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const routes = [
    { path: '/', label: 'Trips', icon: Truck },
    { path: '/history', label: 'History', icon: FileText },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around py-2">
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          return (
            <button
              key={route.path}
              onClick={() => navigate(route.path)}
              className={`flex flex-col items-center py-1 px-4 ${
                isActive ? 'text-laundry-primary' : 'text-laundry-darkGray'
              }`}
            >
              <route.icon size={20} className={`mb-1 ${isActive ? 'text-laundry-primary' : 'text-laundry-darkGray'}`} />
              <span className="text-xs font-medium">{route.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
