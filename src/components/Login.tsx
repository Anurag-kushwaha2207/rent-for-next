import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logoImage from 'figma:asset/08609be9f7aed66b7ec1702a57ce46332566cfd1.png';

interface LoginProps {
  onBack: () => void;
  onLogin: (mobile: string, password: string) => void;
  onForgotPassword: () => void;
}

export default function Login({ onBack, onLogin, onForgotPassword }: LoginProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(mobile, password);
  };

  return (
    <div className="min-h-screen bg-[#003A70] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logoImage} 
            alt="Rent For Nest Logo" 
            className="w-24 h-24 object-contain bg-white rounded-2xl p-4 shadow-lg"
          />
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-[#003A70] text-center mb-2">User Login</h1>
          <p className="text-[#003A70] text-center mb-8">
            Enter your credentials to<br />access your account.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                required
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="bg-white border-0 h-12 rounded-lg px-4"
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>

            <div>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-0 h-12 rounded-lg px-4"
                placeholder="Password"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-[#003A70] text-white hover:bg-[#002A50] h-14 rounded-lg uppercase tracking-wider mt-6"
            >
              Login
            </Button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[#003A70] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
