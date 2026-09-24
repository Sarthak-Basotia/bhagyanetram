import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { BookingModal } from './BookingModal';
import {
  Star,
  Phone,
  MessageCircle,
  Calendar,
  FileText,
  Heart,
  Briefcase,
  Home,
  Users,
  TrendingUp,
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  Play,
  ArrowRight,
  Mail,
} from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from '/src/app/components/figma/d5457f2df4c5864ece0203437258a94768a0cf00.png';
import nidhiJi from '/src/assets/Nidhi-Ji.png';
import panditPranav from '/src/assets/Pandit-Pranav.jpeg';

export function HomePage() {
  const navigate = useNavigate();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingReason, setBookingReason] = useState('');
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);

  const handleOpenBooking = (reason, astrologerName = null) => {
    setBookingReason(reason);
    setSelectedAstrologer(astrologerName);
    setBookingModalOpen(true);
  };

  const quickActions = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Talk to Astrologer',
      subtitle: 'Get instant guidance',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Chat with Astrologer',
      subtitle: 'Ask your questions',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Free Kundli',
      subtitle: 'Generate birth chart',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Daily Horoscope',
      subtitle: 'Know your day',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const topAstrologers = [
    {
      name: 'Pandit Pranav',
      image: panditPranav,
      specialization: 'Vedic Astrology, Vastu',
      experience: '10 Years',
      languages: 'Hindi, English',
      rating: 4.9,
      reviews: 2847,
      available: true,
    },
    {
      name: 'Nidhi Ji',
      image: nidhiJi,
      specialization: 'Vedic Astrology, Vastu',
      experience: '7 Years',
      languages: 'Hindi, English',
      rating: 4.9,
      reviews: 3156,
      available: false,
    },
  ];

  const freeServices = [
    { title: 'Match Making', image: 'https://images.unsplash.com/photo-1756376748107-12c98ec6b969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Check compatibility for marriage' },
    { title: 'Panchang', image: 'https://images.unsplash.com/photo-1701520985505-5ebb240c58cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Daily auspicious timings' },
    { title: 'Tarot Reading', image: 'https://images.unsplash.com/photo-1624274579716-8eeba7da39bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Card-based predictions' },
    { title: 'Birth Chart', image: 'https://images.unsplash.com/photo-1646208714721-ebce8335cc88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Complete natal chart analysis' },
    { title: 'Palmistry', image: 'https://images.unsplash.com/photo-1759406066833-d361c4f76bf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Hand reading insights' },
    { title: 'Numerology', image: 'https://images.unsplash.com/photo-1617086286680-12fa90d99f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Number-based predictions' },
    { title: 'Gemstone Guide', image: 'https://images.unsplash.com/photo-1594997987903-1d322eae8ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Lucky stones for you' },
    { title: 'Planet Transit', image: 'https://images.unsplash.com/photo-1676236285859-a2907b80f927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Current planetary positions' },
    { title: 'Vastu Tips', image: 'https://images.unsplash.com/photo-1711011476848-7bad9f04379c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Home harmony solutions' },
    { title: 'Zodiac Signs', image: 'https://images.unsplash.com/photo-1614089254151-676cc373b01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Know your sun sign traits' },
    { title: 'Festivals', image: 'https://images.unsplash.com/photo-1674936985746-1993297aad5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Upcoming Hindu festivals' },
    { title: 'Yantra Meditation', image: 'https://images.unsplash.com/photo-1758466870973-14bfedd22e1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', description: 'Sacred geometry for peace' },
  ];

  const categories = [
    { icon: <Heart className="w-8 h-8" />, title: 'Love & Relationship', consultations: '15,847', image: 'https://images.unsplash.com/photo-1756376748107-12c98ec6b969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
    { icon: <Users className="w-8 h-8" />, title: 'Marriage & Kundli', consultations: '12,563', image: 'https://images.unsplash.com/photo-1711011476848-7bad9f04379c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
    { icon: <Briefcase className="w-8 h-8" />, title: 'Career Guidance', consultations: '18,234', image: 'https://images.unsplash.com/photo-1578433805614-747d066afebe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Business & Finance', consultations: '9,876', image: 'https://images.unsplash.com/photo-1617086286680-12fa90d99f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
    { icon: <Home className="w-8 h-8" />, title: 'Vastu Consultation', consultations: '14,329', image: 'https://images.unsplash.com/photo-1594997987903-1d322eae8ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
    { icon: <Star className="w-8 h-8" />, title: 'Spiritual Guidance', consultations: '11,092', image: 'https://images.unsplash.com/photo-1724833377978-ed06f4d478cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
  ];

  const testimonials = [
    { name: 'Meera Singh', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', text: 'The Vastu consultation changed my life completely. Within 3 months of implementing the suggestions, my business started flourishing and family relationships improved dramatically.', rating: 5, date: '2 days ago' },
    { name: 'Amit Patel', location: 'Ahmedabad', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', text: 'Dr. Sharma\'s birth chart reading was incredibly accurate. The remedies he suggested for my career have shown results faster than I expected. Highly recommend!', rating: 5, date: '5 days ago' },
    { name: 'Kavita Reddy', location: 'Bangalore', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', text: 'I was skeptical at first, but the predictions about my relationship were spot on. The guidance helped me make the right decision. Forever grateful!', rating: 5, date: '1 week ago' },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Bhagyanetram | India's Most Trusted Astrology Platform</title>
        <meta name="description" content="Get instant guidance from India's top astrologers. Talk to experts in Vedic Astrology, Tarot, Numerology, and Vastu Shastra for personalized life solutions." />
        <link rel="canonical" href="https://bhagyanetram.com/" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1614089254151-676cc373b01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary text-white px-4 py-1.5">
                🎯 India's Most Trusted Astrology Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl mb-6 text-foreground leading-tight">
                Confused About Your
                <span className="text-primary block mt-2">Life Decisions?</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Get instant guidance from India's top astrologers. Talk to experts in Vedic Astrology, Tarot, Numerology, and Vastu Shastra.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => handleOpenBooking('Hero Banner - Get FREE Consultation')}
                  className="bg-primary hover:bg-primary/90 text-white px-8 text-lg h-14"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Get FREE Consultation
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate('/about')}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 px-8 text-lg h-14"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch How It Works
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">10,000+ Happy Clients</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg">4.9/5</span>
                  <span className="text-sm text-muted-foreground">(5,847 reviews)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1709906602242-e1d35fc553b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Professional Astrologer"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={"src/assets/d5457f2df4c5864ece0203437258a94768a0cf00.png"} 
                      alt="Bhagyanetram" 
                      className="w-12 h-12 brightness-100 rounded-md"
                    />
                    <div>
                      <h3 className="text-2xl">Bhagyanetram</h3>
                      <p className="text-sm text-white/80">Your Life's Guiding Light</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-xl transition-all border-border group overflow-hidden">
                  <div className={`h-1.5 bg-gradient-to-r ${action.gradient}`} />
                  <CardContent className="pt-6 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <h3 className="text-lg mb-1 text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Online Astrologers */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl mb-4 text-foreground">
                Top Online Astrologers
              </h2>
              <p className="text-lg text-muted-foreground">
                Connect with certified experts for personalized guidance
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8">
            {topAstrologers.map((astrologer, index) => (
              <motion.div
                key={index}
                className="w-full md:w-[350px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-2xl transition-all border-border overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={astrologer.image}
                      alt={astrologer.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{astrologer.rating}</span>
                            <span className="text-xs text-muted-foreground">({astrologer.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl mb-2 text-foreground">{astrologer.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{astrologer.specialization}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{astrologer.experience} Experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{astrologer.languages}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleOpenBooking('Consultation Request', astrologer.name)}
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      <Phone className="mr-2 w-4 h-4" />
                      Consult Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl mb-4 text-foreground">
                Bhagyanetram Provides Comprehensive And
              </h2>
              <h2 className="text-3xl md:text-5xl mb-6 text-primary">
                All-Inclusive Astrology Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Some of the services we provide are:
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Free Kundli */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all h-full bg-gradient-to-br from-orange-50 to-yellow-50">
                <div className="relative h-56 overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-8">
                    <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-lg border-4 border-white/30 p-4">
                      <div className="grid grid-cols-4 grid-rows-3 gap-1 h-full">
                        {[12, 1, 2, 3, 11, '', '', 4, 10, '', '', 5, 9, 8, 7, 6].map((num, i) => (
                          <div
                            key={i}
                            className="border border-white/40 flex items-center justify-center text-white text-sm"
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-2xl mb-4 text-orange-700">Free Kundli</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Find out your destiny</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Inspect the positions of celestial bodies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Enable yourself to make better decisions</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => navigate('/free-kundli')}
                    className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Know More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Today Panchang */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-2 border-yellow-200 hover:shadow-2xl transition-all h-full bg-gradient-to-br from-yellow-50 to-amber-50">
                <div className="relative h-56 overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center p-8">
                    <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-lg border-4 border-amber-600/30 p-4">
                      <div className="grid grid-cols-4 grid-rows-3 gap-1 h-full">
                        {[10, 11, 12, 1, 9, 4, 5, 2, 8, 3, 6, 7].map((num, i) => (
                          <div
                            key={i}
                            className={`border border-amber-600/40 flex items-center justify-center text-amber-800 text-sm ${
                              [4, 5, 8, 9].includes(i) ? 'bg-white/20' : ''
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-2xl mb-4 text-amber-700">Today Panchang</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Embrace positivity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Accomplish tasks with ease</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Positivity in your life</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => navigate('/panchang')}
                    className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Know More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Kundli Matching */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-2 border-red-200 hover:shadow-2xl transition-all h-full bg-gradient-to-br from-red-50 to-pink-50">
                <div className="relative h-56 overflow-hidden rounded-t-lg">
                  <img
                    src="https://images.unsplash.com/photo-1756376748107-12c98ec6b969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    alt="Kundli Matching"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-2xl mb-4 text-red-700">Kundli Matching</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Precise results</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">36 gunas for compatibility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Foresee the troubles</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => navigate('/kundli-matching')}
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Know More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Understanding Astrology - Educational Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1.5">
                <BookOpen className="w-4 h-4 mr-2 inline" />
                Learn About Astrology
              </Badge>
              <h2 className="text-3xl md:text-5xl mb-4 text-foreground">
                Understanding Vedic Science
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore the ancient wisdom of astrology and how it can guide your life decisions
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-border h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1674936985746-1993297aad5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Vedic Astrology"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-2xl mb-4 text-foreground">Indian Astrology (Vedic Astrology)</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Indian astrology, also known as Vedic astrology, boasts a rich history dating back centuries. It is based on the movements of stars and planets, incorporating astrological signs and their corresponding dates (zodiacs) for a comprehensive understanding.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Vedic astrology considers 27 constellations, 9 planets, 12 zodiac signs, and 12 houses, analyzing their influence on an individual's life. Astrology by date of birth is used to create a horoscope chart, which displays the placement of the 9 planets within the 12 houses at the time of birth.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Expert astrologers interpret this chart to assess the impact of planetary positions on various life aspects, offering personalized horoscope readings and astrological signs interpretations. Vedic astrology is used for predicting marriage compatibility, career prospects, financial trends, and health outcomes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-border h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1614089254151-676cc373b01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Western Astrology"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-2xl mb-4 text-foreground">Western Astrology</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Western astrology employs an equatorial zodiac system based on the equator points. This system emphasizes the precise time of birth for generating horoscopes and making predictions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Western astrology tracks the movements of the Sun, planets, and Moon, considering their positions in the 12 houses of a birth chart. Similar to Vedic astrology, Western astrology uses birth chart analysis to understand an individual's personality, strengths, and weaknesses.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    However, Western astrology differs from Vedic astrology in its interpretation of planetary influences and the emphasis on psychological aspects of personality. Western astrologers often use techniques like transit analysis and progression analysis to predict future trends and events.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative h-80 overflow-hidden lg:rounded-l-lg">
                  <img
                    src="https://images.unsplash.com/photo-1646208714721-ebce8335cc88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Astrology Chart"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6 lg:pr-8">
                  <h3 className="text-2xl mb-4 text-foreground">Astrology Chart (Natal Chart)</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    An astrology chart, also known as a natal chart, maps the positions of the planets around the Sun at the moment of an individual's birth. This chart reveals a person's inherent strengths and weaknesses, indicating opportune times for decision-making and personal growth.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Birth chart analysis is a cornerstone of both Vedic and Western astrology, providing valuable insights for astrological signs and horoscope readings. Here's what astrologers consider when analyzing a birth chart:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">The position of each planet in the 12 houses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">The placement of the Moon, Venus, and Mars</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Jupiter's placement for luck and opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Planetary aspects and their significance</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => navigate('/horoscope')}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Get Your Free Birth Chart
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Free Astrology Services */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl mb-4 text-foreground">
                Free Astrology Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our comprehensive range of free astrological tools and insights
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {freeServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="cursor-pointer hover:shadow-xl transition-all border-border group overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white text-xs">Coming Soon</Badge>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-base mb-1 text-foreground">{service.title}</h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl mb-4 text-foreground">
                Specialized Consultations
              </h2>
              <p className="text-lg text-muted-foreground">
                Expert guidance for every aspect of your life
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-xl transition-all border-border group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="text-lg">{category.title}</h3>
                          <p className="text-xs text-white/80">{category.consultations} consultations</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <Button 
                      onClick={() => handleOpenBooking(`Category Consultation - ${category.title}`)}
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      Consult Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-6xl mb-2 text-foreground">
                Why <span className="text-primary">Choose</span> Us
              </h2>
              <p className="text-lg text-muted-foreground mt-4">
                India's most trusted astrology platform with proven results
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: <Users className="w-12 h-12" />, number: '500+', label: 'Certified Astrologers' },
              { icon: <Clock className="w-12 h-12" />, number: '24/7', label: 'Available Support' },
              { icon: <Star className="w-12 h-12" />, number: '10,000+', label: 'Happy Clients' },
              { icon: <Award className="w-12 h-12" />, number: '4.9/5', label: 'Average Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center border-border bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-4xl text-primary mb-2">{stat.number}</div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Detailed Reasons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Verified Expert Astrologers',
                description: 'All our astrologers are thoroughly vetted, certified, and have minimum 10+ years of experience in Vedic astrology and related sciences.',
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: '100% Confidential',
                description: 'Your personal information and consultation details are completely secure and never shared with third parties.',
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Accurate Predictions',
                description: 'Our astrologers have a proven track record of accurate predictions based on detailed birth chart analysis and planetary positions.',
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Instant Connection',
                description: 'Connect with expert astrologers instantly via call or chat. No waiting, no appointments needed for quick guidance.',
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Personalized Solutions',
                description: 'Receive customized remedies, gemstone recommendations, and puja suggestions tailored to your specific planetary positions.',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Proven Track Record',
                description: 'Over 25,000 successful consultations with 95% client satisfaction rate and countless positive life transformations.',
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Comprehensive Services',
                description: 'From Kundli making to Vastu consultation, marriage matching to career guidance - all under one roof.',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Multilingual Support',
                description: 'Get consultation in Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, and more regional languages.',
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: 'Follow-up Support',
                description: 'Not just one-time consultation - get ongoing support and guidance as you implement the suggested remedies.',
              },
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <Card className="h-full border-border bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {reason.icon}
                    </div>
                    <h3 className="text-lg mb-2 text-foreground">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl mb-4 text-foreground">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Real stories from real people
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-border hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">{testimonial.date}</Badge>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1.5">
                <MessageCircle className="w-4 h-4 mr-2 inline" />
                Get Expert Guidance
              </Badge>
              <h2 className="text-3xl md:text-5xl mb-6 text-foreground">
                Why You Should
                <span className="text-primary block mt-2">Contact Us Today</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Don't let uncertainty hold you back. Our expert astrologers are here to provide clarity, direction, and practical solutions for all your life challenges.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  {
                    title: 'Facing Life Challenges?',
                    description: 'Whether it\'s career confusion, relationship issues, financial stress, or health concerns - get personalized astrological guidance.',
                  },
                  {
                    title: 'Making Important Decisions?',
                    description: 'Planning marriage, changing jobs, starting a business, or buying property? Know the most auspicious time through Vedic astrology.',
                  },
                  {
                    title: 'Seeking Peace & Prosperity?',
                    description: 'Transform your home and workplace with Vastu Shastra. Create harmonious spaces that attract positive energy and success.',
                  },
                  {
                    title: 'Want to Understand Your Destiny?',
                    description: 'Discover your life path, strengths, challenges, and opportunities through detailed birth chart analysis.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg mb-1 text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => handleOpenBooking('Contact Us Section - Call Now')}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now for FREE Consultation
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate('/contact')}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Send Message
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="pt-8">
                  <h3 className="text-2xl mb-6 text-center text-foreground">
                    What You Get When You Contact Us
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      { icon: <Phone className="w-5 h-5" />, text: 'Instant connection with verified astrologers' },
                      { icon: <Star className="w-5 h-5" />, text: 'Detailed birth chart analysis and interpretation' },
                      { icon: <BookOpen className="w-5 h-5" />, text: 'Personalized predictions for career, marriage, health' },
                      { icon: <Heart className="w-5 h-5" />, text: 'Relationship compatibility and marriage matching' },
                      { icon: <Home className="w-5 h-5" />, text: 'Vastu consultation for home and office' },
                      { icon: <TrendingUp className="w-5 h-5" />, text: 'Business and financial growth guidance' },
                      { icon: <CheckCircle className="w-5 h-5" />, text: 'Effective remedies - mantras, gemstones, pujas' },
                      { icon: <Calendar className="w-5 h-5" />, text: 'Auspicious dates for important events' },
                      { icon: <MessageCircle className="w-5 h-5" />, text: 'Follow-up support and ongoing guidance' },
                      { icon: <Award className="w-5 h-5" />, text: 'Written consultation report via email' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-border">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          {item.icon}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-primary/20 text-center">
                    <p className="text-sm text-muted-foreground mb-2">First Time Users</p>
                    <p className="text-3xl text-primary mb-2">FREE 15 Minutes</p>
                    <p className="text-xs text-muted-foreground">
                      Get your first consultation absolutely free!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: <Phone className="w-10 h-10" />,
                title: 'Call Us Directly',
                detail: '+91 79057 55326',
                description: 'Available Mon-Sat, 9 AM - 7 PM',
                action: 'Call Now',
              },
              {
                icon: <MessageCircle className="w-10 h-10" />,
                title: 'WhatsApp Chat',
                detail: 'Instant Response',
                description: '24/7 automated replies',
                action: 'Chat on WhatsApp',
              },
              {
                icon: <Mail className="w-10 h-10" />,
                title: 'Email Consultation',
                detail: 'contact@bhagyanetram.com',
                description: 'Response within 24 hours',
                action: 'Send Email',
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center border-border hover:shadow-xl transition-all cursor-pointer">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                      {contact.icon}
                    </div>
                    <h3 className="text-xl mb-2 text-foreground">{contact.title}</h3>
                    <p className="text-primary mb-1">{contact.detail}</p>
                    <p className="text-sm text-muted-foreground mb-4">{contact.description}</p>
                    <Button
                      onClick={() => index === 1 ? window.open('https://wa.me/917905755326', '_blank') : navigate('/contact')}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      {contact.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1614089254151-676cc373b01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={logoImage} 
              alt="Bhagyanetram" 
              className="w-24 h-24 object-contain mx-auto mb-6 brightness-100 rounded-md"
            />
            <h2 className="text-3xl md:text-5xl mb-6 text-white">
              Ready to Transform Your Life?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Get instant access to India's top astrologers. First consultation FREE!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => handleOpenBooking('Final CTA - Talk to Astrologer')}
                className="bg-white text-primary hover:bg-white/90 px-8 text-lg h-14"
              >
                <Phone className="mr-2 w-5 h-5" />
                Talk to Astrologer Now
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/contact')}
                variant="outline"
                className="bg-white text-primary hover:bg-white/10 px-8 text-lg h-14"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        open={bookingModalOpen} 
        onOpenChange={setBookingModalOpen} 
        reason={bookingReason}
        astrologerName={selectedAstrologer}
      />
    </div>
  );
}