import { VastuTemplate } from '../VastuTemplate';
import { Bath } from 'lucide-react';

export function VastuToilet() {
  return (
    <VastuTemplate
      title="Toilet & Bathroom Vastu"
      description="Toilets and bathrooms represent waste disposal and purification. Careful Vastu placement is crucial to prevent negative energy drainage from affecting your home's prosperity, health, and positive vibrations."
      imageUrl="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      icon={<Bath className="w-12 h-12 text-white" />}
      directions={['North-West (Best)', 'West (Good)', 'South (Acceptable)']}
      tips={[
        { category: 'do', text: 'Place the toilet/bathroom in the North-West, West, or South direction of the house' },
        { category: 'do', text: 'Position the toilet seat facing North or South (never East or West)' },
        { category: 'do', text: 'Keep the toilet door always closed when not in use to contain negative energy' },
        { category: 'do', text: 'Ensure proper ventilation with exhaust fan and windows for air circulation' },
        { category: 'do', text: 'Use light, refreshing colors like white, light blue, or light grey' },
        { category: 'do', text: 'Keep the toilet scrupulously clean, hygienic, and well-maintained at all times' },
        { category: 'do', text: 'Fix leakages immediately to prevent energy and money drainage' },
        { category: 'do', text: 'Install bright lighting to dispel darkness and stagnant energy' },
        { category: 'dont', text: 'Avoid placing toilet in the North-East corner (Ishaan direction) - highly inauspicious' },
        { category: 'dont', text: 'Don\'t have toilet adjacent to, above, or below the kitchen or pooja room' },
        { category: 'dont', text: 'Avoid positioning toilet in the center of the house (Brahmasthan - energy vortex)' },
        { category: 'dont', text: 'Don\'t have the toilet door facing the main entrance or kitchen' },
        { category: 'dont', text: 'Avoid using dark, heavy colors like black, dark blue, or dark brown' },
        { category: 'dont', text: 'Don\'t allow leaking taps, broken fixtures, or drainage issues to persist' },
        { category: 'dont', text: 'Avoid keeping the toilet seat lid open (drains positive energy)' },
        { category: 'dont', text: 'Don\'t have exposed drainage pipes or sewage lines visible' },
      ]}
      planetInfluence={{
        planet: 'Rahu & Ketu (Shadow Planets)',
        description: 'Toilets and bathrooms are influenced by the shadow planets Rahu and Ketu, which represent elimination, purification, and karmic cleansing. Proper Vastu placement prevents these malefic planetary influences from causing health problems, financial drainage, relationship issues, and obstacles. When properly positioned, the elimination function serves spiritual purification without negative side effects.',
      }}
      elements={{
        primary: 'Water (Jal)',
        secondary: 'Air (Vayu)',
        description: 'The bathroom embodies the Water element representing purification and cleansing. The Air element ensures proper ventilation and energy circulation. However, excessive water in wrong directions can create energy imbalance, hence the critical importance of correct placement.',
      }}
      colors={{
        recommended: ['White', 'Light Blue', 'Light Grey', 'Off-White', 'Pastel Shades'],
        avoid: ['Black', 'Dark Blue', 'Dark Brown', 'Bright Red', 'Dark Green'],
      }}
      benefits={[
        'Prevention of chronic health problems and illnesses',
        'Protection from continuous financial drainage and losses',
        'Better hygiene, cleanliness, and sanitation',
        'Significantly reduced negative energy accumulation in the home',
        'Improved overall physical and mental well-being',
        'Enhanced positive energy flow throughout the house',
        'Protection from accidents and injuries in the bathroom',
        'Prevention of relationship conflicts and misunderstandings',
      ]}
      remedies={[
        'If toilet is in North-East, place a Vastu salt bowl to absorb negative energy (replace monthly)',
        'Keep a small bowl of sea salt or rock salt in the toilet to neutralize negativity',
        'Hang a small convex mirror on the outside of the toilet door to deflect negative energy',
        'Place a potted money plant or bamboo plant near the bathroom window (not inside)',
        'Use natural air fresheners like essential oils (lavender, eucalyptus) to purify the atmosphere',
        'Install a small crystal or metal pyramid in the affected direction to balance energy',
        'Always keep the toilet lid down and door closed to prevent energy leakage',
        'Place a picture of Lord Hanuman facing the toilet door to protect from negative influences',
      ]}
    />
  );
}
