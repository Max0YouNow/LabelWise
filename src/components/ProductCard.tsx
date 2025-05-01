
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, AlertTriangle, AlertCircle, ImageOff, Apple, Banana, Carrot, Milk, Egg, Cake } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  healthScore: number;
  status: 'safe' | 'moderate' | 'unsafe';
  image: string;
  nutrients: {
    name: string;
    value: string;
    percentage: number;
  }[];
};

type ProductCardProps = {
  product: Product;
  index?: number;
  className?: string;
};

// Food icon mapping based on product name keywords
const getFoodIcon = (productName: string) => {
  const name = productName.toLowerCase();
  
  if (name.includes('yogurt') || name.includes('milk') || name.includes('dairy')) {
    return <Milk className="w-full h-full text-primary" />;
  } else if (name.includes('fruit') || name.includes('apple')) {
    return <Apple className="w-full h-full text-accent" />;
  } else if (name.includes('banana')) {
    return <Banana className="w-full h-full text-primary" />;
  } else if (name.includes('cereal') || name.includes('grain')) {
    return <Carrot className="w-full h-full text-primary" />;
  } else if (name.includes('bar') || name.includes('snack') || name.includes('chocolate')) {
    return <Cake className="w-full h-full text-destructive" />;
  } else if (name.includes('shake') || name.includes('protein')) {
    return <Egg className="w-full h-full text-accent" />;
  } else {
    // Default icon
    return <Apple className="w-full h-full text-primary" />;
  }
};

const ProductCard = ({ product, index = 0, className }: ProductCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <Shield className="h-4 w-4 text-accent" />;
      case 'moderate':
        return <AlertTriangle className="h-4 w-4 text-primary" />;
      case 'unsafe':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className={cn(
          "product-card-glass hover:scale-[1.02] cursor-pointer group",
          className
        )}>
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 relative bg-secondary/30 flex items-center justify-center">
              {getFoodIcon(product.name)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                {getStatusIcon(product.status)}
                <span className={cn(
                  "text-xs font-medium rounded-full px-2 py-0.5 border",
                  `status-${product.status}`
                )}>
                  {product.status === 'safe' ? 'Safe Choice' : 
                   product.status === 'moderate' ? 'Moderate' : 'Caution'}
                </span>
              </div>
              
              <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
              
              <div className="flex items-center">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      product.healthScore >= 70 ? "bg-accent" : 
                      product.healthScore >= 50 ? "bg-primary" : "bg-destructive"
                    )}
                    style={{ width: `${product.healthScore}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs font-medium">{product.healthScore}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
