import { ArrowLeft, Plus, ImageIcon, Users as UsersIcon, Home, Phone, MapPin as MapPinIcon, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { PropertyListing, PastRoom } from './RentOutForm';

interface ProfileProps {
  onBack: () => void;
  onAddProperty: () => void;
  userListings: PropertyListing[];
  currentUser: string;
  onLogout: () => void;
}

interface CurrentTenant {
  name: string;
  age: number;
  occupation: string;
  contact: string;
  moveInDate: string;
}

export default function Profile({ onBack, onAddProperty, userListings, currentUser, onLogout }: ProfileProps) {
  // Mock current tenants data - in real app this would come from database
  const getCurrentTenants = (propertyId: string): CurrentTenant[] => {
    // This is mock data - replace with actual data from your backend
    return [
      {
        name: 'Rahul Sharma',
        age: 28,
        occupation: 'Software Engineer',
        contact: '+91 98765 43210',
        moveInDate: '2024-01-15'
      },
      {
        name: 'Priya Patel',
        age: 26,
        occupation: 'Teacher',
        contact: '+91 98765 43211',
        moveInDate: '2024-02-01'
      }
    ];
  };

  // Mock past rooms data - where this user previously lived as a tenant
  const myPastRooms: PastRoom[] = [
    {
      address: 'Flat 3B, Green Park Apartments, Sector 15, Noida, Uttar Pradesh - 201301',
      ownerName: 'Mr. Rajesh Kumar',
      ownerMobile: '+91 98765 12345',
      duration: '2 years (2020-2022)'
    },
    {
      address: 'Room 12, Silver Heights, MG Road, Gurgaon, Haryana - 122002',
      ownerName: 'Mrs. Sunita Sharma',
      ownerMobile: '+91 99887 65432',
      duration: '1.5 years (2018-2020)'
    }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1493134799591-2c9eed26201a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NjEwMTI1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080)',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/85 to-pink-900/90" />
      
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={onBack}
              className="bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 border border-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-white">My Properties</h1>
            <Button 
              onClick={onLogout}
              className="bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 border border-white/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Add Property Button */}
          <div className="mb-6">
            <Button
              onClick={onAddProperty}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 h-16"
            >
              <Plus className="w-6 h-6 mr-2" />
              Add New Property
            </Button>
          </div>

          {/* My Past Rooms Section */}
          {myPastRooms.length > 0 && (
            <Card className="bg-white/20 backdrop-blur-lg border-white/30 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-white" />
                <h2 className="text-white">My Past Rental History</h2>
              </div>
              <p className="text-white/80 text-sm mb-4">
                Places where I previously lived as a tenant
              </p>
              <div className="space-y-3">
                {myPastRooms.map((room, index) => (
                  <div key={index} className="bg-white/90 rounded-lg p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                      <p className="text-sm"><strong>Address:</strong> {room.address}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p><strong>Owner:</strong> {room.ownerName}</p>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-600" />
                        <a href={`tel:${room.ownerMobile}`} className="text-blue-600 hover:underline">
                          {room.ownerMobile}
                        </a>
                      </div>
                    </div>
                    {room.duration && (
                      <p className="text-sm text-muted-foreground"><strong>Duration:</strong> {room.duration}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Properties List */}
          <div className="space-y-4">
            {userListings.length === 0 ? (
              <Card className="bg-white/20 backdrop-blur-lg border-white/30 p-8 text-center">
                <p className="text-white">You haven't listed any properties yet.</p>
                <p className="text-white/70 mt-2">Click "Add New Property" to get started!</p>
              </Card>
            ) : (
              userListings.map((listing) => (
                <Card key={listing.id} className="bg-white/20 backdrop-blur-lg border-white/30 p-6">
                  <div className="space-y-4">
                    {/* Property Info */}
                    <div>
                      <h3 className="text-white mb-2">{listing.address}</h3>
                      <p className="text-white/80">
                        {listing.area}, {listing.city}, {listing.state} - {listing.pinCode}
                      </p>
                      <p className="text-white/80">₹{listing.monthlyRent}/month • {listing.duration} months</p>
                      <p className="text-white/80">Suitable for: {listing.suitableFor} people</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {/* View Photos Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-white/20 text-white hover:bg-white/30 border border-white/30">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            View Photos ({listing.photos?.length || 0})
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Property Photos</DialogTitle>
                            <DialogDescription>
                              View all uploaded photos for this property
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
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
                                No photos uploaded yet
                              </p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* View Current Tenants Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-white/20 text-white hover:bg-white/30 border border-white/30">
                            <UsersIcon className="w-4 h-4 mr-2" />
                            Current Tenants
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Current Tenants</DialogTitle>
                            <DialogDescription>
                              Details of all current tenants for this property
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            {getCurrentTenants(listing.id).map((tenant, index) => (
                              <Card key={index} className="p-4 bg-gray-50">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <p className="text-gray-600">Name</p>
                                    <p>{tenant.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Age</p>
                                    <p>{tenant.age} years</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Occupation</p>
                                    <p>{tenant.occupation}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Contact</p>
                                    <p>{tenant.contact}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-gray-600">Move-in Date</p>
                                    <p>{new Date(tenant.moveInDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </Card>
                            ))}
                            {getCurrentTenants(listing.id).length === 0 && (
                              <p className="text-center text-gray-500 py-8">
                                No current tenants
                              </p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Previous Tenants */}
                    {listing.previousTenants && listing.previousTenants.length > 0 && (
                      <div className="pt-4 border-t border-white/30">
                        <p className="text-white/80 mb-2">Previous Tenants:</p>
                        <div className="space-y-1">
                          {listing.previousTenants.map((tenant, index) => (
                            <p key={index} className="text-white/70">
                              {tenant.name} - {tenant.duration} (Rating: {tenant.rating}/5)
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
