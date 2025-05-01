
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Scan from "./pages/Scan";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import ProductComparison from "./pages/ProductComparison";
import Alternatives from "./pages/Alternatives";
import Profile from "./pages/Profile";
import MisleadingLabels from "./pages/MisleadingLabels";
import ProductDetail from "./pages/ProductDetail";
import AppSettings from "./pages/AppSettings";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import IntroAnimation from "./pages/IntroAnimation";
import Insights from "./pages/Insights";
import { AnimatePresence } from "framer-motion";
import FloatingScanButton from "./components/FloatingScanButton";
import BottomNavigation from "./components/BottomNavigation";

const queryClient = new QueryClient();

// Component to conditionally render the navigation elements
const AppContent = () => {
  const location = useLocation();
  
  // Only show the FloatingScanButton on main app pages, not onboarding/signin/etc
  // Added additional routes where the scan button shouldn't appear
  const hideButtonRoutes = [
    '/', '/splash', '/intro', '/onboarding', '/sign-in', '/sign-up', '/scan'
  ];
  
  // Hide bottom navigation on these routes
  const hideNavRoutes = [
    '/', '/splash', '/intro', '/onboarding', '/sign-in', '/sign-up'
  ];
  
  const showScanButton = !hideButtonRoutes.includes(location.pathname);
  const showBottomNav = !hideNavRoutes.includes(location.pathname);
  
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Initial flow routes */}
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/intro" element={<IntroAnimation />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          {/* Main app routes */}
          <Route path="/home" element={<Index />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/compare" element={<ProductComparison />} />
          <Route path="/alternatives" element={<Alternatives />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/misleading-labels" element={<MisleadingLabels />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/settings" element={<AppSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      
      {/* Only show floating scan button if not on specific pages */}
      {showScanButton && <FloatingScanButton />}
      
      {/* Only show bottom navigation if not on specific pages */}
      {showBottomNav && <BottomNavigation />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="glowgrub-theme">
      <TooltipProvider>
        <div className="min-h-screen w-full font-sora bg-pure-black pb-16">
          {/* Removing the black overlay gradients that were causing visibility issues */}
          <div className="absolute inset-0 bg-[url('/lovable-uploads/bd86326b-b605-4d72-ad0a-53cc575b4c56.png')] bg-cover bg-center bg-no-repeat bg-fixed opacity-5 pointer-events-none"></div>
          
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
