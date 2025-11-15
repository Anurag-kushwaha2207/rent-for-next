import { Button } from './ui/button';
import patternBg from 'figma:asset/5ebe9b27d6f3231b023229fa7fe5dcabc2bc50ba.png';
import logoImage from 'figma:asset/08609be9f7aed66b7ec1702a57ce46332566cfd1.png';

interface LandingPageProps {
  onSignUp: () => void;
  onLogin: () => void;
}

export default function LandingPage({ onSignUp, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${patternBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white backdrop-blur-lg rounded-full mb-4 border border-white/30 p-3">
            <img 
              src={logoImage} 
              alt="Rent For Nest Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-white mb-3">Rent For Nest</h1>
          <p className="text-white/90 italic">Find your perfect home, or rent out with ease</p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-2xl">
          <h2 className="text-white text-center mb-6">Are you a new user?</h2>
          
          <div className="space-y-4">
            <Button 
              onClick={onSignUp}
              className="w-full bg-white text-purple-600 hover:bg-white/90 h-12"
            >
              Sign Up
            </Button>
            
            <Button 
              onClick={onLogin}
              className="w-full bg-purple-600 text-white hover:bg-purple-700 h-12 border-2 border-white/30"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
