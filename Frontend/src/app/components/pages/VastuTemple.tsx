import { VastuTemplate } from '../VastuTemplate';
import { Church } from 'lucide-react';

import templeImage from '/src/assets/Pooja-Room.png';
export function VastuTemple() {
  return (
    <VastuTemplate
      title="Temple / Pooja Room Vastu"
      description="The sacred sanctum for worship, meditation, and spiritual practices. Proper placement creates powerful divine vibrations, enhances spiritual consciousness, and brings blessings, peace, and prosperity to your home and family."
      imageUrl={templeImage}
      icon={<Church className="w-12 h-12 text-white" />}
      directions={['North-East (Best)', 'East (Excellent)', 'North (Good)']}
      tips={[
        { category: 'do', text: 'Place the temple/pooja room in the North-East corner (Ishaan direction) of the house' },
        { category: 'do', text: 'Face East (towards Sun) or North (towards Himalayas) while praying and meditating' },
        { category: 'do', text: 'Keep the temple spotlessly clean, sacred, and fragrant at all times' },
        { category: 'do', text: 'Use white, light yellow, light blue, or saffron colors for the pooja room walls' },
        { category: 'do', text: 'Light a ghee lamp (diya) or incense sticks daily, preferably morning and evening' },
        { category: 'do', text: 'Place deity idols at eye level or higher on a wooden platform or altar' },
        { category: 'do', text: 'Use copper, brass, or silver items for worship (kalash, bells, plates)' },
        { category: 'do', text: 'Keep fresh flowers, tulsi leaves, and sacred offerings' },
        { category: 'dont', text: 'Avoid placing the temple in the bedroom (disturbs sleep and reduces sanctity)' },
        { category: 'dont', text: 'Don\'t position the pooja room under a staircase or in a dark corner' },
        { category: 'dont', text: 'Avoid placing the temple wall adjacent to a bathroom or toilet wall' },
        { category: 'dont', text: 'Don\'t keep broken, cracked, or damaged idols or pictures of deities' },
        { category: 'dont', text: 'Avoid placing deities directly on the floor without a proper platform' },
        { category: 'dont', text: 'Don\'t have multiple deities facing different directions (creates confusion)' },
        { category: 'dont', text: 'Avoid keeping photos of deceased relatives in the pooja room' },
        { category: 'dont', text: 'Don\'t store unnecessary items, shoes, or personal belongings in the temple area' },
      ]}
      planetInfluence={{
        planet: 'Jupiter (Guru/Brihaspati) & Sun (Surya)',
        description: 'Jupiter represents divine wisdom, spirituality, dharma, and spiritual teachers (gurus), while the Sun symbolizes supreme divine consciousness, soul, and cosmic light. The North-East is ruled by Jupiter and represents the abode of Gods. A properly placed temple enhances spiritual growth, connects you with divine energies, attracts blessings from higher realms, and brings enlightenment to the household.',
      }}
      elements={{
        primary: 'Space (Akasha)',
        secondary: 'Water (Jal)',
        description: 'The temple area embodies the Space element representing infinite consciousness and divine connection. The Water element in North-East brings purity, clarity, and spiritual flow. Together they create a sacred space for transcendence and divine communion.',
      }}
      colors={{
        recommended: ['White', 'Light Yellow', 'Light Blue', 'Saffron', 'Cream', 'Gold Accents'],
        avoid: ['Black', 'Dark Grey', 'Bright Red', 'Dark Brown'],
      }}
      benefits={[
        'Enhanced spiritual consciousness and divine connection',
        'Divine protection and blessings for the entire household',
        'Deep mental peace, clarity, and emotional stability',
        'Powerful positive energy radiating throughout the home',
        'Fulfillment of sincere wishes, prayers, and spiritual aspirations',
        'Family harmony, unity, and collective spiritual growth',
        'Protection from negative energies, evil influences, and obstacles',
        'Improved meditation quality and spiritual experiences',
      ]}
      remedies={[
        'If temple cannot be in North-East, place a crystal pyramid in North-East corner of the house',
        'Install proper lighting in the pooja room with warm, soft lights (avoid harsh fluorescent)',
        'Place a copper kalash filled with water and mango leaves in the North-East',
        'Keep the temple door made of wood (not glass) and always close it after worship',
        'Burn camphor or dhoop (incense) daily to purify the energy and remove negativity',
        'Place a small water fountain or bowl of fresh water in North-East if possible',
        'Hang a picture of your Isht Devta (chosen deity) or spiritual master facing East/North',
        'Chant "Om Namah Shivaya" or your personal mantra 108 times daily in the temple for divine blessings',
      ]}
    />
  );
}
