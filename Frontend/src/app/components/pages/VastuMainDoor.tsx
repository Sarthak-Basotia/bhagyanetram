import { VastuTemplate } from '../VastuTemplate';
import { Home } from 'lucide-react';
import mainDoorImage from '/src/assets/Main-Gate.png';

export function VastuMainDoor() {
  return (
    <VastuTemplate
      title="Main Door Vastu"
      description="The main entrance is the gateway for cosmic energy (Prana) to enter your home. Proper placement and alignment ensure prosperity, health, protection, and continuous positive vibrations flowing through your living space."
      imageUrl={mainDoorImage}
      icon={<Home className="w-12 h-12 text-white" />}
      directions={['North (Best)', 'East (Excellent)', 'North-East (Auspicious)']}
      tips={[
        { category: 'do', text: 'Place the main door in North, East, or North-East direction for maximum positive energy' },
        { category: 'do', text: 'Ensure the door opens clockwise (inward and to the right) to welcome prosperity' },
        { category: 'do', text: 'Keep the entrance well-lit, clean, attractive, and free from clutter at all times' },
        { category: 'do', text: 'Place auspicious symbols like Om, Swastika, Ganesha, or Kalash near the entrance' },
        { category: 'do', text: 'Use high-quality, solid wood for the main door (teak, oak, or sheesham preferred)' },
        { category: 'do', text: 'Make the main door the largest and most beautiful door in the house' },
        { category: 'do', text: 'Install a threshold (doorsill) at the entrance for energy barrier' },
        { category: 'do', text: 'Decorate with rangoli, torans (door hangings), or fresh flowers' },
        { category: 'dont', text: 'Avoid placing the main door in the South or South-West direction (energy drain)' },
        { category: 'dont', text: 'Don\'t have a door directly facing a wall, pillar, or sharp corner' },
        { category: 'dont', text: 'Avoid three doors in a row creating "piercing effect" or "poison arrow"' },
        { category: 'dont', text: 'Don\'t place dustbin, shoe rack, or clutter directly facing the main door' },
        { category: 'dont', text: 'Avoid broken, cracked, creaking, or squeaking doors (blocks energy flow)' },
        { category: 'dont', text: 'Don\'t have obstacles like poles, trees, or walls blocking the entrance path' },
        { category: 'dont', text: 'Avoid having the main door facing a cemetery, temple, or hospital directly' },
        { category: 'dont', text: 'Don\'t use metal doors in North or East (Fire-Metal conflict)' },
      ]}
      planetInfluence={{
        planet: 'Jupiter (Guru/Brihaspati)',
        description: 'The main entrance is governed by Jupiter, the planet of wisdom, prosperity, expansion, and divine blessings. A well-placed and well-maintained main door attracts positive Jupiterian energies, bringing growth, wealth, good fortune, spiritual wisdom, and protection to the household. Jupiter also governs dharma (righteousness) and ensures ethical prosperity.',
      }}
      elements={{
        primary: 'Air (Vayu)',
        description: 'The main door channels the Air element, representing the flow of Prana (life force energy) into the home. Proper positioning ensures smooth energy circulation, bringing vitality, freshness, and positive cosmic vibrations to all inhabitants.',
      }}
      colors={{
        recommended: ['Natural Wood', 'Light Brown', 'Cream', 'White', 'Light Green', 'Yellow'],
        avoid: ['Black', 'Dark Red', 'Dark Blue', 'Grey'],
      }}
      benefits={[
        'Enhanced prosperity, wealth flow, and financial abundance',
        'Positive energy circulation throughout the entire home',
        'Improved health and well-being of all family members',
        'Strong protection from negative influences and evil eye',
        'Better career opportunities, business growth, and success',
        'Harmonious relationships and peace among family members',
        'Increased social status and reputation in society',
        'Divine blessings and spiritual protection',
      ]}
      remedies={[
        'If door is in wrong direction, place a Vastu yantra or copper pyramid above the door frame',
        'Hang a beautiful brass or copper Kalash (pot) with mango leaves above the entrance',
        'Install bright lighting at the entrance to dispel darkness and negative energy',
        'Place a Lord Ganesha idol or picture on the right side of the door (facing inside)',
        'Draw a Swastika symbol with vermillion (kumkum) on the door frame every morning',
        'Keep a brass or copper plate with rice and turmeric near the entrance',
        'Place a small mirror on the door to reflect negative energies away',
        'Chant "Om Gan Ganapataye Namaha" mantra 108 times on auspicious days for door blessings',
      ]}
    />
  );
}
