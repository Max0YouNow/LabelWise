import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ArrowLeft, Shield, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { recognizeProductFromImage } from '@/services/productRecognitionService';
import { products as allProducts, Product } from '../data/products';

type DetectedProduct = {
  id: string;
  name: string;
  status: 'safe' | 'moderate' | 'unsafe';
  position: { x: number; y: number; width: number; height: number };
  score: number;
  confidence: number;
  warnings?: string[];
  alternatives?: string[];
};

const GlowMode: React.FC<{
  onClose: () => void;
  dietaryPreferences?: string[];
}> = ({ onClose, dietaryPreferences = [] }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [detectedProducts, setDetectedProducts] = useState<DetectedProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DetectedProduct | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyzeIntervalRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(console.error);
            
            setTimeout(() => setShowGuide(false), 4000);
            
            setTimeout(() => startRealTimeDetection(), 5000);
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast({
          title: "Camera Error",
          description: "Unable to access your camera. Please check permissions.",
          variant: "destructive",
        });
        onClose();
      }
    };
    
    startCamera();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (analyzeIntervalRef.current) {
        clearInterval(analyzeIntervalRef.current);
      }
    };
  }, [toast, onClose]);
  
  const startRealTimeDetection = () => {
    analyzeIntervalRef.current = window.setInterval(() => {
      captureAndAnalyzeFrame();
    }, 3000);
  };
  
  const captureAndAnalyzeFrame = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;
    
    const now = Date.now();
    if (now - lastAnalysisTime < 2000) return;
    
    setLastAnalysisTime(now);
    setIsAnalyzing(true);
    
    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        
        const result = await recognizeProductFromImage(imageData);
        
        if (result.product) {
          const productData: DetectedProduct = {
            id: result.product.id,
            name: result.product.name,
            status: result.product.status,
            position: {
              x: 20 + Math.floor(Math.random() * 60),
              y: 20 + Math.floor(Math.random() * 50),
              width: 25 + Math.floor(Math.random() * 15),
              height: 20 + Math.floor(Math.random() * 15)
            },
            score: result.product.healthScore,
            confidence: result.confidence,
            warnings: [],
            alternatives: []
          };
          
          setDetectedProducts(prev => {
            if (prev.some(p => p.id === productData.id)) {
              return prev;
            }
            
            if (prev.length >= 5) {
              const newArr = [...prev];
              newArr.shift();
              return [...newArr, productData];
            }
            
            return [...prev, productData];
          });
          
          if (detectedProducts.length === 0) {
            toast({
              title: "Product Detected",
              description: `Found ${result.product.name} in view`,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error during frame analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleProductClick = (product: DetectedProduct) => {
    setSelectedProduct(product);
  };
  
  const closeProductDetails = () => {
    setSelectedProduct(null);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <Shield className="h-5 w-5 text-[#365011]" />;
      case 'moderate':
        return <AlertTriangle className="h-5 w-5 text-[#CCAE49]" />;
      case 'unsafe':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'safe':
        return 'glow-green';
      case 'moderate':
        return 'glow-yellow';
      case 'unsafe':
        return 'glow-red';
      default:
        return '';
    }
  };
  
  const getGradeFromScore = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C+';
    if (score >= 55) return 'C';
    if (score >= 50) return 'C-';
    if (score >= 45) return 'D+';
    if (score >= 40) return 'D';
    return 'D-';
  };
  
  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative h-full w-full">
        <video 
          ref={videoRef} 
          className="h-full w-full object-cover" 
          playsInline 
          muted 
          autoPlay
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {detectedProducts.map((product) => (
          <div
            key={product.id}
            className={cn(
              "absolute rounded-lg border-2 backdrop-blur-sm bg-black/5",
              getStatusClass(product.status),
              selectedProduct?.id === product.id ? 'z-20' : 'z-10'
            )}
            style={{
              left: `${product.position.x}%`,
              top: `${product.position.y}%`,
              width: `${product.position.width}%`,
              height: `${product.position.height}%`
            }}
            onClick={() => handleProductClick(product)}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-xs text-white font-medium truncate rounded-b-lg">
              {product.name}
              {product.confidence > 0 && (
                <span className="ml-1 opacity-70">({product.confidence}%)</span>
              )}
            </div>
          </div>
        ))}
        
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-2xl p-4 z-30 max-h-[70%] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedProduct.status)}
                  <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
                </div>
                <button 
                  onClick={closeProductDetails}
                  className="bg-muted rounded-full p-1"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex items-center mb-4 bg-muted p-3 rounded-lg">
                <div className={cn(
                  "text-3xl font-bold mr-3",
                  selectedProduct.status === 'safe' ? "text-[#365011]" : 
                  selectedProduct.status === 'moderate' ? "text-[#CCAE49]" : 
                  "text-red-600"
                )}>
                  {getGradeFromScore(selectedProduct.score)}
                </div>
                <div className="text-sm">
                  <div className="font-medium">Health Score</div>
                  <div className="text-xs text-muted-foreground">{selectedProduct.score}/100 points</div>
                  {selectedProduct.confidence > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Recognition confidence: {selectedProduct.confidence}%
                    </div>
                  )}
                </div>
              </div>
              
              {selectedProduct.warnings && selectedProduct.warnings.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-sm">Warnings</h4>
                  <ul className="space-y-2">
                    {selectedProduct.warnings.map((warning, index) => (
                      <li key={index} className="flex items-center bg-card p-2 rounded text-sm">
                        <AlertCircle size={16} className="text-red-500 mr-2 flex-shrink-0" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedProduct.alternatives && selectedProduct.alternatives.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-sm">Better Alternatives</h4>
                  <ul className="space-y-2">
                    {selectedProduct.alternatives.map((alt, index) => (
                      <li key={index} className="flex items-center bg-muted p-2 rounded text-sm">
                        <Shield size={16} className="text-[#365011] mr-2 flex-shrink-0" />
                        {alt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">
                  Add to List
                </Button>
                <Button className="flex-1">
                  Find Online
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showGuide && (
            <motion.div 
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 z-40"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Glow Mode Guide</h2>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center p-3 bg-card/20 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="w-10 h-10 rounded-full glow-green mr-3 flex-shrink-0"></div>
                  <div className="text-white">
                    <div className="font-medium">Green Glow</div>
                    <div className="text-xs text-white/80">Healthy, clean ingredients</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-card/20 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="w-10 h-10 rounded-full glow-yellow mr-3 flex-shrink-0"></div>
                  <div className="text-white">
                    <div className="font-medium">Yellow Glow</div>
                    <div className="text-xs text-white/80">Moderate, some concerns</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-card/20 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="w-10 h-10 rounded-full glow-red mr-3 flex-shrink-0"></div>
                  <div className="text-white">
                    <div className="font-medium">Red Glow</div>
                    <div className="text-xs text-white/80">Unhealthy, avoid if possible</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-white/70 text-center text-sm">
                Tap any product to view detailed information
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-30">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-background/30 backdrop-blur-md hover:bg-background/50"
            onClick={onClose}
          >
            <ArrowLeft size={18} className="mr-1" />
            Exit
          </Button>
          
          <div className="text-xs font-medium bg-background/30 backdrop-blur-md text-white px-3 py-1 rounded-full">
            {isAnalyzing ? 'Analyzing...' : 'Glow Mode Active'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlowMode;
