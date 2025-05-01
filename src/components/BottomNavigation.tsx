
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ScanLine, BarChart2, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', icon: Home, path: '/home' },
    { name: 'Scan', icon: ScanLine, path: '/scan' },
    { name: 'Insights', icon: BarChart2, path: '/insights' },
    { name: 'Profile', icon: UserCircle, path: '/profile' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-ui-card border-t border-ui-border/50 py-2 px-4 z-40">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center p-2 min-w-[64px] min-h-[60px] rounded-xl transition-colors",
                isActive 
                  ? "text-cta-yellow bg-black/20" 
                  : "text-text-primary hover:text-text-primary"
              )}
            >
              <item.icon className={cn(
                "h-6 w-6 mb-1",
                isActive && "text-cta-yellow"
              )} />
              <span className={cn(
                "text-xs font-medium",
                isActive && "text-cta-yellow"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
