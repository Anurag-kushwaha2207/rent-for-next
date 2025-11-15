import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Profile from './components/Profile';
import RentOutForm from './components/RentOutForm';
import PropertyListings from './components/PropertyListings';
import type { PropertyListing, PreviousTenant } from './components/RentOutForm';

type View = 
  | 'splash'
  | 'landing' 
  | 'signup' 
  | 'login' 
  | 'password-reset' 
  | 'dashboard'
  | 'home-page'
  | 'about-us'
  | 'contact-us'
  | 'profile' 
  | 'rent-out-form' 
  | 'property-listings';

interface User {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
}

// Mock data for demonstration
const mockListings: PropertyListing[] = [
  {
    id: '1',
    photos: [],
    address: 'Flat 301, Sunshine Apartments',
    road: 'MG Road',
    area: 'Koramangala',
    city: 'Bangalore',
    district: 'Bangalore Urban',
    state: 'Karnataka',
    pinCode: '560034',
    latitude: 12.9352,
    longitude: 77.6245,
    monthlyRent: 15000,
    duration: 12,
    suitableFor: 4,
    contactNumber: '+91 98765 43210',
    email: 'owner1@example.com',
    ownerName: 'Raj Kumar',
    previousTenants: [
      { name: 'Rahul Sharma', duration: '2 years', rating: 5 },
      { name: 'Anita Desai', duration: '1 year', rating: 4 },
    ],
  },
  {
    id: '2',
    photos: [],
    address: 'Villa 12B, Lake View Complex',
    road: 'Residency Road',
    area: 'Indiranagar',
    city: 'Bangalore',
    district: 'Bangalore Urban',
    state: 'Karnataka',
    pinCode: '560038',
    latitude: 12.9716,
    longitude: 77.6412,
    monthlyRent: 20000,
    duration: 6,
    suitableFor: 3,
    contactNumber: '+91 98765 43211',
    email: 'owner2@example.com',
    ownerName: 'Priya Sharma',
    previousTenants: [
      { name: 'Vikram Singh', duration: '3 years', rating: 5 },
    ],
  },
  {
    id: '3',
    photos: [],
    address: 'House No. 45, Green Valley',
    road: 'Anna Salai',
    area: 'T Nagar',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    pinCode: '600017',
    latitude: 13.0404,
    longitude: 80.2340,
    monthlyRent: 12000,
    duration: 11,
    suitableFor: 5,
    contactNumber: '+91 98765 43212',
    email: 'owner3@example.com',
    ownerName: 'Amit Patel',
    previousTenants: [],
  },
  {
    id: '4',
    photos: [],
    address: 'Bungalow 7, Sunrise Colony',
    road: 'SG Highway',
    area: 'Makarba',
    city: 'Ahmedabad',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pinCode: '380051',
    latitude: 23.0225,
    longitude: 72.5714,
    monthlyRent: 18000,
    duration: 12,
    suitableFor: 4,
    contactNumber: '+91 98765 43213',
    email: 'owner4@example.com',
    ownerName: 'Sneha Reddy',
    previousTenants: [
      { name: 'Meera Reddy', duration: '1.5 years', rating: 4 },
      { name: 'Suresh Kumar', duration: '2 years', rating: 5 },
      { name: 'Priya Nair', duration: '6 months', rating: 3 },
    ],
  },
  {
    id: '5',
    photos: [],
    address: 'Tower B, 15th Floor, Skyline Heights',
    road: 'Link Road',
    area: 'Andheri West',
    city: 'Mumbai',
    district: 'Mumbai Suburban',
    state: 'Maharashtra',
    pinCode: '400053',
    latitude: 19.1136,
    longitude: 72.8697,
    monthlyRent: 25000,
    duration: 12,
    suitableFor: 3,
    contactNumber: '+91 98765 43214',
    email: 'owner5@example.com',
    ownerName: 'Arjun Mehta',
    previousTenants: [
      { name: 'Divya Shah', duration: '1 year', rating: 5 },
    ],
  },
];

export default function App() {
  // Check if splash has been shown before
  const [hasSeenSplash, setHasSeenSplash] = useState(() => {
    return localStorage.getItem('hasSeenSplash') === 'true';
  });
  
  const [currentView, setCurrentView] = useState<View>(() => {
    return hasSeenSplash ? 'landing' : 'splash';
  });
  
  // Load users from localStorage
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('rentfornest_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Load property listings from localStorage
  const [propertyListings, setPropertyListings] = useState<PropertyListing[]>(() => {
    const savedListings = localStorage.getItem('rentfornest_listings');
    return savedListings ? JSON.parse(savedListings) : mockListings;
  });

  const handleSignUp = (data: { fullName: string; mobile: string; email: string; password: string }) => {
    // Check if user already exists
    const existingUser = users.find(u => u.mobile === data.mobile || u.email === data.email);
    if (existingUser) {
      toast.error('User with this mobile or email already exists!');
      return;
    }

    const newUser: User = {
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      password: data.password,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    // Save to localStorage
    localStorage.setItem('rentfornest_users', JSON.stringify(updatedUsers));
    
    setCurrentUser(newUser);
    toast.success('Account created successfully!');
    setCurrentView('home-page');
  };

  const handleLogin = (mobile: string, password: string) => {
    console.log('Attempting login with mobile:', mobile);
    console.log('Total users in database:', users.length);
    
    const user = users.find(u => u.mobile === mobile && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      toast.success(`Welcome back, ${user.fullName}!`);
      setCurrentView('home-page');
    } else {
      // Check if mobile exists but password is wrong
      const userExists = users.find(u => u.mobile === mobile);
      if (userExists) {
        toast.error('Incorrect password!');
      } else {
        toast.error('No account found with this mobile number. Please sign up first!');
      }
    }
  };

  const handlePasswordReset = (data: { fullName: string; mobile: string; email: string; newPassword: string }) => {
    const userIndex = users.findIndex(
      u => u.fullName === data.fullName && u.mobile === data.mobile && u.email === data.email
    );

    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex].password = data.newPassword;
      setUsers(updatedUsers);
      // Save to localStorage
      localStorage.setItem('rentfornest_users', JSON.stringify(updatedUsers));
      toast.success('Password reset successfully!');
      setCurrentView('login');
    } else {
      toast.error('User details do not match our records!');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast.info('Logged out successfully');
    setCurrentView('landing');
  };

  const handlePropertySubmit = (listing: PropertyListing) => {
    const newListing = {
      ...listing,
      ownerName: currentUser?.fullName || '',
    };
    const updatedListings = [newListing, ...propertyListings];
    setPropertyListings(updatedListings);
    // Save to localStorage
    localStorage.setItem('rentfornest_listings', JSON.stringify(updatedListings));
    toast.success('Property listed successfully!');
    setCurrentView('dashboard');
  };

  const handleSplashComplete = () => {
    localStorage.setItem('hasSeenSplash', 'true');
    setHasSeenSplash(true);
    setCurrentView('landing');
  };

  return (
    <div className="size-full">
      <Toaster position="top-center" richColors />
      
      {currentView === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {currentView === 'landing' && (
        <LandingPage 
          onSignUp={() => setCurrentView('signup')}
          onLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'signup' && (
        <SignUp 
          onBack={() => setCurrentView('landing')}
          onSignUp={handleSignUp}
        />
      )}

      {currentView === 'login' && (
        <Login 
          onBack={() => setCurrentView('landing')}
          onLogin={handleLogin}
          onForgotPassword={() => setCurrentView('password-reset')}
        />
      )}

      {currentView === 'password-reset' && (
        <PasswordReset 
          onBack={() => setCurrentView('login')}
          onReset={handlePasswordReset}
        />
      )}

      {currentView === 'dashboard' && currentUser && (
        <Dashboard 
          userName={currentUser.fullName}
          onLookingFor={() => setCurrentView('property-listings')}
          onViewHome={() => setCurrentView('home-page')}
          onViewProfile={() => setCurrentView('profile')}
        />
      )}

      {currentView === 'home-page' && currentUser && (
        <HomePage 
          onNavigate={(page) => {
            if (page === 'home') setCurrentView('home-page');
            else if (page === 'about') setCurrentView('about-us');
            else if (page === 'contact') setCurrentView('contact-us');
          }}
          onViewProperties={() => setCurrentView('dashboard')}
          onViewProfile={() => setCurrentView('profile')}
        />
      )}

      {currentView === 'about-us' && currentUser && (
        <AboutUs 
          onNavigate={(page) => {
            if (page === 'home') setCurrentView('home-page');
            else if (page === 'about') setCurrentView('about-us');
            else if (page === 'contact') setCurrentView('contact-us');
          }}
          onViewProperties={() => setCurrentView('dashboard')}
          onViewProfile={() => setCurrentView('profile')}
        />
      )}

      {currentView === 'contact-us' && currentUser && (
        <ContactUs 
          onNavigate={(page) => {
            if (page === 'home') setCurrentView('home-page');
            else if (page === 'about') setCurrentView('about-us');
            else if (page === 'contact') setCurrentView('contact-us');
          }}
          onViewProperties={() => setCurrentView('dashboard')}
          onViewProfile={() => setCurrentView('profile')}
        />
      )}

      {currentView === 'profile' && currentUser && (
        <Profile 
          onBack={() => setCurrentView('dashboard')}
          onAddProperty={() => setCurrentView('rent-out-form')}
          userListings={propertyListings.filter(p => p.ownerName === currentUser.fullName)}
          currentUser={currentUser.fullName}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'rent-out-form' && (
        <RentOutForm 
          onBack={() => setCurrentView('profile')}
          onSubmit={handlePropertySubmit}
        />
      )}

      {currentView === 'property-listings' && (
        <PropertyListings 
          onBack={() => setCurrentView('dashboard')}
          listings={propertyListings}
        />
      )}
    </div>
  );
}
