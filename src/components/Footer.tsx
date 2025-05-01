
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/80 py-12 px-6 neo-blur mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="font-semibold text-xl">LabelWise</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Helping you make healthier food choices with technology that puts you in control.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5"
                aria-label="Twitter"
              >
                <Twitter size={20} aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5"
                aria-label="Instagram"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5"
                aria-label="Facebook"
              >
                <Facebook size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/scan" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Food Scanner
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Nutritional Analysis
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Health Insights
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Food Database
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Nutrition Guide
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Healthy Recipes
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Food Labels
                </a>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/70 text-sm">
            © {currentYear} LabelWise. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
