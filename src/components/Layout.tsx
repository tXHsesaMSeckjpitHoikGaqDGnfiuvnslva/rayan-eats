import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartFloatingButton } from './CartFloatingButton';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <CartFloatingButton />
    </div>
  );
}
