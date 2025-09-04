import { useState } from "react";
import LoginOptions from "@/components/LoginOptions";
import OwnerAuth from "@/components/OwnerAuth";
import GuestAuth from "@/components/GuestAuth";
import AdminAuth from "@/components/AdminAuth";
import OwnerDashboard from "@/components/OwnerDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import GuestTicket from "@/components/GuestTicket";
import { WeddingOwner, WeddingEvent, Guest } from "@/types/wedding";

type AppState = 
  | { screen: 'login-options' }
  | { screen: 'owner-auth' }
  | { screen: 'guest-auth' }
  | { screen: 'admin-auth' }
  | { screen: 'owner-dashboard'; owner: WeddingOwner }
  | { screen: 'admin-dashboard' }
  | { screen: 'guest-ticket'; guest: Guest; event: WeddingEvent };

const Index = () => {
  const [appState, setAppState] = useState<AppState>({ screen: 'login-options' });

  const handleSelectUserType = (type: 'owner' | 'guest' | 'admin') => {
    switch (type) {
      case 'owner':
        setAppState({ screen: 'owner-auth' });
        break;
      case 'guest':
        setAppState({ screen: 'guest-auth' });
        break;
      case 'admin':
        setAppState({ screen: 'admin-auth' });
        break;
    }
  };

  const handleOwnerLogin = (owner: WeddingOwner) => {
    setAppState({ screen: 'owner-dashboard', owner });
  };

  const handleGuestLogin = (guest: Guest, event: WeddingEvent) => {
    setAppState({ screen: 'guest-ticket', guest, event });
  };

  const handleAdminLogin = () => {
    setAppState({ screen: 'admin-dashboard' });
  };

  const handleLogout = () => {
    setAppState({ screen: 'login-options' });
  };

  const handleBack = () => {
    setAppState({ screen: 'login-options' });
  };

  switch (appState.screen) {
    case 'login-options':
      return <LoginOptions onSelectUserType={handleSelectUserType} />;
      
    case 'owner-auth':
      return <OwnerAuth onLogin={handleOwnerLogin} onBack={handleBack} />;
      
    case 'guest-auth':
      return <GuestAuth onLogin={handleGuestLogin} onBack={handleBack} />;
      
    case 'admin-auth':
      return <AdminAuth onLogin={handleAdminLogin} onBack={handleBack} />;
      
    case 'owner-dashboard':
      return <OwnerDashboard owner={appState.owner} onLogout={handleLogout} />;
      
    case 'admin-dashboard':
      return <AdminDashboard onLogout={handleLogout} />;
      
    case 'guest-ticket':
      return <GuestTicket 
        guest={appState.guest} 
        event={appState.event} 
        onLogout={handleLogout} 
      />;
      
    default:
      return <LoginOptions onSelectUserType={handleSelectUserType} />;
  }
};

export default Index;
