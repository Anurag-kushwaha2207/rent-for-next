import { Home, TrendingUp, Users, Building2, User } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/08609be9f7aed66b7ec1702a57ce46332566cfd1.png';

interface DashboardProps {
  userName: string;
  onLookingFor: () => void;
  onViewHome?: () => void;
  onViewProfile?: () => void;
}

export default function Dashboard({ userName, onLookingFor, onViewHome, onViewProfile }: DashboardProps) {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1658757480952-8528c85c287f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBjaXR5JTIwc2t5bGluZSUyMG5pZ2h0fGVufDF8fHx8MTc2MjA3ODUzNHww&ixlib=rb-4.1.0&q=80&w=1080)'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/60 to-pink-900/70" />
      
      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Rent For Nest Logo" 
                className="w-14 h-14 object-contain bg-white rounded-lg p-2"
              />
              <div>
                <h1 className="text-white">Rent For Nest</h1>
              </div>
            </div>
            <div className="flex gap-2">
              {onViewHome && (
                <Button 
                  onClick={onViewHome}
                  className="bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 border border-white/30 px-3"
                >
                  <Home className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-white">Welcome,</p>
          <p className="text-white">{userName}!</p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70">Active Listings</p>
                <p className="text-white">1000+ Properties</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70">Happy Tenants</p>
                <p className="text-white">5000+ Users</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70">Cities Covered</p>
                <p className="text-white">50+ Cities</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Option - Find Rental */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLookingFor}
          className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-8 border border-white/30 shadow-2xl cursor-pointer transition-all relative overflow-hidden"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Home className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-white mb-2">I am looking for a rental home</h2>
            <p className="text-white/90">Browse available properties and find your nest</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
