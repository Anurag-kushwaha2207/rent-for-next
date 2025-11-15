import { useState } from 'react';
import { ArrowLeft, Filter, MapPin, IndianRupee, Calendar, Users, Phone, Mail, Star, UserCheck, Navigation, Save, ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import type { PropertyListing } from './RentOutForm';
import skylineBgImage from 'figma:asset/8e2a65e22a91df665f0fa205bd4e9c38089506d7.png';

interface PropertyListingsProps {
  onBack: () => void;
  listings: PropertyListing[];
}

export default function PropertyListings({ onBack, listings }: PropertyListingsProps) {
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    city: '',
    area: '',
    road: '',
    pinCode: '',
    minRent: '',
    maxRent: '',
    minDuration: '',
    maxDuration: '',
  });



  const filteredListings = listings.filter(listing => {
    const matchesState = !filters.state || listing.state.toLowerCase().includes(filters.state.toLowerCase());
    const matchesDistrict = !filters.district || listing.district.toLowerCase().includes(filters.district.toLowerCase());
    const matchesCity = !filters.city || listing.city.toLowerCase().includes(filters.city.toLowerCase());
    const matchesArea = !filters.area || listing.area.toLowerCase().includes(filters.area.toLowerCase());
    const matchesRoad = !filters.road || listing.road.toLowerCase().includes(filters.road.toLowerCase());
    const matchesPinCode = !filters.pinCode || listing.pinCode.includes(filters.pinCode);
    const matchesMinRent = !filters.minRent || listing.monthlyRent >= parseFloat(filters.minRent);
    const matchesMaxRent = !filters.maxRent || listing.monthlyRent <= parseFloat(filters.maxRent);
    const matchesMinDuration = !filters.minDuration || listing.duration >= parseInt(filters.minDuration);
    const matchesMaxDuration = !filters.maxDuration || listing.duration <= parseInt(filters.maxDuration);

    return matchesState && matchesDistrict && matchesCity && matchesArea && matchesRoad && matchesPinCode &&
           matchesMinRent && matchesMaxRent && matchesMinDuration && matchesMaxDuration;
  });

  return (
    <div className="min-h-screen relative p-4">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${skylineBgImage})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/85 via-indigo-500/85 to-purple-600/85" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Button 
          onClick={onBack}
          className="mb-4 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 border border-white/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Filters */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-2xl mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-white" />
            <h3 className="text-white">Advanced Location Filter</h3>
          </div>
          
          {/* Location Hierarchy Filters */}
          <div className="space-y-4 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white mb-2 block flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  State
                </Label>
                <Input
                  value={filters.state}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., Maharashtra"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  District
                </Label>
                <Input
                  value={filters.district}
                  onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., Mumbai City"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  City
                </Label>
                <Input
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., Mumbai"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white mb-2 block flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Area/Locality
                </Label>
                <Input
                  value={filters.area}
                  onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., Andheri"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Road/Street
                </Label>
                <Input
                  value={filters.road}
                  onChange={(e) => setFilters({ ...filters, road: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., MG Road"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">PIN Code</Label>
                <Input
                  value={filters.pinCode}
                  onChange={(e) => setFilters({ ...filters, pinCode: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="e.g., 400001"
                  maxLength={6}
                />
              </div>
            </div>
          </div>

          {/* Price and Duration Filters */}
          <div className="border-t border-white/20 pt-4">
            <Label className="text-white mb-3 block">Price & Duration</Label>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label className="text-white/80 mb-2 block">Min Rent (₹)</Label>
                <Input
                  type="number"
                  value={filters.minRent}
                  onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="Min"
                />
              </div>

              <div>
                <Label className="text-white/80 mb-2 block">Max Rent (₹)</Label>
                <Input
                  type="number"
                  value={filters.maxRent}
                  onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="Max"
                />
              </div>

              <div>
                <Label className="text-white/80 mb-2 block">Min Duration</Label>
                <Input
                  type="number"
                  value={filters.minDuration}
                  onChange={(e) => setFilters({ ...filters, minDuration: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="Months"
                />
              </div>

              <div>
                <Label className="text-white/80 mb-2 block">Max Duration</Label>
                <Input
                  type="number"
                  value={filters.maxDuration}
                  onChange={(e) => setFilters({ ...filters, maxDuration: e.target.value })}
                  className="bg-white/90 border-white/30"
                  placeholder="Months"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              onClick={() => setFilters({
                state: '', district: '', city: '', area: '', road: '', pinCode: '',
                minRent: '', maxRent: '', minDuration: '', maxDuration: ''
              })}
              className="bg-white/20 text-white hover:bg-white/30 border border-white/30"
            >
              Clear All Filters
            </Button>
            
            <Button
              type="button"
              className="bg-green-500 text-white hover:bg-green-600 border-0 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-white mb-4">
          Found <strong>{filteredListings.length}</strong> properties matching your criteria
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="bg-white/95 backdrop-blur-lg border-white/30 overflow-hidden hover:shadow-2xl transition-shadow">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-48 bg-gray-200 cursor-pointer group">
                    {listing.photos.length > 0 ? (
                      <img 
                        src={listing.photos[0]} 
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDE5ODE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                        <p>Click to view details</p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Property Details</DialogTitle>
                    <DialogDescription>
                      Complete information about this property
                    </DialogDescription>
                  </DialogHeader>
                  
                  {/* Location Details */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-blue-900 mb-1">Location</h3>
                        <p className="text-sm"><strong>{listing.address}</strong></p>
                        <p className="text-sm">{listing.road}, {listing.area}</p>
                        <p className="text-sm">{listing.city}, {listing.district}</p>
                        <p className="text-sm">{listing.state} - {listing.pinCode}</p>
                        {listing.latitude && listing.longitude && (
                          <p className="text-xs text-blue-600 mt-1">
                            📍 Coordinates: {listing.latitude.toFixed(4)}, {listing.longitude.toFixed(4)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Property Photos */}
                    <div>
                      <h3 className="mb-3">Property Photos</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {listing.photos && listing.photos.length > 0 ? (
                          listing.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Property ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          ))
                        ) : (
                          <p className="col-span-2 text-center text-gray-500 py-8">
                            No photos available
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-green-600" />
                        <span>₹{listing.monthlyRent.toLocaleString()} / month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>{listing.duration} months</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span>For {listing.suitableFor} people</span>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="pt-3 border-t space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <a href={`tel:${listing.contactNumber}`} className="hover:underline text-blue-600">
                          {listing.contactNumber}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        <a href={`mailto:${listing.email}`} className="hover:underline text-blue-600">
                          {listing.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p><strong>{listing.address}</strong></p>
                    <p className="text-sm">{listing.road}, {listing.area}</p>
                    <p className="text-sm">{listing.city}, {listing.district}</p>
                    <p className="text-sm text-muted-foreground">{listing.state} - {listing.pinCode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                  <span>₹{listing.monthlyRent.toLocaleString()} / month</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>{listing.duration} months</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>Suitable for {listing.suitableFor} people</span>
                </div>

                {/* Previous Tenants Section */}
                {listing.previousTenants && listing.previousTenants.length > 0 && (
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      <span className="text-green-700">Previous Tenants</span>
                    </div>
                    <div className="space-y-2 bg-gray-50 rounded-lg p-2">
                      {listing.previousTenants.map((tenant, idx) => (
                        <div key={idx} className="text-sm">
                          <p><strong>{tenant.name}</strong></p>
                          <p className="text-muted-foreground text-xs">{tenant.duration}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(tenant.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${listing.contactNumber}`} className="hover:underline">
                      {listing.contactNumber}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${listing.email}`} className="hover:underline truncate">
                      {listing.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-12 border border-white/30 shadow-2xl text-center">
            <p className="text-white">No properties found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
