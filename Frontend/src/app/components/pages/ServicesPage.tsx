import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Star, Heart, Gem, Users, TrendingUp, BookOpen, Phone, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function ServicesPage() {
  // Use React Router's navigation hook instead of state-based props
  const navigate = useNavigate();

  const services = [
    {
      icon: <Star className="w-12 h-12 text-primary" />,
      title: 'Personalized Birth Chart Reading',
      description: 'Comprehensive analysis of your natal chart revealing your life purpose, strengths, challenges, and karmic patterns.',
      features: ['Complete chart analysis', 'Planetary positions', 'House interpretations', 'Dasha predictions'],
      price: '₹2,999',
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: 'Kundli Matching',
      description: 'Traditional horoscope matching for marriage compatibility using the ancient Ashtakoota method.',
      features: ['36-point matching', 'Mangal Dosha analysis', 'Compatibility report', 'Remedial solutions'],
      price: '₹1,999',
    },
    {
      icon: <Gem className="w-12 h-12 text-[#d4af37]" />,
      title: 'Gemstone Consultation',
      description: 'Discover the perfect gemstones to enhance positive planetary influences and neutralize negative effects.',
      features: ['Planetary gemstone recommendation', 'Wearing instructions', 'Alternative options', 'Mantras'],
      price: '₹999',
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-600" />,
      title: 'Career & Business Astrology',
      description: 'Navigate your professional path with cosmic guidance for career decisions and business ventures.',
      features: ['Career timing', 'Business muhurat', 'Partnership compatibility', 'Financial forecasting'],
      price: '₹3,499',
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: 'Relationship Counseling',
      description: 'Astrological insights into your relationships, helping you understand compatibility and resolve conflicts.',
      features: ['Compatibility analysis', 'Timing for marriage', 'Relationship remedies', 'Communication tips'],
      price: '₹2,499',
    },
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: 'Numerology Reading',
      description: 'Unlock the secrets hidden in your numbers - birth date, name, and destiny numbers.',
      features: ['Life path number', 'Destiny number', 'Soul urge analysis', 'Lucky numbers & dates'],
      price: '₹1,499',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Unique SEO Tags for this specific route */}
      <Helmet>
        <title>Our Astrology & Vastu Services | Bhagyanetram</title>
        <meta name="description" content="Explore our professional Vedic astrology services including Birth Chart Reading, Kundli Matching, Gemstone Consultation, and Career Astrology." />
        <link rel="canonical" href="https://bhagyanetram.com/services" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 celestial-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Star className="w-16 h-16 mx-auto mb-6 animate-glow" />
            <h1 className="text-5xl mb-6">Our Astrology Services</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Transform your life with personalized astrological guidance and cosmic wisdom
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-primary/20 hover:shadow-xl transition-all hover:border-primary/40">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t pt-4">
                      <p className="text-2xl text-primary mb-4">
                        {service.price}
                      </p>
                      {/* Navigate directly to the /contact route */}
                      <Button onClick={() => navigate('/contact')} className="w-full bg-primary">
                        <Phone className="w-4 h-4 mr-2" />
                        Book Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 celestial-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-12 text-primary">Why Choose Cosmic Vastu?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-primary/20 text-center">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl mb-3 text-primary">15+ Years Experience</h3>
                <p className="text-muted-foreground">
                  Trusted by thousands of clients for accurate predictions and life-changing guidance
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 text-center">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl mb-3 text-primary">Vedic Expertise</h3>
                <p className="text-muted-foreground">
                  Deep knowledge of Vedic astrology, Vastu Shastra, and ancient Indian wisdom
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 text-center">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl mb-3 text-primary">100% Confidential</h3>
                <p className="text-muted-foreground">
                  Your privacy is our priority. All consultations are completely confidential
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 text-white/90">
            Book your personalized consultation today and unlock the secrets of your cosmic blueprint
          </p>
          {/* Navigate directly to the /contact route */}
          <Button
            onClick={() => navigate('/contact')}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
          >
            <Phone className="mr-2" />
            Schedule Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}