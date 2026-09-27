import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, User, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const blogPosts = [
    {
      title: 'Vastu for the Main Entrance: Attracting Positive Energy with Sacred Stones and Shells',
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
            At Bhagya Netram, one of the remedies we perform most often for clients is the embedding of natural gemstones, crystals, and sacred shells directly into the entrance threshold. Unlike temporary fixes such as a hanging toran or a bowl of crystals that can be moved or forgotten, this remedy becomes a permanent part of the entrance itself — quietly working every single time someone crosses the threshold. In this blog, we walk you through exactly what this remedy involves, the significance of each material used, and why it is considered one of the most powerful Vastu corrections for a main door.
          </p>

          {/* Video Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="bg-slate-100 p-8 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center aspect-video shadow-inner">
              <span className="text-slate-500 font-bold mb-2">▶ Video 1</span>
              <span className="text-slate-400 text-sm">Main Gate Video</span>
            </div>
            <div className="bg-slate-100 p-8 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center aspect-video shadow-inner">
              <span className="text-slate-500 font-bold mb-2">▶ Video 2</span>
              <span className="text-slate-400 text-sm">Gomti Chakra & Gemstone Chip Embedding</span>
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

  const categories = ['Astrology', 'Vastu Shastra', 'Spiritual Practices', 'Remedies'];

  // --- FULL ARTICLE READING VIEW ---
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <Button
            variant="ghost"
            onClick={() => setSelectedPost(null)}
            className="mb-8 text-[#0A0A9C] hover:gap-2 transition-all group px-0 font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:mr-3 transition-all" />
            Back to Articles
          </Button>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {selectedPost.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-8 font-medium">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-bold">
                {selectedPost.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D35400]" />
              {selectedPost.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#D35400]" />
              {selectedPost.author}
            </div>
          </div>

          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full aspect-[21/9] object-cover rounded-2xl mb-12 shadow-sm border border-slate-100"
          />

          <div className="animate-fade-in">
            {selectedPost.content}
          </div>

        </div>
      </div>
    );
  }

  // --- BLOG LISTING VIEW ---
  return (
    <div className="min-h-screen bg-white">
      
      {/* UPDATED Hero Section matching Zodiac & Horoscope Pages */}
      <section className="py-16 md:py-24 bg-[#FFFDF2] border-b border-slate-100/50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Added elegant BookOpen icon to match the Sparkles/Star of the other pages */}
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#D35400] mb-4 stroke-[1.5]" />
            
            {/* Switched to a serif font to match the aesthetic */}
            <h1 className="text-3xl md:text-4xl text-[#D35400] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Cosmic Wisdom Blog
            </h1>
            
            {/* Subtitle color changed from grey to a soft orange matching the theme */}
            <p className="text-sm md:text-base max-w-2xl mx-auto text-[#D35400]/90 font-medium">
              Explore our latest articles on astrology, Vastu Shastra, and spiritual living.
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
                className="border-slate-200 text-slate-600 hover:bg-[#0A0A9C] hover:text-white hover:border-[#0A0A9C]"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
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
                <Card
                  className="h-full border-slate-200 hover:shadow-xl transition-all overflow-hidden group cursor-pointer flex flex-col"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="aspect-video overflow-hidden border-b border-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-snug group-hover:text-[#D35400] transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" className="text-[#D35400] p-0 font-bold hover:gap-2 transition-all group-hover:text-blue-800 bg-transparent">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}