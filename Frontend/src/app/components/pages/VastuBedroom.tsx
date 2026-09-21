import { VastuTemplate } from '../VastuTemplate';
import { Bed } from 'lucide-react';

export function VastuBedroom() {
  return (
    <VastuTemplate
      title="Bedroom Vastu"
      description="The bedroom is your personal sanctuary for rest, rejuvenation, and intimacy. Proper Vastu ensures peaceful sleep, good health, harmonious relationships, and positive energy flow throughout the night."
      imageUrl="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      icon={<Bed className="w-12 h-12 text-white" />}
      directions={['South-West (Best)', 'South', 'West']}
      tips={[
        { category: 'do', text: 'Place the master bedroom in the South-West corner for stability and grounding' },
        { category: 'do', text: 'Sleep with your head towards the South or East direction for optimal energy alignment' },
        { category: 'do', text: 'Position the bed so it has a solid wall behind (headboard against wall)' },
        { category: 'do', text: 'Use soothing, calming colors like light blue, green, rose pink, or lavender' },
        { category: 'do', text: 'Keep the bedroom clean, clutter-free, organized, and well-ventilated' },
        { category: 'do', text: 'Place nightstands on both sides of the bed for balance and harmony' },
        { category: 'do', text: 'Use soft, warm, ambient lighting for a calming and romantic atmosphere' },
        { category: 'do', text: 'Keep pairs of decorative items to enhance relationship energy' },
        { category: 'dont', text: 'Avoid placing mirrors directly facing the bed or reflecting sleeping figures' },
        { category: 'dont', text: 'Don\'t keep electronics like TV, computer, or mobile phones near the bed' },
        { category: 'dont', text: 'Avoid sleeping with your head towards the North direction (magnetic disturbance)' },
        { category: 'dont', text: 'Don\'t have a beam, AC duct, or ceiling fan directly above the bed' },
        { category: 'dont', text: 'Avoid water features, aquariums, or fountain images in the bedroom' },
        { category: 'dont', text: 'Don\'t store items, shoes, or clutter under the bed as it blocks energy flow' },
        { category: 'dont', text: 'Avoid keeping indoor plants or cacti in the bedroom' },
        { category: 'dont', text: 'Don\'t position the bed directly in line with the door (death position)' },
      ]}
      planetInfluence={{
        planet: 'Venus (Shukra) & Moon (Chandra)',
        description: 'Venus governs love, romance, relationships, comfort, and luxury, while the Moon influences emotions, mental peace, and sleep quality. A Vastu-compliant bedroom enhances Venusian energies promoting marital harmony, romantic relationships, and peaceful rest. The Moon\'s influence ensures emotional stability, deep sleep, and mental well-being.',
      }}
      elements={{
        primary: 'Earth (Prithvi)',
        secondary: 'Space (Akasha)',
        description: 'The bedroom represents Earth element providing grounding, stability, and rest. The Space element ensures proper ventilation and energy circulation. Together, they create a sanctuary for deep sleep, healing, and relationship bonding.',
      }}
      colors={{
        recommended: ['Light Blue', 'Soft Green', 'Rose Pink', 'Lavender', 'Beige', 'Cream', 'Peach'],
        avoid: ['Bright Red', 'Black', 'Dark Grey', 'Neon Colors', 'Dark Brown'],
      }}
      benefits={[
        'Improved sleep quality and restful, uninterrupted nights',
        'Enhanced romantic relationships and marital harmony',
        'Better physical and mental health',
        'Reduced stress, anxiety, and mental disturbances',
        'Increased intimacy and emotional bonding between partners',
        'Protection from nightmares and disturbed sleep patterns',
        'Enhanced fertility and conception possibilities for couples',
        'Peaceful atmosphere promoting relaxation and healing',
      ]}
      remedies={[
        'If bedroom is in wrong direction, place rose quartz crystals in the South-West corner',
        'Hang a pair of love birds or Mandarin ducks painting to enhance relationship energy',
        'Use lavender or sandalwood essential oils for aromatherapy before sleep',
        'Place a small Selenite crystal under the pillow for peaceful sleep and dream protection',
        'Cover or remove mirrors at night if they face the bed (use curtains or cloth)',
        'Keep soft, warm lighting with dimmers to create calming ambiance',
        'Place a small copper pyramid under the bed for energy harmonization',
        'Chant "Om Shukraya Namaha" mantra 108 times on Fridays for relationship blessings',
      ]}
    />
  );
}
