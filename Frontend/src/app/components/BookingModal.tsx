import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { submitConsultationBooking } from '../../api/publicContentApi';

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
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

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

    if (!agreedToPolicy) {
      alert('Please agree to the Terms & Conditions and Privacy Policy to proceed.');
      return;
    }

    // Prepare payload with the dynamic reason and astrologer
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      services: formData.services,
      otherService: formData.otherService,
      date: formData.date,
      time: formData.time,
      message: `${formData.message ? formData.message + ' | ' : ''}Reason: ${reason || 'General Inquiry'}`,
      astrologerName: astrologerName || 'Any Available Astrologer',
      source: 'booking_modal',
    };
    try {
      await submitConsultationBooking(payload);
    } catch (error) {
      console.warn('Booking API dispatch warning:', error);
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
      <DialogContent className="sm:max-w-[550px] bg-ivory-50 border border-gold-500/40 rounded-3xl p-0 overflow-hidden max-h-[90vh] flex flex-col shadow-2xl">
        <DialogHeader className="bg-cosmic-900 text-white p-6 border-b border-gold-500/30 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-[0.22em] text-gold-400 font-semibold">BHAGYANETRAM</span>
          </div>
          <DialogTitle className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <span>🕉️</span>
            Book Your Consultation
          </DialogTitle>
          <DialogDescription className="text-ivory-200/80 text-xs sm:text-sm mt-1">
            First Time Users: Claim your complimentary 15-minute consultation with India's verified Vedic astrologers.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Dynamic Context Banner */}
          {(astrologerName || reason) && (
            <div className="bg-gold-500/15 p-3 rounded-xl text-sm border border-gold-500/30 space-y-1 text-cosmic-900 font-medium">
              {astrologerName && (
                <div className="flex items-center gap-2 text-gold-700 font-bold">
                  <User className="w-4 h-4 text-gold-600" />
                  <span>Selected Astrologer: {astrologerName}</span>
                </div>
              )}
              {reason && !astrologerName && (
                <div className="flex items-center gap-2 text-cosmic-900">
                  <span className="text-xs uppercase tracking-wider text-gold-700 font-semibold">Topic:</span>
                  <span>{reason}</span>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-cosmic-900 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold-600" />
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-white border-gold-500/35 text-cosmic-900 text-sm focus:border-gold-600 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-cosmic-900 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold-600" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white border-gold-500/35 text-cosmic-900 text-sm focus:border-gold-600 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-cosmic-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  Phone / WhatsApp *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-white border-gold-500/35 text-cosmic-900 text-sm focus:border-gold-600 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-cosmic-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-gold-600" />
                Services Required * <span className="text-[11px] text-cosmic-700/70 font-normal">(Select multiple)</span>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_SERVICES.map((service) => {
                  const isSelected = formData.services.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-2.5 border rounded-xl cursor-pointer text-xs sm:text-sm text-center transition-all duration-200 select-none font-medium
                        ${isSelected 
                          ? 'bg-cosmic-900 text-gold-300 border-gold-500 shadow-sm' 
                          : 'bg-white border-gold-500/30 hover:border-gold-500/60 hover:bg-gold-500/5 text-cosmic-900'
                        }`}
                    >
                      {service.label}
                    </div>
                  );
                })}
              </div>
              
              {formData.services.includes('other') && (
                <div className="space-y-1.5 mt-2 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="otherService" className="text-xs font-semibold text-cosmic-800">
                    Please specify the service *
                  </Label>
                  <Input
                    id="otherService"
                    placeholder="E.g., Numerology, Tarot Reading..."
                    value={formData.otherService}
                    onChange={(e) => setFormData({ ...formData, otherService: e.target.value })}
                    required={formData.services.includes('other')}
                    className="bg-white border-gold-500/35 text-cosmic-900 text-sm focus:border-gold-600 rounded-xl"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-cosmic-900 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-600" />
                  Preferred Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-white border-gold-500/35 text-cosmic-900 text-sm focus:border-gold-600 rounded-xl"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="time" className="text-xs font-bold uppercase tracking-wider text-cosmic-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-600" />
                  Preferred Time
                </Label>
                <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                  <SelectTrigger className="bg-white border-gold-500/35 text-cosmic-900 text-sm focus:border-gold-600 rounded-xl">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gold-500/35">
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                    <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                    <SelectItem value="night">Night (7 PM - 10 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-cosmic-900">
                Your Question / Concern
              </Label>
              <Textarea
                id="message"
                placeholder="Share your concerns, birth details, or specific questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={2}
                className="bg-white border-gold-500/35 text-cosmic-900 text-sm focus:border-gold-600 rounded-xl"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="booking-agree-policy"
                required
                checked={agreedToPolicy}
                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gold-500/50 text-gold-600 focus:ring-gold-500 cursor-pointer accent-gold-600"
              />
              <label htmlFor="booking-agree-policy" className="text-xs text-cosmic-800 leading-snug cursor-pointer select-none">
                I agree to the{' '}
                <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold-700 underline font-semibold hover:text-gold-800">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              className="w-full gold-btn font-bold text-sm sm:text-base py-3.5 rounded-xl shadow-md cursor-pointer mt-2"
            >
              Confirm Request • FREE 15 Minutes
            </button>

            <div className="pt-2 flex items-center justify-center gap-4 text-xs text-cosmic-800/75">
              <span>📞 +91 79057 55326</span>
              <span>•</span>
              <span>100% Confidential</span>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}