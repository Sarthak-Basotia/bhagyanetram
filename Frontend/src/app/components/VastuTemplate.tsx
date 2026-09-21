import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, XCircle, Compass, Star, Lightbulb, Wind, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface VastuTip {
  category: 'do' | 'dont';
  text: string;
}

interface VastuTemplateProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  tips: VastuTip[];
  planetInfluence?: {
    planet: string;
    description: string;
  };
  directions?: string[];
  benefits?: string[];
  elements?: {
    primary: string;
    secondary?: string;
    description: string;
  };
  colors?: {
    recommended: string[];
    avoid: string[];
  };
  remedies?: string[];
}

export function VastuTemplate({
  title,
  description,
  imageUrl,
  icon,
  tips,
  planetInfluence,
  directions,
  benefits,
  elements,
  colors,
  remedies,
}: VastuTemplateProps) {
  const dos = tips.filter((tip) => tip.category === 'do');
  const donts = tips.filter((tip) => tip.category === 'dont');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 celestial-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ color: '#C46D29' }}
          >
            <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#C46D29' }}>
              {icon}
            </div>
            <h1 className="text-5xl mb-6" style={{ color: '#C46D29' }}>
              {title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90" style={{ color: '#C46D29' }}>
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image */}
          <div className="mb-12">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Elements & Directions Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Directions */}
            {directions && directions.length > 0 && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Compass className="w-6 h-6" />
                    Best Directions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {directions.map((direction, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-lg text-center"
                      >
                        <p className="text-primary">{direction}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Elements */}
            {elements && (
              <Card className="border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Wind className="w-6 h-6" />
                    Elemental Influence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Primary Element:</span>
                      <p className="text-primary">{elements.primary}</p>
                    </div>
                    {elements.secondary && (
                      <div>
                        <span className="text-sm text-muted-foreground">Secondary Element:</span>
                        <p className="text-primary">{elements.secondary}</p>
                      </div>
                    )}
                    <p className="text-muted-foreground text-sm mt-3">{elements.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Do's */}
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-700">✅ Do's</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {dos.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{tip.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Don'ts */}
            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-700">❌ Don'ts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {donts.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{tip.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Planet Influence */}
          {planetInfluence && (
            <Card className="mb-8 border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Star className="w-6 h-6 text-[#d4af37]" />
                  Astrological Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="text-lg mb-2 text-primary">
                  Planet: {planetInfluence.planet}
                </h4>
                <p className="text-muted-foreground">{planetInfluence.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Colors */}
          {colors && (
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-6 h-6" />
                  Color Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-green-700 mb-3">✨ Recommended Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {colors.recommended.map((color, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-red-700 mb-3">⚠️ Colors to Avoid</h4>
                    <div className="flex flex-wrap gap-2">
                      {colors.avoid.map((color, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Benefits of Proper Vastu</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Remedies */}
          {remedies && remedies.length > 0 && (
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Lightbulb className="w-6 h-6" />
                  Vastu Remedies & Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {remedies.map((remedy, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-accent text-sm">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{remedy}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
