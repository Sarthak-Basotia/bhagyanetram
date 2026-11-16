import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, User, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchPublicBlogs } from '../../../api/publicContentApi';

export function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const blogPosts = [
    {
      title: 'Vastu for the Main Entrance: Attracting Positive Energy with  Stones and Shells',
      excerpt: 'The main entrance of a home or office is more than just a doorway — in Vastu Shastra, it is considered the "mukhya dwar," the mouth through which all energy, opportunity, and prosperity enters a space.',
      category: 'Vastu Shastra',
      date: 'September 27, 2026',
      author: 'Bhagya Netram',
      image: 'blog1.jpeg',
      content: (
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
          <p>
            The main entrance of a home or office is more than just a doorway — in Vastu Shastra, it is considered the "mukhya dwar," the mouth through which all energy, opportunity, and prosperity enters a space. A weak or imbalanced entrance is believed to restrict the flow of positive energy, while a correctly energized one is said to invite abundance, protection, and harmony into everything that lies beyond it.
          </p>
          <p>
            At Bhagya Netram, one of the remedies we perform most often for clients is the embedding of natural gemstones, crystals, and  shells directly into the entrance threshold. Unlike temporary fixes such as a hanging toran or a bowl of crystals that can be moved or forgotten, this remedy becomes a permanent part of the entrance itself — quietly working every single time someone crosses the threshold. In this blog, we walk you through exactly what this remedy involves, the significance of each material used, and why it is considered one of the most powerful Vastu corrections for a main door.
          </p>

          {/* Real Video Embeds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            
            {/* Video 1: Main Gate */}
            <div className="flex flex-col gap-2">
              <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-black aspect-video">
                <video 
                  controls 
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                >
                  {/* Pulls directly from public/videos/main-gate.mp4 */}
                  <source src="/videos/main-gate.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <span className="text-center text-sm font-bold text-slate-500">Main Gate Vastu Assessment</span>
            </div>

            {/* Video 2: Gomti Chakra */}
            <div className="flex flex-col gap-2">
              <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 bg-black aspect-video">
                <video 
                  controls 
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                >
                  {/* Pulls directly from public/videos/gomti-chakra.mp4 */}
                  <source src="/videos/gomti-chakra.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <span className="text-center text-sm font-bold text-slate-500">Gomti Chakra & Gemstone Embedding</span>
            </div>

          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-200 pb-2">
            Why Smoky Quartz and Protective Beads
          </h3>
          <p>
            Smoky quartz is traditionally regarded in Vastu and crystal practice as a grounding and absorbing stone. It is believed to pull in and neutralize negative, heavy, or stagnant energy before it can travel further into the home — much like a filter placed at the very first point of entry. Because the main door is the single busiest energy junction of any property (every visitor, every mood, every outside influence passes through it), placing an absorptive stone exactly at this point is considered far more effective than placing it deeper inside the home.
          </p>
          <p>
            The red, black, and white beads used alongside the crystal are a traditional protective combination associated with warding off nazar (evil eye) and negative intent. This combination is commonly used at entrances, in vehicles, and even for children — but embedding it permanently into the threshold ensures the protection is constant and cannot be misplaced, removed, or forgotten over time.
          </p>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-200 pb-2">
            Why Gomti Chakra and Gemstone Chips
          </h3>
          <p>
            The Gomti Chakra is a naturally occurring spiral shell found in the Gomti River near Dwarka, and is one of the most revered objects in Vastu and Hindu tradition. Its spiral pattern is said to resemble the Sudarshan Chakra of Lord Vishnu, and it is closely associated with Goddess Lakshmi. Traditionally, Gomti Chakras placed at or near the main entrance are believed to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Attract wealth and ensure a smooth, uninterrupted flow of prosperity into the home</li>
            <li>Protect the household from negative energy, evil eye, and unwanted influences</li>
            <li>Correct underlying Vastu doshas at the entrance without any structural demolition</li>
          </ul>
          <p>
            Running the Gomti Chakras through a bed of gemstone chips isn't just decorative — each stone carries its own traditional significance:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Green Aventurine</strong> — associated with growth, opportunity, and financial stability</li>
            <li><strong>Amethyst</strong> — associated with spiritual protection and calming, balanced energy in the home</li>
            <li><strong>Lapis Lazuli / Sodalite</strong> — associated with clarity, wisdom, and protection of the household</li>
          </ul>
          <p>
            Together, this creates a layered remedy: the shells carry the primary prosperity and protection intent, while the surrounding gemstone bed reinforces and supports it from every angle.
          </p>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-200 pb-2">
            Why Embed These Remedies Permanently Into the Threshold?
          </h3>
          <p>
            Many people are familiar with placing loose gemstones in a bowl near the door, hanging a Gomti Chakra bundle above the frame, or keeping crystals on a side table. These methods work, but they depend on the object staying in place — and in daily life, objects get moved, cleaned away, lost, or simply forgotten.
          </p>
          <p className="font-semibold text-slate-900 mt-6 mb-2">
            Embedding the remedy directly into the floor of the threshold solves this problem permanently:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Uninterrupted contact</strong> — every single person, family member, or visitor physically crosses over the remedy every time they enter or exit, ensuring consistent energetic engagement.</li>
            <li><strong>Permanence</strong> — once set into cement/plaster, the remedy cannot be accidentally removed, misplaced, or forgotten during cleaning or renovation.</li>
            <li><strong>No compromise on aesthetics</strong> — because the stones are set flush into the threshold, the remedy is discreet and does not disrupt the interior design of the entrance.</li>
            <li>Alignment with classical Vastu texts, which often prescribe burying or embedding specific materials at the foundation and entry points of a structure for lasting correction — rather than surface-level, movable fixes.</li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-200 pb-2">
            Is This Remedy Right for Your Home?
          </h3>
          <p className="font-semibold text-slate-900 mt-4 mb-2">This particular remedy is best suited for:</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Homes or offices facing recurring financial stagnation or a sense that "nothing moves forward"</li>
            <li>Entrances that suffer from structural Vastu defects that cannot be corrected by demolition (wrong direction, obstructed doorway, etc.)</li>
            <li>Families experiencing frequent disputes, health issues, or a general feeling of heaviness near the entrance</li>
            <li>New constructions or renovations, where the threshold is being redone and this is the ideal window to embed the remedy</li>
          </ul>
          <p>
            As with all Vastu remedies, the exact combination of stones, shells, and their placement should be customized to your entrance's specific direction, existing doshas, and the client's individual birth chart — a general combination is a starting point, not a one-size-fits-all fix.
          </p>

          {/* Call to Action Box */}
          <div className="bg-[#FFFDF2] border border-[#C8B273] rounded-2xl p-8 mt-12 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-[#D35400] mb-4">Book Your Vastu Consultation</h3>
            <p className="text-slate-700 mb-8 max-w-2xl mx-auto">
              If your main entrance is showing signs of Vastu imbalance — or if you're renovating and want to build this remedy in from the start — our team at Bhagya Netram can assess your specific threshold, direction, and doshas, and recommend the right combination of stones and shells for your home.
            </p>
            <Button 
              className="bg-[#0A0A9C] hover:bg-blue-800 text-white px-8 py-6 text-lg font-bold rounded-lg shadow-md transition-all"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us Today
            </Button>
          </div>
        </div>
      )
    }
  ];

  const [posts, setPosts] = useState<any[]>(blogPosts);

  useEffect(() => {
    fetchPublicBlogs()
      .then((res) => {
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const merged = res.data.map((apiBlog: any) => {
            if (apiBlog.slug === 'vastu-for-the-main-entrance' || apiBlog.title?.includes('Entrance')) {
              return {
                ...apiBlog,
                content: blogPosts[0].content,
              };
            }
            return apiBlog;
          });
          setPosts(merged);
        }
      })
      .catch((err) => console.warn('Blogs fetch error:', err));
  }, []);

  const categories = ['Astrology', 'Vastu Shastra', 'Spiritual Practices', 'Remedies'];

  // --- FULL ARTICLE READING VIEW ---
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-ivory-50 text-cosmic-900 pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <button
            onClick={() => setSelectedPost(null)}
            className="mb-8 inline-flex items-center gap-2 text-cosmic-800 hover:text-gold-700 font-display font-semibold text-sm transition-colors py-2 px-4 rounded-full bg-white border border-gold-500/30 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-gold-600" />
            <span>Return to Cosmic Wisdom Library</span>
          </button>

          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-500/30 shadow-gold-card">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold mb-6 pb-6 border-b border-gold-500/20">
              <span className="px-3.5 py-1 bg-gold-500/15 text-gold-800 border border-gold-500/30 rounded-full font-display uppercase tracking-wider">
                {selectedPost.category}
              </span>
              <div className="flex items-center gap-1.5 text-cosmic-600">
                <Calendar className="w-4 h-4 text-gold-600" />
                <span>{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-cosmic-600">
                <User className="w-4 h-4 text-gold-600" />
                <span>{selectedPost.author}</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cosmic-900 mb-8 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="rounded-2xl overflow-hidden mb-10 border border-gold-500/30 shadow-md">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full aspect-[21/9] object-cover"
              />
            </div>

            <div className="font-sans text-cosmic-800 text-base sm:text-lg leading-relaxed space-y-6">
              {typeof selectedPost.content === 'string' ? (
                <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </div>
              ) : (
                selectedPost.content
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- BLOG LISTING VIEW ---
  return (
    <div className="min-h-screen bg-ivory-50 text-cosmic-900">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-cosmic-900 celestial-grid-bg text-white text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-medium uppercase tracking-wider mb-6">
              <BookOpen className="w-3.5 h-3.5 text-gold-400" />
              <span>Vedic Knowledge Journal</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Cosmic Wisdom <span className="gold-gradient-text">Articles</span>
            </h1>
            
            <p className="font-editorial text-xl sm:text-2xl text-ivory-200/90 max-w-2xl mx-auto italic leading-relaxed">
              Timeless treatises on Vastu Shastra, planetary alchemy, gemstone energies, and dharmic living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-ivory-100/70 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-5 py-2 rounded-full font-display text-xs font-semibold tracking-wider uppercase transition-all bg-white hover:bg-cosmic-900 hover:text-gold-300 text-cosmic-800 border border-gold-500/30 shadow-xs"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="h-full bg-white rounded-3xl border border-gold-500/30 shadow-gold-card hover:shadow-xl hover:border-gold-500/70 transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
                  onClick={() => setSelectedPost(post)}
                >
                  <div>
                    <div className="aspect-video overflow-hidden border-b border-gold-500/20 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-cosmic-950/80 backdrop-blur-xs text-gold-300 border border-gold-500/30 rounded-full text-[10px] font-display font-bold uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6 pb-2">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-cosmic-500 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-gold-600" />
                        <span>{post.date}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-cosmic-900 group-hover:text-gold-700 transition-colors leading-snug mb-3">
                        {post.title}
                      </h3>
                      <p className="text-cosmic-600 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-4 border-t border-gold-500/10">
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-gold-700 group-hover:text-gold-600 inline-flex items-center gap-1.5">
                      <span>Read  Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}