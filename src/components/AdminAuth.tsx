import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import AuthCard from "./AuthCard";
import WeddingLayout from "./WeddingLayout";

interface AdminAuthProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminAuth = ({ onLogin, onBack }: AdminAuthProps) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check admin credentials
    if (form.username === 'admin@gmail.com' && form.password === '1234') {
      toast({ title: "Admin Access Granted", description: "Welcome Administrator" });
      onLogin();
    } else {
      toast({ 
        title: "Access Denied", 
        description: "Invalid admin credentials",
        variant: "destructive"
      });
    }
  };

  return (
    <WeddingLayout>
      <Button onClick={onBack} variant="outline" className="mb-4">
        ← Back to Options
      </Button>
      
      <AuthCard 
        title="Administrator Panel"
        description="System administration access"
      >
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="email"
              value={form.username}
              onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))}
              placeholder="admin@gmail.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter password"
              required
            />
          </div>
          <Button type="submit" className="w-full" variant="outline">
            Admin Login
          </Button>
        </form>
      </AuthCard>
    </WeddingLayout>
  );
};

export default AdminAuth;