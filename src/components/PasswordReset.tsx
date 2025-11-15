import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logoImage from 'figma:asset/08609be9f7aed66b7ec1702a57ce46332566cfd1.png';

interface PasswordResetProps {
  onBack: () => void;
  onReset: (data: { fullName: string; mobile: string; email: string; newPassword: string }) => void;
}

export default function PasswordReset({ onBack, onReset }: PasswordResetProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    newPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReset(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          onClick={onBack}
          className="mb-4 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 border border-white/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full p-3">
              <img 
                src={logoImage} 
                alt="Rent For Nest Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-white text-center mb-6">Reset Your Password</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">Full Name</Label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-white/90 border-white/30"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">Mobile Number</Label>
              <Input
                required
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="bg-white/90 border-white/30"
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">Gmail Address</Label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/90 border-white/30"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">New Password</Label>
              <Input
                required
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="bg-white/90 border-white/30"
                placeholder="Create a new password"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-white text-orange-600 hover:bg-white/90 h-12 mt-6"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
