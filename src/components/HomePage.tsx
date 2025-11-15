import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/08609be9f7aed66b7ec1702a57ce46332566cfd1.png';

interface HomePageProps {
  onNavigate: (page: 'home' | 'about' | 'contact') => void;
  onViewProperties: () => void;
  onViewProfile?: () => void;
}

export default function HomePage({ onNavigate, onViewProperties, onViewProfile }: HomePageProps) {
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
                <button
                  onClick={onViewProperties}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
                >
                  View Properties
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-200 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[#003A70] mb-4">Find the perfect<br />home for Rent</h1>
          <p className="text-[#003A70]/80 mb-8">We help you find the house which suitable for you.</p>
          <Button 
            onClick={onViewProperties}
            className="bg-[#003A70] text-white hover:bg-[#002A50] px-8 py-6"
          >
            View Properties
          </Button>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#003A70] text-center mb-12">Featured Properties</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500" 
                alt="Modern House" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-[#003A70] mb-2">Modern House</h3>
                <p className="text-[#003A70]/80">₹15,000/month</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500" 
                alt="Urban Villa" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-[#003A70] mb-2">Urban Villa</h3>
                <p className="text-[#003A70]/80">₹20,000/month</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500" 
                alt="Suburban Home" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-[#003A70] mb-2">Suburban Home</h3>
                <p className="text-[#003A70]/80">₹18,000/month</p>
              </div>
            </div>
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
