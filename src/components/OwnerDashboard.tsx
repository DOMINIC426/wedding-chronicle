import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import WeddingLayout from "./WeddingLayout";
import { WeddingOwner, WeddingEvent, Guest } from "@/types/wedding";
import { generateEventId } from "@/utils/eventIdGenerator";

interface OwnerDashboardProps {
  owner: WeddingOwner;
  onLogout: () => void;
}

const OwnerDashboard = ({ owner, onLogout }: OwnerDashboardProps) => {
  const [events, setEvents] = useState<WeddingEvent[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  
  const [eventForm, setEventForm] = useState({
    brideName: '',
    groomName: '',
    venue: '',
    date: '',
    time: '',
    description: ''
  });
  
  const [guestForm, setGuestForm] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Load owner's events and guests
    const allEvents = JSON.parse(localStorage.getItem('weddingEvents') || '[]');
    const allGuests = JSON.parse(localStorage.getItem('weddingGuests') || '[]');
    
    const ownerEvents = allEvents.filter((e: WeddingEvent) => e.ownerId === owner.id);
    setEvents(ownerEvents);
    setGuests(allGuests);
  }, [owner.id]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: WeddingEvent = {
      id: Date.now().toString(),
      eventId: generateEventId(),
      ownerId: owner.id,
      ...eventForm,
      createdAt: new Date()
    };
    
    const allEvents = JSON.parse(localStorage.getItem('weddingEvents') || '[]');
    allEvents.push(newEvent);
    localStorage.setItem('weddingEvents', JSON.stringify(allEvents));
    
    setEvents([...events, newEvent]);
    setEventForm({
      brideName: '',
      groomName: '',
      venue: '',
      date: '',
      time: '',
      description: ''
    });
    
    toast({ title: "Event Created!", description: `Event ID: ${newEvent.eventId}` });
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEventId) {
      toast({ 
        title: "Error", 
        description: "Please select an event first",
        variant: "destructive"
      });
      return;
    }
    
    const newGuest: Guest = {
      id: Date.now().toString(),
      eventId: selectedEventId,
      ...guestForm,
      hasDownloadedTicket: false,
      createdAt: new Date()
    };
    
    const allGuests = JSON.parse(localStorage.getItem('weddingGuests') || '[]');
    allGuests.push(newGuest);
    localStorage.setItem('weddingGuests', JSON.stringify(allGuests));
    
    setGuests([...guests, newGuest]);
    setGuestForm({
      fullName: '',
      email: '',
      phone: ''
    });
    
    toast({ title: "Guest Added!", description: `${newGuest.fullName} added successfully` });
  };

  const getEventGuests = (eventId: string) => {
    return guests.filter(g => g.eventId === eventId);
  };

  return (
    <WeddingLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome, {owner.fullName}</h1>
          <p className="text-muted-foreground">Manage your wedding events and guests</p>
        </div>
        <Button onClick={onLogout} variant="outline">Logout</Button>
      </div>

      <Tabs defaultValue="events" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger value="create-event">Create Event</TabsTrigger>
          <TabsTrigger value="add-guest">Add Guest</TabsTrigger>
          <TabsTrigger value="guest-list">Guest Lists</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Events</h2>
          {events.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No events created yet. Create your first event!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {events.map(event => (
                <Card key={event.id} className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {event.brideName} & {event.groomName}
                      <Badge className="bg-primary">{event.eventId}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {event.venue} • {event.date} at {event.time}
                    </CardDescription>
                  </CardHeader>
                  {event.description && (
                    <CardContent>
                      <p className="text-sm">{event.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="create-event">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>Add details for your wedding event</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brideName">Bride Name</Label>
                    <Input
                      id="brideName"
                      value={eventForm.brideName}
                      onChange={(e) => setEventForm(prev => ({ ...prev, brideName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="groomName">Groom Name</Label>
                    <Input
                      id="groomName"
                      value={eventForm.groomName}
                      onChange={(e) => setEventForm(prev => ({ ...prev, groomName: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={eventForm.venue}
                    onChange={(e) => setEventForm(prev => ({ ...prev, venue: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={eventForm.description}
                    onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Additional details about the event..."
                  />
                </div>
                
                <Button type="submit" variant="romantic" className="w-full">
                  Create Event
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-guest">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Add Guest</CardTitle>
              <CardDescription>Add a guest to an existing event</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddGuest} className="space-y-4">
                <div>
                  <Label htmlFor="selectEvent">Select Event</Label>
                  <select
                    id="selectEvent"
                    className="w-full p-2 border rounded-md"
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    required
                  >
                    <option value="">Choose an event...</option>
                    {events.map(event => (
                      <option key={event.eventId} value={event.eventId}>
                        {event.brideName} & {event.groomName} ({event.eventId})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="guestName">Full Name</Label>
                  <Input
                    id="guestName"
                    value={guestForm.fullName}
                    onChange={(e) => setGuestForm(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="guestEmail">Email (Optional)</Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={guestForm.email}
                    onChange={(e) => setGuestForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="guestPhone">Phone (Optional)</Label>
                  <Input
                    id="guestPhone"
                    value={guestForm.phone}
                    onChange={(e) => setGuestForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                
                <Button type="submit" variant="elegant" className="w-full">
                  Add Guest
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guest-list">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Guest Lists</h2>
            {events.map(event => {
              const eventGuests = getEventGuests(event.eventId);
              return (
                <Card key={event.id} className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {event.brideName} & {event.groomName}
                      <Badge className="ml-2 bg-primary">{event.eventId}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {eventGuests.length} guest(s) invited
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {eventGuests.length === 0 ? (
                      <p className="text-muted-foreground">No guests added yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {eventGuests.map(guest => (
                          <div key={guest.id} className="flex justify-between items-center p-2 border rounded">
                            <div>
                              <p className="font-medium">{guest.fullName}</p>
                              {guest.email && <p className="text-sm text-muted-foreground">{guest.email}</p>}
                            </div>
                            <Badge variant={guest.hasDownloadedTicket ? "default" : "secondary"}>
                              {guest.hasDownloadedTicket ? "Ticket Downloaded" : "Pending"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </WeddingLayout>
  );
};

export default OwnerDashboard;