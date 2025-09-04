export interface WeddingOwner {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface WeddingEvent {
  id: string;
  eventId: string;
  ownerId: string;
  brideName: string;
  groomName: string;
  venue: string;
  date: string;
  time: string;
  description?: string;
  createdAt: Date;
}

export interface Guest {
  id: string;
  eventId: string;
  fullName: string;
  email?: string;
  phone?: string;
  hasDownloadedTicket: boolean;
  createdAt: Date;
}

export interface Ticket {
  eventId: string;
  guestName: string;
  brideName: string;
  groomName: string;
  venue: string;
  date: string;
  time: string;
  qrCode: string;
}