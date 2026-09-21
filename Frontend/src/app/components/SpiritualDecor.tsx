import { motion } from 'motion/react';

interface SpiritualDecorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  symbol?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SpiritualDecor({ 
  position = 'top-left', 
  symbol = '🕉️',
  size = 'md' 
}: SpiritualDecorProps) {
  const positionClasses = {
    'top-left': 'top-10 left-10',
    'top-right': 'top-10 right-10',
    'bottom-left': 'bottom-10 left-10',
    'bottom-right': 'bottom-10 right-10',
  };

  const sizeClasses = {
    'sm': 'text-3xl',
    'md': 'text-5xl',
    'lg': 'text-7xl',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} opacity-20 pointer-events-none`}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {symbol}
    </motion.div>
  );
}

export function FloatingOm() {
  return (
    <motion.div
      className="inline-block"
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      🕉️
    </motion.div>
  );
}

export function GlowingDiya() {
  return (
    <motion.div
      className="inline-block"
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      🪔
    </motion.div>
  );
}

export function MandalaDecor({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeValue = {
    sm: 60,
    md: 100,
    lg: 150,
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <svg
        width={sizeValue[size]}
        height={sizeValue[size]}
        viewBox="0 0 100 100"
        className="opacity-20"
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 40 * Math.cos(angle * Math.PI / 180)}
            y2={50 + 40 * Math.sin(angle * Math.PI / 180)}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-accent"
          />
        ))}
      </svg>
    </motion.div>
  );
}
