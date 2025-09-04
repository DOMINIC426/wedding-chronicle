import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import AuthCard from "./AuthCard";
import WeddingLayout from "./WeddingLayout";
import { WeddingEvent, Guest } from "@/types/wedding";

interface GuestAuthProps {
  onLogin: (guest: Guest, event: WeddingEvent) => void;
  onBack: () => void;
}

const GuestAuth = ({ onLogin, onBack }: GuestAuthProps) => {
  const [form, setForm] = useState({ fullName: '', eventId: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get events and guests from localStorage
    const events = JSON.parse(localStorage.getItem('weddingEvents') || '[]');
    const guests = JSON.parse(localStorage.getItem('weddingGuests') || '[]');
    
    const event = events.find((e: WeddingEvent) => e.eventId === form.eventId);
    if (!event) {
      toast({ 
        title: "Access Denied", 
        description: "Invalid Event ID",
        variant: "destructive"
      });
      return;
    }
    
    const guest = guests.find((g: Guest) => 
      g.eventId === form.eventId && 
      g.fullName.toLowerCase() === form.fullName.toLowerCase()
    );
    
    if (!guest) {
      toast({ 
        title: "Access Denied", 
        description: "Guest name not found for this event",
        variant: "destructive"
      });
      return;
    }
    
    toast({ title: "Welcome!", description: `Hello ${guest.fullName}` });
    onLogin(guest, event);
  };

  return (
    <WeddingLayout>
      <Button onClick={onBack} variant="outline" className="mb-4">
        ← Back to Options
      </Button>
      
      <AuthCard 
        title="Guest Access"
        description="Enter your details to access your invitation"
      >
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="eventId">Event ID</Label>
            <Input
              id="eventId"
              value={form.eventId}
              onChange={(e) => setForm(prev => ({ ...prev, eventId: e.target.value }))}
              placeholder="Enter event ID provided by wedding owner"
              required
            />
          </div>
          <Button type="submit" variant="elegant" className="w-full">
            Access Invitation
          </Button>
        </form>
      </AuthCard>
    </WeddingLayout>
  );
};

export default GuestAuth;