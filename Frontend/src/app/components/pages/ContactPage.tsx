import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you within 24 hours to schedule your consultation.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: '+91 79057 55326',
      subdetails: 'Mon-Sat: 9 AM - 7 PM',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'contact@bhagyanetram.com',
      subdetails: 'We reply within 24 hours',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: 'Prayagraj, India',
      subdetails: 'Consultations available online',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      details: 'Mon - Sat: 9:00 AM - 9:00 PM',
      subdetails: 'Sunday: By Appointment',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={logoImage} 
                alt="Bhagyanetram Logo" 
                className="w-20 h-20 object-contain mx-auto mb-6"
              />
              <h1 className="text-4xl md:text-6xl mb-6 text-foreground">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Ready to transform your life with Vedic wisdom? Get in touch with us for personalized astrology and Vastu consultations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center border-border hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                      {info.icon}
                    </div>
                    <h3 className="text-lg mb-2 text-foreground">{info.title}</h3>
                    <p className="text-muted-foreground mb-1">{info.details}</p>
                    <p className="text-sm text-muted-foreground/70">{info.subdetails}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form below and our expert will get back to you within 24 hours to schedule your personalized consultation.
                </p>
              </div>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                        className="mt-1.5 border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="mt-1.5 border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 79057 55326"
                        required
                        className="mt-1.5 border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-foreground">Service Required *</Label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        required
                        className="mt-1.5 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a service</option>
                        <option value="birth-chart">Birth Chart Reading</option>
                        <option value="vastu">Vastu Consultation</option>
                        <option value="marriage">Marriage/Relationship Compatibility</option>
                        <option value="career">Career Guidance</option>
                        <option value="health">Health & Wellness</option>
                        <option value="remedies">Remedial Solutions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-foreground">Your Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please share your birth details (date, time, place) or specific questions..."
                        required
                        rows={5}
                        className="mt-1.5 border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Send className="mr-2 w-5 h-5" />
                      Send Message
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Your information is confidential and will be used only for consultation purposes.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Why Contact Us */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
                  Why Choose Us?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Experience the difference of authentic, personalized astrological guidance.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {[
                  {
                    title: 'Expert Consultation',
                    description: '15+ years of experience in Vedic Astrology and Vastu Shastra with thousands of satisfied clients.',
                  },
                  {
                    title: 'Personalized Approach',
                    description: 'Every consultation is tailored to your unique birth chart and specific life circumstances.',
                  },
                  {
                    title: 'Practical Solutions',
                    description: 'Get actionable remedies and guidance that work in modern life without major lifestyle changes.',
                  },
                  {
                    title: 'Complete Confidentiality',
                    description: 'Your personal information and consultation details remain completely private and secure.',
                  },
                  {
                    title: 'Follow-up Support',
                    description: 'Ongoing guidance and support to help you implement recommendations effectively.',
                  },
                  {
                    title: 'Online & Offline',
                    description: 'Convenient consultation options via phone, video call, or in-person meetings.',
                  },
                ].map((item, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="pt-4">
                      <h3 className="text-lg mb-2 text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl mb-2 text-foreground">Quick Response</h3>
                  <p className="text-muted-foreground mb-4">
                    We typically respond within 24 hours to schedule your consultation at a convenient time.
                  </p>
                  <Button
                    onClick={() => window.open('https://wa.me/917905755326', '_blank')}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    WhatsApp Us Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Common questions about our consultation process
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What information do I need for a consultation?',
                a: 'For accurate astrological analysis, please provide your exact date of birth, time of birth (as accurate as possible), and place of birth. For Vastu consultations, floor plans or property details are helpful.',
              },
              {
                q: 'How long does a consultation take?',
                a: 'Initial consultations typically last 45-60 minutes. Follow-up sessions are usually 30 minutes. We ensure adequate time to address all your concerns.',
              },
              {
                q: 'Are consultations available online?',
                a: 'Yes! We offer video consultations via Zoom, Google Meet, or phone calls for your convenience, in addition to in-person meetings.',
              },
              {
                q: 'Do you provide written reports?',
                a: 'Yes, after the consultation you will receive a detailed written summary with key findings, predictions, and recommended remedies.',
              },
            ].map((faq, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg mb-2 text-foreground">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
