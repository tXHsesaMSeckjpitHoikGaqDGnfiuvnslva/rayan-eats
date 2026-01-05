import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  
  return (
    <>
      {/* Top info bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2 hidden md:block">
        <div className="container-app flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              7:00 AM - 10:00 PM
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={14} />
              +91 98765 43210
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            MG Road, Kochi, Kerala
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-app">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold text-lg md:text-xl">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg md:text-xl text-foreground leading-tight">
                  Rayan Hotel
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground leading-tight">
                  Authentic Indian Cuisine
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link to="/cart">
                <Button variant="soft" size="icon" className="relative">
                  <ShoppingBag size={20} />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Button>
              </Link>
              
              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background"
            >
              <nav className="container-app py-4 flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      location.pathname === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground px-4">
                    <Clock size={14} />
                    7:00 AM - 10:00 PM
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground px-4 mt-2">
                    <Phone size={14} />
                    +91 98765 43210
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
