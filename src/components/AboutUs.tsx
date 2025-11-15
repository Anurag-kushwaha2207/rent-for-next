import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import logoImage from 'figma:asset/08609be9f7aed66b7ec1702a57ce46332566cfd1.png';

interface AboutUsProps {
  onNavigate: (page: 'home' | 'about' | 'contact') => void;
  onViewProperties?: () => void;
  onViewProfile?: () => void;
}

export default function AboutUs({ onNavigate, onViewProperties, onViewProfile }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#003A70] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="Rent For Nest Logo" 
            className="w-14 h-14 object-contain bg-white rounded-lg p-2"
          />
        </div>
        <nav className="flex gap-6 items-center">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <button onClick={() => onNavigate('about')} className="hover:underline">About Us</button>
          <button onClick={() => onNavigate('contact')} className="hover:underline">Contact Us</button>
          
          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="hover:bg-white/10 p-2 rounded">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[#003A70] text-white border-l border-white/20">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Navigate to different sections of the website</SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-2">
                <button
                  onClick={() => onNavigate('home')}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Contact Us
                </button>
                {onViewProfile && (
                  <button
                    onClick={onViewProfile}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    My Profile
                  </button>
                )}
                {onViewProperties && (
                  <button
                    onClick={onViewProperties}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    View Properties
                  </button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {/* About Us Section */}
      <section className="py-16 px-6 bg-gray-50 min-h-[calc(100vh-180px)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#003A70] text-center mb-8">🏠 About Us – Rent For Nest</h2>
          <div className="text-[#003A70]/80 space-y-4">
            <p>
              Welcome to <strong>Rent For Nest</strong>, your trusted partner in room rentals. We make it easy for people to give rooms on rent and find rooms to live in—all in one place.
            </p>
            <p>
              Whether you're a homeowner looking to rent out your space, or someone searching for a comfortable room to stay, our platform connects you quickly, safely, and conveniently. We believe in transparent listings, easy filters, and smart search tools so that every user finds the perfect match without stress.
            </p>
            <p>
              <strong>Our mission is simple:</strong> To make room renting smooth, reliable, and accessible for everyone.
            </p>
            <p>
              Join thousands of happy users who've already found their perfect space with Rent For Nest!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003A70] text-white py-8 px-6 text-center">
        <div className="space-y-4">
          <p>© 2025 Rent For Nest. All rights reserved.</p>
          <p className="text-white/70">Making room renting smooth, reliable, and accessible for everyone.</p>
        </div>
      </footer>
    </div>
  );
}
