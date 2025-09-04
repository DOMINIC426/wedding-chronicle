import { ReactNode } from "react";
import heroImage from "@/assets/wedding-hero.jpg";

interface WeddingLayoutProps {
  children: ReactNode;
  showHero?: boolean;
}

const WeddingLayout = ({ children, showHero = false }: WeddingLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-sunset">
      {showHero && (
        <div 
          className="h-96 bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Forever Begins Here</h1>
              <p className="text-xl drop-shadow-md">Create Beautiful Wedding Invitations</p>
            </div>
          </div>
        </div>
      )}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default WeddingLayout;