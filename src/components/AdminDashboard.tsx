import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import WeddingLayout from "./WeddingLayout";
import { WeddingEvent } from "@/types/wedding";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [events, setEvents] = useState<WeddingEvent[]>([]);

  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem('weddingEvents') || '[]');
    setEvents(allEvents);
  }, []);

  const handleRemoveEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to remove this event? This action cannot be undone.')) {
      // Remove event
      const allEvents = JSON.parse(localStorage.getItem('weddingEvents') || '[]');
      const updatedEvents = allEvents.filter((e: WeddingEvent) => e.eventId !== eventId);
      localStorage.setItem('weddingEvents', JSON.stringify(updatedEvents));
      
      // Remove associated guests
      const allGuests = JSON.parse(localStorage.getItem('weddingGuests') || '[]');
      const updatedGuests = allGuests.filter((g: any) => g.eventId !== eventId);
      localStorage.setItem('weddingGuests', JSON.stringify(updatedGuests));
      
      setEvents(updatedEvents);
      toast({ title: "Event Removed", description: "Event and associated guests have been removed from the system" });
    }
  };

  return (
    <WeddingLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">System administration panel</p>
        </div>
        <Button onClick={onLogout} variant="outline">Logout</Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Event Management</CardTitle>
          <CardDescription>
            Remove events from the system ({events.length} total events)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No events in the system</p>
          ) : (
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{event.brideName} & {event.groomName}</h3>
                      <Badge className="bg-primary">{event.eventId}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.venue} • {event.date} at {event.time}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created: {new Date(event.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleRemoveEvent(event.eventId)}
                    variant="destructive"
                    size="sm"
                  >
                    Remove Event
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </WeddingLayout>
  );
};

export default AdminDashboard;