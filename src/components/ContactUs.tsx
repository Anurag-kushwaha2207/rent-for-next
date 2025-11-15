import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import logoImage from 'figma:asset/08609be9f7aed66b7ec1702a57ce46332566cfd1.png';

interface ContactUsProps {
  onNavigate: (page: 'home' | 'about' | 'contact') => void;
  onViewProperties?: () => void;
  onViewProfile?: () => void;
}

export default function ContactUs({ onNavigate, onViewProperties, onViewProfile }: ContactUsProps) {
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

      {/* Contact Us Section */}
      <section className="py-16 px-6 bg-white min-h-[calc(100vh-180px)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#003A70] mb-6">Contact Us</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-[#003A70] mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <p className="text-[#003A70]/80">📧 arnavranjan66@gmail.com</p>
                <p className="text-[#003A70]/80">📱 +91 70613 21994</p>
              </div>
            </div>
            <p className="text-[#003A70]/80">
              We're here to help! Feel free to reach out to us for any queries, support, or feedback.
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
