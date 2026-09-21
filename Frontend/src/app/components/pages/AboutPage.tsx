import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Star, Award, Users, Heart, BookOpen, Target, Check, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';
import panditPranav from '/src/assets/Pandit-Pranav.jpeg';

export function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: 'Compassion & Empathy',
      description: 'Every consultation is approached with deep understanding and care for your unique situation',
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: 'Authentic Wisdom',
      description: 'Genuine guidance rooted in authentic Vedic principles and ancient knowledge',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: 'Continuous Learning',
      description: 'Dedicated to mastering astrological sciences and staying updated with research',
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: 'Practical Solutions',
      description: 'Accurate predictions combined with actionable remedies that fit modern life',
    },
  ];

  const credentials = [
    // 'Certified Vedic Astrologer from Indian Council of Astrological Sciences (ICAS)',
    'Advanced Diploma in Vastu Shastra',
    '10+ years of professional consulting experience',
    'Trained in KP System, Nadi Astrology, and Prasna Shastra',
    // 'Member of All India Federation of Astrologers\' Societies',
    // 'Published research on planetary remedies and Vastu principles',
  ];

  const achievements = [
    { number: '10,000+', label: 'Satisfied Clients Worldwide' },
    { number: '25,000+', label: 'Successful Consultations' },
    { number: '10+', label: 'Years of Expertise' },
    { number: '95%', label: 'Client Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={logoImage} 
                alt="Bhagyanetram Logo" 
                className="w-24 h-24 object-contain mb-6"
              />
              <h1 className="text-4xl md:text-6xl mb-6 text-foreground">
                About
                <span className="text-primary block mt-2">Bhagyanetram</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A trusted name in Vedic Astrology and Vastu Shastra, dedicated to helping individuals and families find harmony, prosperity, and success through ancient wisdom.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded with a vision to make authentic astrological guidance accessible to everyone, we combine traditional knowledge with modern understanding to provide practical solutions for today's challenges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1759244563340-9f67c4f615b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Ancient Wisdom and Knowledge"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl text-primary mb-2">{achievement.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Founder */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span className="text-sm text-primary">Founder & Chief Consultant</span>
                </div>
                <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
                  Meet Our Expert
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  With over 10 years of dedicated practice in Vedic Astrology and Vastu Shastra, our chief consultant has guided thousands of individuals and families towards positive life transformations.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  What started as a deep fascination with celestial influences has evolved into a mission to help people navigate life's challenges using time-tested wisdom. Every consultation is personalized, combining detailed chart analysis with practical, modern solutions.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{credential}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <img
                src={panditPranav}
                alt="Professional Consultant"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl mb-4 text-foreground">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our practice and service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-border hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl mb-3 text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl mb-6 text-foreground">Our Approach</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe in a holistic, personalized approach to astrology and Vastu consultation. Each client receives:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Detailed Birth Chart Analysis',
                description: 'Comprehensive study of planetary positions, dashas, and transits specific to your chart',
              },
              {
                title: 'Personalized Consultations',
                description: 'One-on-one sessions addressing your unique concerns and life situations',
              },
              {
                title: 'Practical Remedies',
                description: 'Simple, effective solutions that integrate seamlessly into modern lifestyle',
              },
              {
                title: 'Ongoing Support',
                description: 'Follow-up guidance and assistance throughout your journey',
              },
              {
                title: 'Confidential Service',
                description: 'Complete privacy and discretion in all consultations',
              },
              {
                title: 'Scientific Approach',
                description: 'Logical explanations combining ancient wisdom with rational understanding',
              },
            ].map((approach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <h3 className="text-xl mb-3 text-foreground">{approach.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {approach.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl mb-6 text-foreground">Our Mission</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              "To empower individuals with authentic Vedic wisdom, helping them make informed decisions and create harmonious, prosperous lives while preserving the sacred traditions of our ancestors."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.href = '#contact'}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Star className="mr-2 w-5 h-5" />
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
