# Wedding Chronicle

A beautiful and comprehensive wedding planning and management platform built with TypeScript, React, and modern web technologies. Create and manage the perfect wedding experience.

## Overview

Wedding Chronicle is a full-featured wedding planning application designed to help couples:
- Plan and organize wedding events
- Manage guest lists and invitations
- Track budget and expenses
- Coordinate with vendors
- Create wedding timelines
- Share moments and memories
- Collaborate with wedding planners

## Features

- 💍 **Wedding Planning** - Comprehensive wedding planning tools
- 👥 **Guest Management** - Manage guest lists and RSVPs
- 💰 **Budget Tracking** - Monitor wedding expenses
- 🏷️ **Vendor Coordination** - Manage vendors and services
- 📅 **Timeline & Checklist** - Stay organized with timelines
- 📸 **Photo Gallery** - Share and organize wedding photos
- 🎨 **Design Customization** - Personalize your wedding style
- 📱 **Mobile Responsive** - Plan on any device
- 🔒 **Privacy & Security** - Keep your plans private
- 💬 **Collaboration** - Work with your partner and planner

## Tech Stack

- **Frontend**: TypeScript, React, HTML5, CSS3
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn-ui
- **State Management**: React hooks/Context
- **Database**: Cloud firestore (optional)
- **Deployment**: Vercel/Netlify

## Installation

### Prerequisites
- Node.js 14+
- npm or yarn
- Git

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/DOMINIC426/wedding-chronicle.git
cd wedding-chronicle
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start development server:
```bash
npm run dev
```

5. Open in browser:
```
http://localhost:5173
```

## Project Structure

```
wedding-chronicle/
├── src/
│   ├── components/          # Reusable components
│   │   ├── GuestList.tsx
│   │   ├── BudgetTracker.tsx
│   │   ├── VendorManager.tsx
│   │   ├── Timeline.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Planning.tsx
│   │   ├── Guests.tsx
│   │   ├── Budget.tsx
│   │   ├── Timeline.tsx
│   │   └── ...
│   ├── services/           # Business logic
│   │   ├── weddingService.ts
│   │   ├── guestService.ts
│   │   └── ...
│   ├── types/              # TypeScript definitions
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Core Features

### 1. Wedding Planning Dashboard

- **Overview**: See all wedding details at a glance
- **Quick Stats**: Guest count, budget status, timeline progress
- **Recent Activities**: Track recent updates
- **Upcoming Tasks**: Important reminders and deadlines

### 2. Guest Management

**Guest List**
- Add and manage guests
- RSVP tracking
- Dietary restrictions
- Seating arrangements
- Group organization

**Invitations**
- Create invitation designs
- Send digital invitations
- Track delivery and opens
- RSVP reminders
- Export guest list

### 3. Budget Tracking

**Budget Categories**
- Venue
- Catering
- Photography
- Flowers
- Decorations
- Entertainment
- Transportation
- Gifts
- Other

**Expense Management**
- Add expenses
- Track spending
- Compare to budget
- Generate reports
- Payment tracking

### 4. Vendor Coordination

**Vendor Management**
- Store vendor information
- Service details and pricing
- Contract management
- Payment tracking
- Communication history

**Vendor Types**
- Venue
- Caterer
- Photographer
- Florist
- Musicians
- Planners
- Decorators

### 5. Timeline & Checklist

**Planning Timeline**
- 12-month planning guide
- 6-month checklist
- 3-month timeline
- 1-month countdown
- Wedding day schedule

**Task Management**
- Add custom tasks
- Set deadlines
- Mark completed
- Assign to team members
- Set priorities

### 6. Photo Gallery

- Upload and organize photos
- Create albums
- Share with guests
- Caption and tag photos
- Gallery management

## Data Types

```typescript
interface Wedding {
  id: string;
  coupleName: string;
  weddingDate: Date;
  location: string;
  budget: number;
  guestCount: number;
  weddingStyle: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  rsvpStatus: 'pending' | 'accepted' | 'declined';
  dietaryRestrictions: string[];
  table: number;
}

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: Date;
  paid: boolean;
  vendor?: string;
}

interface Vendor {
  id: string;
  name: string;
  type: string;
  contact: string;
  email: string;
  phone: string;
  pricing: number;
  contractDate: Date;
  paymentStatus: string;
}
```

## Usage Guide

### Getting Started

1. **Create Wedding Profile**
   - Enter couple names
   - Set wedding date
   - Choose location
   - Select wedding style

2. **Set Budget**
   - Enter total budget
   - Allocate budget per category
   - Track spending

3. **Add Guests**
   - Import guest list (CSV)
   - Send invitations
   - Track RSVPs
   - Manage seating

4. **Plan Timeline**
   - Follow planning checklist
   - Set task deadlines
   - Track progress

5. **Manage Vendors**
   - Add vendor information
   - Track payments
   - Store contracts
   - Maintain communication

## Build & Deployment

### Build for Production
```bash
npm run build
```

### Local Preview
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## Performance Features

- Code splitting for faster loading
- Image optimization
- Lazy loading components
- Efficient state management
- API response caching

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Security & Privacy

- End-to-end encryption for sensitive data
- Secure authentication
- HTTPS encryption
- Privacy controls
- Data backup
- GDPR compliant

## Testing

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage

# E2E testing
npm run test:e2e
```

## Learning Outcomes

This project demonstrates:
- Modern React development
- TypeScript implementation
- State management patterns
- Component composition
- API integration
- Form handling and validation
- Responsive design
- Performance optimization
- Accessibility standards

## Future Enhancements

- Real-time collaboration
- Mobile app (React Native)
- AI-powered recommendations
- Wedding registry integration
- Payment processing
- Email notifications
- Video messaging with vendors
- Honeymoon planning
- Marriage certificate tracker
- Theme templates
- Multi-language support

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Follow code style guidelines
4. Add tests for new features
5. Submit a pull request

## Code Guidelines

- Use TypeScript for type safety
- Follow ESLint configuration
- Format with Prettier
- Write semantic HTML
- Use accessible components

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
npm run dev -- --port 3001
```

**Dependency errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build failures:**
```bash
npm run build --verbose
```

## License

This project is open source under the MIT License.

## Author

**DOMINIC426** - Full Stack Developer

## Support & Contact

- 📧 Email: support@example.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions
- 🌐 Website: example.com

---

**Wedding Chronicle** - Celebrate Your Love Story

For more projects, visit [my GitHub profile](https://github.com/DOMINIC426)
