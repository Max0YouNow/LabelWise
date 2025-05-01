import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Leaf, 
  Scan, 
  Home, 
  Info, 
  Menu, 
  X, 
  BookOpen, 
  BarChart2, 
  ShoppingBag, 
  User,
  AlertCircle,
  Settings,
  LogIn,
  LogOut,
  Search
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import SearchDialog from './SearchDialog';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { toast } = useToast();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navLinks = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Scan', path: '/scan', icon: Scan },
    { name: 'Alternatives', path: '/alternatives', icon: ShoppingBag },
    { name: 'Compare', path: '/compare', icon: BarChart2 },
    { name: 'Labels', path: '/misleading-labels', icon: AlertCircle },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'About', path: '/about', icon: Info },
  ];
  
  // Mock user state - in a real app, you would check if the user is logged in
  const isLoggedIn = true; // Set to true to show logged in state
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/sign-in");
  };
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out",
        isScrolled 
          ? theme === "dark" 
            ? "neo-blur shadow-lg" 
            : "glass shadow-lg" 
          : "bg-transparent"
      )}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2 z-50">
          <img
            src="/lovable-uploads/108adda3-6789-4f02-a8d8-1d751f7e7d18.png"
            alt="LabelWise logo"
            className="h-6 w-6"
          />
          <span className="font-semibold text-xl tracking-tight">LabelWise</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2" aria-label="Main navigation links">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium smooth-transition flex items-center gap-1.5",
                  isActive
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-primary/15"
                    transition={{ type: "spring", duration: 0.6 }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-foreground/80 hover:text-foreground hover:bg-white/10" 
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full text-foreground/80 hover:text-foreground hover:bg-white/10" 
                  aria-label="Profile"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/settings">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full md:flex hidden text-foreground/80 hover:text-foreground hover:bg-white/10" 
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-foreground/80 hover:text-foreground hover:bg-white/10" 
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/sign-in">
              <Button 
                variant="default" 
                size="sm" 
                className="rounded-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
          )}
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-foreground/80 hover:text-foreground hover:bg-white/10" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        id="mobile-menu"
        className={cn(
          "fixed inset-0 neo-blur z-40 flex flex-col items-center justify-center",
          "md:hidden"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0, 
          y: mobileMenuOpen ? 0 : -20,
          pointerEvents: mobileMenuOpen ? "auto" : "none"
        }}
        transition={{ duration: 0.3 }}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col items-center gap-6 px-6 py-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "relative px-6 py-3 rounded-full text-lg font-medium smooth-transition flex items-center gap-3",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {link.name}
              </Link>
            );
          })}
          
          <div className="flex gap-4 mt-8">
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="rounded-full gap-2 border-white/20 hover:bg-white/10">
                    <User className="h-5 w-5" aria-hidden="true" />
                    Profile
                  </Button>
                </Link>
                
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="rounded-full gap-2 border-white/20 hover:bg-white/10">
                    <Settings className="h-5 w-5" aria-hidden="true" />
                    Settings
                  </Button>
                </Link>
                
                <Button 
                  variant="default" 
                  size="lg" 
                  className="rounded-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-5 w-5" aria-hidden="true" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="rounded-full gap-2 border-white/20 hover:bg-white/10">
                    <LogIn className="h-5 w-5" aria-hidden="true" />
                    Sign In
                  </Button>
                </Link>
                
                <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="rounded-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-button"
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Navbar;
