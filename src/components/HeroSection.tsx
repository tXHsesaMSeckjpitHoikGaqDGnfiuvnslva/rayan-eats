import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, MapPin, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-hero" />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container-app relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="animate-pulse">🔥</span>
              Now accepting pre-orders
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
              Authentic Indian
              <span className="block text-primary">Flavors</span>
              Delivered Fresh
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Experience the rich, aromatic tastes of traditional Indian cuisine. 
              From spicy curries to fragrant biryanis, every dish tells a story.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu">
                <Button size="xl" variant="hero">
                  <Utensils size={20} />
                  Order Now
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/menu">
                <Button size="xl" variant="outline">
                  View Menu
                </Button>
              </Link>
            </div>
            
            {/* Info Pills */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock size={16} className="text-primary" />
                </div>
                <span>7 AM - 10 PM Daily</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin size={16} className="text-primary" />
                </div>
                <span>Free delivery within 5km</span>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30" />
              <div className="absolute inset-16 rounded-full bg-card shadow-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-7xl mb-4">🍛</div>
                  <p className="font-display font-bold text-2xl text-foreground">Rayan Hotel</p>
                  <p className="text-sm text-muted-foreground mt-1">Est. 1985</p>
                </div>
              </div>
              
              {/* Floating food items */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 text-5xl"
              >
                🥘
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-20 left-0 text-5xl"
              >
                🫓
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 left-10 text-4xl"
              >
                🌶️
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
