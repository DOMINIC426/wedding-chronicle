import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import WeddingLayout from "./WeddingLayout";
import { WeddingEvent, Guest } from "@/types/wedding";
import { generateQRCode } from "@/utils/eventIdGenerator";

interface GuestTicketProps {
  guest: Guest;
  event: WeddingEvent;
  onLogout: () => void;
}

const GuestTicket = ({ guest, event, onLogout }: GuestTicketProps) => {
  const [hasDownloaded, setHasDownloaded] = useState(guest.hasDownloadedTicket);
  const [qrCode, setQrCode] = useState<string>('');
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qrData = `Event: ${event.brideName} & ${event.groomName}\nVenue: ${event.venue}\nDate: ${event.date}\nTime: ${event.time}\nGuest: ${guest.fullName}`;
    generateQRCode(qrData).then(setQrCode);
  }, [event, guest]);

  const handleDownloadTicket = () => {
    // Mark guest as having downloaded the ticket
    const allGuests = JSON.parse(localStorage.getItem('weddingGuests') || '[]');
    const updatedGuests = allGuests.map((g: Guest) => 
      g.id === guest.id ? { ...g, hasDownloadedTicket: true } : g
    );
    localStorage.setItem('weddingGuests', JSON.stringify(updatedGuests));
    
    setHasDownloaded(true);
    
    // In a real app, you would generate a PDF here
    // For now, we'll just show a success message
    toast({ 
      title: "Ticket Downloaded!", 
      description: "Your wedding invitation ticket has been downloaded successfully" 
    });
  };

  return (
    <WeddingLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome, {guest.fullName}!</h1>
          <p className="text-muted-foreground">Your wedding invitation details</p>
        </div>
        <Button onClick={onLogout} variant="outline">Logout</Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card ref={ticketRef} className="shadow-romantic border-2 border-primary/20 bg-gradient-champagne">
          <CardHeader className="text-center bg-gradient-romantic text-white">
            <CardTitle className="text-3xl font-bold mb-2">Wedding Invitation</CardTitle>
            <Badge className="bg-white/20 text-white">Event ID: {event.eventId}</Badge>
          </CardHeader>
          
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-2">
                  {event.brideName} & {event.groomName}
                </h2>
                <p className="text-lg text-muted-foreground">
                  cordially invite you to celebrate their wedding
                </p>
              </div>
              
              <div className="border-t border-b border-primary/20 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <h3 className="font-semibold text-primary">Venue</h3>
                    <p className="text-foreground">{event.venue}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Date & Time</h3>
                    <p className="text-foreground">{event.date} at {event.time}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Guest Name</h3>
                    <p className="text-foreground">{guest.fullName}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Contact</h3>
                    <p className="text-foreground">{guest.email || guest.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              {event.description && (
                <div>
                  <h3 className="font-semibold text-primary mb-2">Special Notes</h3>
                  <p className="text-foreground italic">{event.description}</p>
                </div>
              )}
              
              <div className="bg-white p-4 rounded-lg shadow-soft">
                <h3 className="font-semibold text-primary mb-2">QR Code</h3>
                <div className="flex justify-center">
                  {qrCode ? (
                    <img src={qrCode} alt="Event QR Code" className="w-32 h-32" />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded border-2 border-dashed flex items-center justify-center">
                      <p className="text-xs text-muted-foreground text-center">
                        Generating QR Code...
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Scan to view event details
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <Button 
            onClick={handleDownloadTicket}
            variant="romantic"
            className="text-lg px-8 py-3"
            disabled={hasDownloaded}
          >
            {hasDownloaded ? "✓ Ticket Downloaded" : "Download Ticket"}
          </Button>
          
          {hasDownloaded && (
            <p className="text-sm text-muted-foreground mt-2">
              Your ticket has been successfully downloaded!
            </p>
          )}
        </div>
      </div>
    </WeddingLayout>
  );
};

export default GuestTicket;