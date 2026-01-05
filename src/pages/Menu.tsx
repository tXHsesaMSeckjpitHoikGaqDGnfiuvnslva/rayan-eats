import { Layout } from '@/components/Layout';
import { MenuSection } from '@/components/MenuSection';

const Menu = () => {
  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container-app">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Our Menu
            </h1>
            <p className="text-muted-foreground mt-2">
              Explore our authentic Indian dishes, crafted with love and tradition
            </p>
          </div>
          <MenuSection showFilters showCategories />
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
