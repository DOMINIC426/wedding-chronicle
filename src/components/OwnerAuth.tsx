import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import AuthCard from "./AuthCard";
import WeddingLayout from "./WeddingLayout";
import { WeddingOwner } from "@/types/wedding";

interface OwnerAuthProps {
  onLogin: (owner: WeddingOwner) => void;
  onBack: () => void;
}

const OwnerAuth = ({ onLogin, onBack }: OwnerAuthProps) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation - in real app, this would authenticate against database
    const owners = JSON.parse(localStorage.getItem('weddingOwners') || '[]');
    const owner = owners.find((o: WeddingOwner) => 
      o.email === loginForm.email && o.password === loginForm.password
    );
    
    if (owner) {
      toast({ title: "Login Successful", description: "Welcome back!" });
      onLogin(owner);
    } else {
      toast({ 
        title: "Login Failed", 
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({ 
        title: "Registration Failed", 
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    const newOwner: WeddingOwner = {
      id: Date.now().toString(),
      fullName: registerForm.fullName,
      email: registerForm.email,
      password: registerForm.password,
      createdAt: new Date()
    };
    
    const owners = JSON.parse(localStorage.getItem('weddingOwners') || '[]');
    
    if (owners.find((o: WeddingOwner) => o.email === registerForm.email)) {
      toast({ 
        title: "Registration Failed", 
        description: "Email already exists",
        variant: "destructive"
      });
      return;
    }
    
    owners.push(newOwner);
    localStorage.setItem('weddingOwners', JSON.stringify(owners));
    
    toast({ title: "Registration Successful", description: "Welcome to Wedding Invitations!" });
    onLogin(newOwner);
  };

  return (
    <WeddingLayout>
      <Button onClick={onBack} variant="outline" className="mb-4">
        ← Back to Options
      </Button>
      
      <AuthCard 
        title="Wedding Owner"
        description="Manage your wedding events and guest lists"
      >
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" variant="romantic" className="w-full">
                Login
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={registerForm.fullName}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="regEmail">Email</Label>
                <Input
                  id="regEmail"
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="regPassword">Password</Label>
                <Input
                  id="regPassword"
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" variant="romantic" className="w-full">
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </AuthCard>
    </WeddingLayout>
  );
};

export default OwnerAuth;