import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function BlogPage() {
  const blogPosts = [
    {
      title: 'Understanding Your Birth Chart: A Beginner\'s Guide',
      excerpt: 'Learn how to read and interpret your natal chart, understanding the positions of planets and their influence on your life path.',
      category: 'Astrology',
      date: 'October 25, 2025',
      author: 'Dr. Rajesh Sharma',
      image: 'https://images.unsplash.com/photo-1729335511883-29eade10006b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb2xvZ3klMjB6b2RpYWMlMjBzeW1ib2xzfGVufDF8fHx8MTc2MTU4NjcwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Mercury Retrograde: What It Means and How to Navigate It',
      excerpt: 'Discover the truth about Mercury retrograde periods and practical tips for managing communication, technology, and travel during these times.',
      category: 'Planetary Transits',
      date: 'October 20, 2025',
      author: 'Priya Malhotra',
      image: 'https://images.unsplash.com/photo-1758424580140-5e6a12b81706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29uJTIwcGhhc2VzJTIwY2VsZXN0aWFsfGVufDF8fHx8MTc2MTYyOTE1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Vastu for Home Office: Boost Your Productivity',
      excerpt: 'Essential Vastu tips for setting up a home office that enhances focus, creativity, and professional success.',
      category: 'Vastu Shastra',
      date: 'October 15, 2025',
      author: 'Anand Mishra',
      image: 'https://images.unsplash.com/photo-1668864840122-8bdaf2a87e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYXNzJTIwZGlyZWN0aW9uJTIwbmF2aWdhdGlvbnxlbnwxfHx8fDE3NjE1OTQ5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'The Power of Full Moon Rituals in Vedic Tradition',
      excerpt: 'Explore ancient full moon rituals and ceremonies that harness lunar energy for spiritual growth and manifestation.',
      category: 'Spiritual Practices',
      date: 'October 10, 2025',
      author: 'Dr. Rajesh Sharma',
      image: 'https://images.unsplash.com/photo-1760042770871-24b88d11bb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzJTIwY2VsZXN0aWFsfGVufDF8fHx8MTc2MTYyOTE0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Gemstones and Their Astrological Benefits',
      excerpt: 'A comprehensive guide to choosing and wearing gemstones based on your planetary positions for maximum benefit.',
      category: 'Remedies',
      date: 'October 5, 2025',
      author: 'Priya Malhotra',
      image: 'https://images.unsplash.com/photo-1720433963013-91fd65fdcb4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGUlMjBtYW5kYWxhfGVufDF8fHx8MTc2MTYyOTE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Vastu Colors: Choosing the Right Palette for Each Room',
      excerpt: 'Learn how different colors affect the energy of your spaces and which colors to use in different areas of your home.',
      category: 'Vastu Shastra',
      date: 'September 30, 2025',
      author: 'Anand Mishra',
      image: 'https://images.unsplash.com/photo-1717677977177-c9577c04cf27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3Bpcml0dWFsfGVufDF8fHx8MTc2MTU2MTE3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const categories = ['All', 'Astrology', 'Vastu Shastra', 'Planetary Transits', 'Spiritual Practices', 'Remedies'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 celestial-gradient " style={{color: '#C46D29'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl mb-6">Cosmic Wisdom Blog</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90" style={{color: '#C46D29'}}>
              Explore articles on astrology, Vastu Shastra, and spiritual living
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-primary/30 hover:bg-primary hover:text-white"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-primary/20 hover:shadow-xl transition-shadow overflow-hidden group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs mb-3">
                      {post.category}
                    </span>
                    <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="ghost" className="text-primary p-0 hover:gap-2 transition-all group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-primary text-primary">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4">Stay Updated with Cosmic Insights</h2>
          <p className="text-xl mb-8 text-white/90">
            Subscribe to receive weekly articles, astrological updates, and exclusive content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
              style={{ border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
