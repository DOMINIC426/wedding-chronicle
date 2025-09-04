import { Button } from "@/components/ui/button";
import WeddingLayout from "./WeddingLayout";

interface LoginOptionsProps {
  onSelectUserType: (type: 'owner' | 'guest' | 'admin') => void;
}

const LoginOptions = ({ onSelectUserType }: LoginOptionsProps) => {
  return (
    <WeddingLayout showHero>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Welcome to Wedding Invitations</h2>
        <p className="text-muted-foreground mb-8">Choose your role to continue</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-soft border border-primary/20">
            <h3 className="text-xl font-semibold mb-3 text-primary">Wedding Owner</h3>
            <p className="text-sm text-muted-foreground mb-4">Create and manage your wedding events</p>
            <Button 
              onClick={() => onSelectUserType('owner')}
              variant="romantic"
              className="w-full"
            >
              Owner Login
            </Button>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-soft border border-accent/20">
            <h3 className="text-xl font-semibold mb-3 text-accent">Wedding Guest</h3>
            <p className="text-sm text-muted-foreground mb-4">Access your invitation and download ticket</p>
            <Button 
              onClick={() => onSelectUserType('guest')}
              variant="elegant"
              className="w-full"
            >
              Guest Access
            </Button>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-soft border border-muted/30">
            <h3 className="text-xl font-semibold mb-3">Administrator</h3>
            <p className="text-sm text-muted-foreground mb-4">System administration access</p>
            <Button 
              onClick={() => onSelectUserType('admin')}
              variant="outline"
              className="w-full"
            >
              Admin Panel
            </Button>
          </div>
        </div>
      </div>
    </WeddingLayout>
  );
};

export default LoginOptions;