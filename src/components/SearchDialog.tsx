
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, History, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { products, Product } from '@/data/products';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Greek Yogurt', 'Whole Grain Cereal', 'Milk'
  ]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term && !recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches.slice(0, 4)]);
    }
  };

  const filteredProducts = Object.values(products).filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFoodIcon = (productName: string) => {
    const name = productName.toLowerCase();
    let IconComponent;
    
    if (name.includes('yogurt') || name.includes('milk') || name.includes('dairy')) {
      return "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=120";
    } else if (name.includes('fruit') || name.includes('apple')) {
      return "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=120";
    } else if (name.includes('cereal') || name.includes('grain')) {
      return "https://images.unsplash.com/photo-1556442261-e52a7d45ebc4?auto=format&fit=crop&q=80&w=120";
    } else if (name.includes('bar') || name.includes('snack') || name.includes('chocolate')) {
      return "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&q=80&w=120";
    } else {
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=120";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md md:max-w-xl neo-blur"
        aria-labelledby="search-dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="search-dialog-title" className="text-lg font-semibold">Search Products</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
          <Input 
            placeholder="Search for products, brands, categories..." 
            className="pl-10 bg-white/10 border-white/20 focus:border-white/40"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            aria-label="Search products"
          />
        </div>
        
        {searchTerm === '' && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
              <History className="h-4 w-4 mr-2" aria-hidden="true" />
              Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSearch(term)}
                  className="border-white/20 hover:bg-white/10 text-white"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {searchTerm !== '' && filteredProducts.length > 0 && (
          <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto pr-1">
            <h3 className="text-sm font-medium text-muted-foreground">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </h3>
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                onClick={() => {
                  handleSearch(product.name);
                  onOpenChange(false);
                }}
                className={cn(
                  "flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors",
                  "border border-white/20 bg-white/5"
                )}
              >
                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-white/20">
                  <img 
                    src={getFoodIcon(product.name)} 
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                  />
                </div>
                
                <div className="ml-3 flex-1">
                  <h4 className="font-medium text-white">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}
        
        {searchTerm !== '' && filteredProducts.length === 0 && (
          <div className="mt-6 text-center py-10">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              Try searching for a different term or category
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')}
              className="border-white/20 hover:bg-white/10"
            >
              Clear Search
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
