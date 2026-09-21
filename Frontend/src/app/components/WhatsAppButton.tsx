import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsAppButton() {
  const whatsappNumber = '+917905755326'; // Replace with actual WhatsApp number
  const message = encodeURIComponent('Hello! I would like to book a consultation with Bhagyanetram.');

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 spiritual-gradient rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-8 h-8 text-card" />
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.a>
  );
}
