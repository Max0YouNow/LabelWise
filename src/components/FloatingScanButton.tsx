
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scan, ChevronUp, ChevronDown, ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingScanButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [swipePosition, setSwipePosition] = useState<'center' | 'left'>('center');
  const [showGlowMode, setShowGlowMode] = useState(false);
  
  // Detect scroll to auto-hide button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Toggle visibility manually
  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };
  
  // Toggle swipe position
  const togglePosition = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSwipePosition(prev => prev === 'center' ? 'left' : 'center');
  };

  // Toggle Glow Mode option visibility
  const toggleGlowMode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowGlowMode(!showGlowMode);
  };
  
  return (
    <div className="fixed bottom-20 left-0 w-full flex justify-center z-40">
      {/* Toggle visibility button - always visible */}
      <motion.button 
        onClick={toggleVisibility}
        className="absolute bottom-full mb-1 bg-ui-card text-text-primary rounded-full p-1.5 border border-ui-border shadow-md"
        aria-label={isVisible ? "Hide scan button" : "Show scan button"}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isVisible ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </motion.button>
      
      {/* Toggle position button - only visible when main button is visible */}
      {isVisible && (
        <motion.button 
          onClick={togglePosition}
          className={cn(
            "absolute bg-ui-card text-text-primary rounded-full p-1.5 border border-ui-border shadow-md",
            swipePosition === 'center' ? "right-4" : "left-4"
          )}
          style={{ bottom: '50%' }}
          aria-label={swipePosition === 'center' ? "Move scan button to side" : "Move scan button to center"}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {swipePosition === 'center' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </motion.button>
      )}
      
      {/* Main scan button with simplified animation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ 
          y: isVisible ? 0 : 100,
          opacity: isVisible ? 1 : 0,
          x: swipePosition === 'center' ? 0 : '-40vw'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          duration: 0.2
        }}
      >
        {/* Scan Button */}
        <Link to="/scan" className="block relative" aria-label="Scan product">
          <motion.div 
            className="w-16 h-16 flex items-center justify-center bg-cta-yellow rounded-full shadow-lg border-2 border-ui-border"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.1 }}
          >
            <Scan className="text-pure-black h-6 w-6 font-bold" />
          </motion.div>
          
          {/* Toggle Glow Mode button */}
          <motion.button
            onClick={toggleGlowMode}
            className="absolute -top-2 -right-2 bg-ui-card text-text-primary p-1.5 rounded-full shadow-md border border-ui-border"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={16} className="text-cta-yellow" />
          </motion.button>
          
          {/* Glow Mode option popup */}
          <AnimatePresence>
            {showGlowMode && (
              <motion.div 
                className="absolute bottom-full mb-2 right-0 bg-ui-card rounded-lg shadow-lg border border-ui-border p-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
              >
                <Link 
                  to="/scan?mode=glow"
                  className="whitespace-nowrap flex items-center gap-2 text-sm font-medium text-text-primary px-3 py-2 hover:bg-pure-black/20 rounded-md"
                >
                  <Zap size={16} className="text-cta-yellow" />
                  Activate Glow Mode
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>
    </div>
  );
};

// Added missing AnimatePresence import
import { AnimatePresence } from 'framer-motion';

export default FloatingScanButton;
