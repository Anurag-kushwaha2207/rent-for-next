import { useState } from 'react';
import { ArrowLeft, Upload, X, Plus, Trash2, MapPin } from 'lucide-react';
import cityBgImage from 'figma:asset/2fef660c7f604af7045f1e6a4d9115d1cb5d5e95.png';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface RentOutFormProps {
  onBack: () => void;
  onSubmit: (data: PropertyListing) => void;
}

export interface PreviousTenant {
  name: string;
  duration: string;
  rating: number;
}

export interface PastRoom {
  address: string;
  ownerName: string;
  ownerMobile: string;
  duration: string;
}

export interface PropertyListing {
  id: string;
  photos: string[];
  address: string;
  road: string;
  area: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  latitude?: number;
  longitude?: number;
  monthlyRent: number;
  duration: number;
  suitableFor: number;
  contactNumber: string;
  email: string;
  ownerName: string;
  previousTenants: PreviousTenant[];
}

export default function RentOutForm({ onBack, onSubmit }: RentOutFormProps) {
  const [formData, setFormData] = useState({
    photos: [] as string[],
    address: '',
    road: '',
    area: '',
    city: '',
    district: '',
    state: '',
    pinCode: '',
    latitude: 0,
    longitude: 0,
    monthlyRent: '',
    duration: '',
    suitableFor: '',
    contactNumber: '',
    email: '',
  });

  const [previousTenants, setPreviousTenants] = useState<PreviousTenant[]>([]);
  const [newTenant, setNewTenant] = useState({ name: '', duration: '', rating: 5 });
  const [showMapPicker, setShowMapPicker] = useState(false);

  const [pastRooms, setPastRooms] = useState<PastRoom[]>([]);
  const [newPastRoom, setNewPastRoom] = useState({ 
    address: '', 
    ownerName: '', 
    ownerMobile: '', 
    duration: '' 
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const photoUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData({ ...formData, photos: [...formData.photos, ...photoUrls] });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  const addTenant = () => {
    if (newTenant.name && newTenant.duration) {
      setPreviousTenants([...previousTenants, newTenant]);
      setNewTenant({ name: '', duration: '', rating: 5 });
    }
  };

  const removeTenant = (index: number) => {
    setPreviousTenants(previousTenants.filter((_, i) => i !== index));
  };

  const addPastRoom = () => {
    if (newPastRoom.address && newPastRoom.ownerName && newPastRoom.ownerMobile) {
      setPastRooms([...pastRooms, newPastRoom]);
      setNewPastRoom({ address: '', ownerName: '', ownerMobile: '', duration: '' });
    }
  };

  const removePastRoom = (index: number) => {
    setPastRooms(pastRooms.filter((_, i) => i !== index));
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lat = 28.6139 - (y / rect.height) * 10; // Mock coordinates for India
    const lng = 77.2090 + (x / rect.width) * 10;
    setFormData({ ...formData, latitude: lat, longitude: lng });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listing: PropertyListing = {
      id: Date.now().toString(),
      photos: formData.photos,
      address: formData.address,
      road: formData.road,
      area: formData.area,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      pinCode: formData.pinCode,
      latitude: formData.latitude,
      longitude: formData.longitude,
      monthlyRent: parseFloat(formData.monthlyRent),
      duration: parseInt(formData.duration),
      suitableFor: parseInt(formData.suitableFor),
      contactNumber: formData.contactNumber,
      email: formData.email,
      ownerName: '',
      previousTenants: previousTenants,
    };
    onSubmit(listing);
  };

  return (
    <div className="min-h-screen relative p-4">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cityBgImage})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/90 via-pink-500/90 to-purple-600/90" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <Button 
          onClick={onBack}
          className="mb-4 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 border border-white/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-2xl">
          <h2 className="text-white text-center mb-6">List Your Property</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo Upload */}
            <div>
              <Label className="text-white mb-2 block">Upload Photos</Label>
              <div className="bg-white/90 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label 
                  htmlFor="photo-upload"
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="w-5 h-5" />
                  <span>Click to upload photos</span>
                </label>
                
                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={photo} 
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white/10 rounded-xl p-4 border border-white/20 space-y-4">
              <h3 className="text-white">Property Location Details</h3>
              
              <div>
                <Label className="text-white mb-2 block">House/Building Number & Name</Label>
                <Input
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., House No. 123, Sunshine Apartments"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Road/Street Name</Label>
                <Input
                  required
                  value={formData.road}
                  onChange={(e) => setFormData({ ...formData, road: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., MG Road, Park Street"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Area/Locality</Label>
                  <Input
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="bg-white/90 border-white/30"
                    placeholder="e.g., Koramangala, Indiranagar"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">City</Label>
                  <Input
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-white/90 border-white/30"
                    placeholder="e.g., Mumbai, Delhi"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">District</Label>
                  <Input
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="bg-white/90 border-white/30"
                    placeholder="e.g., Mumbai City, New Delhi"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">State</Label>
                  <Input
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="bg-white/90 border-white/30"
                    placeholder="e.g., Maharashtra, Delhi"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">PIN Code</Label>
                <Input
                  required
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., 400001"
                  maxLength={6}
                />
              </div>

              {/* Map Location Picker */}
              <div>
                <Label className="text-white mb-2 block">Mark Location on Map (Optional)</Label>
                <Button
                  type="button"
                  onClick={() => setShowMapPicker(!showMapPicker)}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {showMapPicker ? 'Hide Map' : 'Show Map'}
                </Button>
                
                {showMapPicker && (
                  <div className="mt-3 bg-white/90 rounded-lg p-3">
                    <p className="text-sm mb-2">Click on the map to mark your property location</p>
                    <div 
                      onClick={handleMapClick}
                      className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg cursor-crosshair relative border-2 border-blue-400 overflow-hidden"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px)'
                      }}
                    >
                      {/* Mock map grid */}
                      {formData.latitude !== 0 && formData.longitude !== 0 && (
                        <div 
                          className="absolute w-6 h-6 -ml-3 -mt-6"
                          style={{
                            left: `${((formData.longitude - 77.2090) / 10) * 100}%`,
                            top: `${((28.6139 - formData.latitude) / 10) * 100}%`
                          }}
                        >
                          <MapPin className="w-6 h-6 text-red-600 fill-red-500" />
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs">
                        Click to mark location
                      </div>
                    </div>
                    {formData.latitude !== 0 && (
                      <p className="text-sm mt-2 text-green-700">
                        ✓ Location marked: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Monthly Rent (₹)</Label>
                <Input
                  required
                  type="number"
                  value={formData.monthlyRent}
                  onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="Enter rent amount"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Duration (months)</Label>
                <Input
                  required
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="Enter duration"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Suitable for (Number of People)</Label>
              <Input
                required
                type="number"
                value={formData.suitableFor}
                onChange={(e) => setFormData({ ...formData, suitableFor: e.target.value })}
                className="bg-white/90 border-white/30"
                placeholder="How many people can stay?"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">Contact Number</Label>
              <Input
                required
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="bg-white/90 border-white/30"
                placeholder="Enter contact number"
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
                placeholder="Enter email"
              />
            </div>

            {/* Our Past Rooms Section */}
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <Label className="text-white mb-3 block">Our Past Rooms (Optional)</Label>
              <p className="text-white/80 text-sm mb-4">Add details of rooms/houses where you previously lived</p>
              
              {pastRooms.length > 0 && (
                <div className="space-y-2 mb-4">
                  {pastRooms.map((room, index) => (
                    <div key={index} className="bg-white/90 rounded-lg p-3 flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm"><strong>Address:</strong> {room.address}</p>
                        <p className="text-sm text-muted-foreground"><strong>Owner:</strong> {room.ownerName}</p>
                        <p className="text-sm text-muted-foreground"><strong>Mobile:</strong> {room.ownerMobile}</p>
                        {room.duration && <p className="text-sm text-muted-foreground"><strong>Duration:</strong> {room.duration}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removePastRoom(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3 bg-white/90 rounded-lg p-3">
                <div>
                  <Label className="text-foreground mb-2 block">Full Address</Label>
                  <Textarea
                    value={newPastRoom.address}
                    onChange={(e) => setNewPastRoom({ ...newPastRoom, address: e.target.value })}
                    placeholder="Enter complete address of your past room"
                    className="bg-white"
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Owner/Landlord Name</Label>
                  <Input
                    value={newPastRoom.ownerName}
                    onChange={(e) => setNewPastRoom({ ...newPastRoom, ownerName: e.target.value })}
                    placeholder="Owner's name"
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Owner's Mobile Number</Label>
                  <Input
                    type="tel"
                    value={newPastRoom.ownerMobile}
                    onChange={(e) => setNewPastRoom({ ...newPastRoom, ownerMobile: e.target.value })}
                    placeholder="Mobile number"
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Duration (Optional)</Label>
                  <Input
                    value={newPastRoom.duration}
                    onChange={(e) => setNewPastRoom({ ...newPastRoom, duration: e.target.value })}
                    placeholder="e.g., 2 years, 6 months"
                    className="bg-white"
                  />
                </div>
                <Button
                  type="button"
                  onClick={addPastRoom}
                  className="w-full bg-green-500 text-white hover:bg-green-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Past Room
                </Button>
              </div>
            </div>

            {/* Previous Tenants Section */}
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <Label className="text-white mb-3 block">Previous Tenants (Optional)</Label>
              
              {previousTenants.length > 0 && (
                <div className="space-y-2 mb-4">
                  {previousTenants.map((tenant, index) => (
                    <div key={index} className="bg-white/90 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex-1">
                        <p><strong>{tenant.name}</strong></p>
                        <p className="text-muted-foreground">Stayed for: {tenant.duration}</p>
                        <p className="text-yellow-600">Rating: {'⭐'.repeat(tenant.rating)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTenant(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3 bg-white/90 rounded-lg p-3">
                <Input
                  value={newTenant.name}
                  onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                  placeholder="Tenant name"
                  className="bg-white"
                />
                <Input
                  value={newTenant.duration}
                  onChange={(e) => setNewTenant({ ...newTenant, duration: e.target.value })}
                  placeholder="Stay duration (e.g., 2 years)"
                  className="bg-white"
                />
                <div>
                  <Label className="text-foreground mb-2 block">Rating</Label>
                  <select
                    value={newTenant.rating}
                    onChange={(e) => setNewTenant({ ...newTenant, rating: parseInt(e.target.value) })}
                    className="w-full p-2 rounded-lg border"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ Good</option>
                    <option value={3}>⭐⭐⭐ Average</option>
                    <option value={2}>⭐⭐ Below Average</option>
                    <option value={1}>⭐ Poor</option>
                  </select>
                </div>
                <Button
                  type="button"
                  onClick={addTenant}
                  className="w-full bg-green-500 text-white hover:bg-green-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Previous Tenant
                </Button>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-white text-orange-600 hover:bg-white/90 h-12 mt-6"
            >
              Publish Listing
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
