import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { BestSellersSection } from '@/components/MenuSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      
      {/* Best Sellers */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Our Bestsellers
              </h2>
              <p className="text-muted-foreground mt-1">Most loved by our customers</p>
            </div>
            <Link to="/menu">
              <Button variant="ghost">
                View All <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <BestSellersSection />
        </div>
      </section>
      
      <FeaturesSection />
    </Layout>
  );
};

export default Index;
