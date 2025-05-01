
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] // Custom easing similar to Framer site
      }
    }
  };

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  
  const buttonHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 25px rgba(255, 224, 23, 0.5)" 
    },
    tap: { scale: 0.98 }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-16 px-6 overflow-hidden">
      {/* Background elements - more vibrant and dynamic */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Gradient orbs with blur effect like Framer site */}
        <motion.div 
          className="absolute top-[10%] right-[15%] w-[30vw] h-[30vw] rounded-full bg-purple-500/20 blur-[120px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[10%] w-[25vw] h-[25vw] rounded-full bg-primary/20 blur-[100px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </motion.div>
      
      {/* Animated grid background like Framer site */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* Floating animated particles - more like the Framer site */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/50"
          style={{
            width: Math.random() * 8 + 3,
            height: Math.random() * 8 + 3,
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            filter: "blur(1px)"
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="max-w-5xl mx-auto text-center z-10 mb-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildrenVariants}
          className="space-y-8"
        >
          <motion.span 
            variants={fadeInUpVariants}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-lg"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Make Healthier Food Choices
            </motion.div>
          </motion.span>
          
          <motion.h1
            variants={fadeInUpVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80"
          >
            Discover What's Really In Your 
            <motion.span 
              className="relative text-primary ml-2 inline-block"
              animate={{ 
                filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Food
              <motion.div 
                className="absolute -bottom-2 left-0 h-[6px] w-full bg-primary rounded-full"
                animate={{ 
                  scaleX: [0, 1, 1, 0],
                  x: ['-100%', '0%', '0%', '100%']
                }}
                transition={{ 
                  duration: 3,
                  times: [0, 0.4, 0.6, 1],
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUpVariants}
            className="text-white/80 max-w-xl mx-auto mb-8 text-lg backdrop-blur-md bg-black/20 p-5 rounded-xl border border-white/10"
          >
            Scan any food product to instantly know its nutritional value and health impact.
            Make better choices for your well-being with a simple scan.
          </motion.p>
          
          <motion.div 
            variants={fadeInUpVariants}
            className="flex flex-wrap gap-5 justify-center"
          >
            <Link to="/scan">
              <motion.div
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button className="px-8 py-7 rounded-xl text-base bg-primary text-black font-semibold hover:bg-primary/90 shadow-xl">
                  <motion.div 
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mr-2"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                      <motion.path 
                        d="M7 9V7a5 5 0 0 1 10 0v2m-5 9v-5m-4 2a4 4 0 0 0 8 0M5 18v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </svg>
                  </motion.div>
                  Start Scanning
                </Button>
              </motion.div>
            </Link>
            
            <Link to="/about">
              <motion.div
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="outline" className="px-8 py-7 rounded-xl text-base backdrop-blur-xl bg-white/5 border border-white/20 font-medium">
                  Learn More
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="ml-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Feature highlights with modern glass cards like Framer site */}
      <motion.div
        className="w-full max-w-5xl px-4 z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main image */}
          <motion.div 
            className="md:col-span-2 rounded-3xl overflow-hidden backdrop-blur-md bg-black/30 border border-white/20 shadow-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full h-full">
              <motion.img 
                src="/lovable-uploads/6ded1f34-956a-457f-b9d4-76d08ed6a0fb.png"
                alt="LabelWise App" 
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, filter: 'brightness(0.8)' }}
                animate={{ 
                  scale: 1,
                  filter: 'brightness(1)'
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-2">Advanced Food Analytics</h3>
                  <p className="text-white/80 text-sm">Get detailed insights about your food with our cutting-edge scanning technology</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Features cards */}
          <div className="flex flex-col space-y-6">
            <motion.div 
              className="flex-1 rounded-3xl p-6 backdrop-blur-xl bg-primary/10 border border-primary/30 overflow-hidden relative"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="mb-3"
              >
                <motion.div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary">
                    <motion.path 
                      d="M9 9V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C10.52 3 11.08 3 12.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v5.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 15 18.92 15 17.8 15H15M3 12v5.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21h5.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C15 19.48 15 18.92 15 17.8V12c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C13.48 9 12.92 9 11.8 9H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 10.52 3 11.08 3 12Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
              <h3 className="font-semibold text-lg text-primary mb-1">Scan Instantly</h3>
              <p className="text-sm text-white/80">Quick and accurate product analysis at your fingertips</p>
            </motion.div>
            
            <motion.div 
              className="flex-1 rounded-3xl p-6 backdrop-blur-xl bg-accent/10 border border-accent/30 overflow-hidden relative"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 0, 0, 0, 0, 10, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-3"
              >
                <motion.div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </motion.div>
              </motion.div>
              <h3 className="font-semibold text-lg text-accent mb-1">Safety Ratings</h3>
              <p className="text-sm text-white/80">Know what's safe to eat with our detailed ingredient analysis</p>
            </motion.div>
            
            <motion.div 
              className="flex-1 rounded-3xl p-6 backdrop-blur-xl bg-white/5 border border-white/20 overflow-hidden relative"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div
                animate={{ y: [0, -5, 0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-3"
              >
                <motion.div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </motion.div>
              </motion.div>
              <h3 className="font-semibold text-lg text-primary mb-1">Compare Products</h3>
              <p className="text-sm text-white/80">Make informed choices by comparing nutritional profiles</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
