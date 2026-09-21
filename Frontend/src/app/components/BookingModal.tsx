import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason?: string;
  astrologerName?: string | null;
}

const AVAILABLE_SERVICES = [
  { id: 'horoscope', label: 'Horoscope Reading' },
  { id: 'birth-chart', label: 'Birth Chart Analysis' },
  { id: 'vastu-home', label: 'Vastu for Home' },
  { id: 'vastu-office', label: 'Vastu for Office' },
  { id: 'compatibility', label: 'Relationship Compatibility' },
  { id: 'career', label: 'Career Guidance' },
  { id: 'gemstone', label: 'Gemstone Consultation' },
  { id: 'other', label: 'Other' },
];

export function BookingModal({ open, onOpenChange, reason, astrologerName }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
    otherService: '',
    date: '',
    time: '',
    message: '',
  });

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      const isSelected = prev.services.includes(serviceId);
      
      const newOtherService = (serviceId === 'other' && isSelected) ? '' : prev.otherService;

      return {
        ...prev,
        otherService: newOtherService,
        services: isSelected
          ? prev.services.filter((id) => id !== serviceId)
          : [...prev.services, serviceId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.services.length === 0) {
      alert('Please select at least one service.');
      return;
    }

    // Prepare payload with the dynamic reason and astrologer
    const payload = {
      ...formData,
      bookingReason: reason || 'General Inquiry',
      astrologerName: astrologerName || 'Any Available Astrologer'
    };
    // TODO: Send this payload to your backend API here
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Booking submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your request. Please try again.');
    }
    
    alert(`Thank you ${formData.name}! Your request has been received. We'll contact you shortly.`);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      services: [],
      otherService: '',
      date: '',
      time: '',
      message: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary flex items-center gap-2">
            <span className="text-3xl">🕉️</span>
            Book Your Consultation
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in your details and we'll get back to you within 24 hours to schedule your personalized session.
          </DialogDescription>
        </DialogHeader>

        {/* Dynamic Context Banner */}
        <div className="bg-primary/5 p-3 rounded-md text-sm mb-2 border border-primary/20 space-y-1">
          {astrologerName && (
            <div className="flex items-center gap-2 text-primary font-medium">
              <User className="w-4 h-4" />
              <span>Selected Astrologer: {astrologerName}</span>
            </div>
          )}
          {reason && !astrologerName && (
             <div className="flex items-center gap-2 text-primary">
               <span>Booking Source: {reason}</span>
             </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="border-primary/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="border-primary/20"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Services Required * <span className="text-xs text-muted-foreground font-normal">(Select multiple)</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_SERVICES.map((service) => {
                const isSelected = formData.services.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-2.5 border rounded-md cursor-pointer text-sm text-center transition-all duration-200 select-none
                      ${isSelected 
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                        : 'border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-foreground'
                      }`}
                  >
                    {service.label}
                  </div>
                );
              })}
            </div>
            
            {formData.services.includes('other') && (
              <div className="space-y-2 mt-3 animate-in fade-in slide-in-from-top-2">
                <Label htmlFor="otherService" className="text-sm">
                  Please specify the service *
                </Label>
                <Input
                  id="otherService"
                  placeholder="E.g., Numerology, Tarot Reading..."
                  value={formData.otherService}
                  onChange={(e) => setFormData({ ...formData, otherService: e.target.value })}
                  required={formData.services.includes('other')}
                  className="border-primary/20"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Preferred Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-primary/20"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Preferred Time
              </Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                  <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your concerns or questions..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border-primary/20 min-h-[80px]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 spiritual-gradient text-card">
              Submit Request
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-primary/20"
            >
              Cancel
            </Button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-2">
          <span className="text-primary">🔒</span> Your information is secure and will not be shared with third parties.
        </p>
      </DialogContent>
    </Dialog>
  );
}