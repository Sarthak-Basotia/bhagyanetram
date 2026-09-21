import { VastuTemplate } from '../VastuTemplate';
import { Vault } from 'lucide-react';

export function VastuVault() {
  return (
    <VastuTemplate
      title="Vault / Safe / Cash Storage Vastu"
      description="The placement of your wealth storage (vault, safe, locker, cash drawer) significantly impacts financial prosperity, wealth accumulation, and money retention. Follow these powerful Vastu guidelines to attract and retain abundant wealth."
      imageUrl="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      icon={<Vault className="w-12 h-12 text-white" />}
      directions={['North (Kuber Direction)', 'South-West (Wealth Corner)']}
      tips={[
        { category: 'do', text: 'Place the vault in the South-West corner of the room for maximum wealth retention' },
        { category: 'do', text: 'Ensure the vault opens towards the North (Kuber\'s direction - God of Wealth)' },
        { category: 'do', text: 'Keep the vault elevated 6-12 inches from the ground level on a wooden platform' },
        { category: 'do', text: 'Place a Kuber Yantra, Lakshmi idol, or Sri Yantra inside or near the vault' },
        { category: 'do', text: 'Keep the area around the vault spotlessly clean, organized, and sacred' },
        { category: 'do', text: 'Position vault with solid wall support behind it (never in the center)' },
        { category: 'do', text: 'Store wealth, jewellery, and important documents facing North' },
        { category: 'do', text: 'Keep a few grains of rice and a coin in the vault for continuous prosperity' },
        { category: 'dont', text: 'Avoid placing the vault in the North-East corner (wealth will flow away)' },
        { category: 'dont', text: 'Don\'t keep the vault under a beam, staircase, or in a dark corner' },
        { category: 'dont', text: 'Avoid vault opening towards South direction (represents Yama - God of Death)' },
        { category: 'dont', text: 'Don\'t place the vault directly on the floor without elevation' },
        { category: 'dont', text: 'Avoid keeping the vault completely empty - always maintain minimum cash/valuables' },
        { category: 'dont', text: 'Don\'t share vault combination with unnecessary people (energy leakage)' },
        { category: 'dont', text: 'Avoid placing vault in bathrooms, toilets, or below them' },
        { category: 'dont', text: 'Don\'t keep damaged currency notes or torn papers in the vault' },
      ]}
      planetInfluence={{
        planet: 'Jupiter (Guru/Brihaspati) & Venus (Shukra)',
        description: 'Jupiter represents divine wealth, prosperity, expansion, and abundance consciousness. Venus governs material comforts, luxury, financial gains, and beautiful possessions. The North direction is ruled by Kuber (Treasurer of Gods) and Mercury (business acumen). Proper vault placement attracts these powerful planetary energies for maximum financial abundance, wealth multiplication, and sustained prosperity.',
      }}
      elements={{
        primary: 'Earth (Prithvi)',
        secondary: 'Metal (Loha)',
        description: 'The vault embodies the Earth element representing stability, grounding, and material wealth. Metal element provides security, strength, and protective energy. The South-West direction (Earth element) combined with North-opening (Kuber direction) creates the perfect energy vortex for wealth accumulation and retention.',
      }}
      colors={{
        recommended: ['Yellow', 'Gold', 'Green', 'Purple', 'Brown', 'Cream'],
        avoid: ['Red', 'Black', 'Dark Grey', 'White (avoid dominance)'],
      }}
      benefits={[
        'Exponential increase in wealth accumulation and savings',
        'Enhanced financial stability and security for family',
        'Strong protection from financial losses, theft, and robbery',
        'Smooth, continuous cash flow in business and profession',
        'Attraction of new income sources and opportunities',
        'Development of prosperity and abundance mindset',
        'Protection of assets and valuable possessions',
        'Generational wealth transfer and family prosperity',
      ]}
      remedies={[
        'If vault cannot face North, place a small mirror inside to reflect North direction',
        'Keep a Kuber Yantra energized on Dhanteras or Diwali inside the vault',
        'Place 11 gomati chakras and a small piece of crystal in the vault for wealth multiplication',
        'Store a few strands of saffron and silver coins for Lakshmi\'s blessings',
        'Keep a small idol or picture of Goddess Lakshmi and Lord Ganesha near the vault',
        'Place a magnet inside the vault to attract wealth energetically',
        'On Fridays, offer yellow flowers to the vault area for Venus blessings',
        'Chant "Om Shreem Hreem Kleem Maha Lakshmiyei Namaha" mantra 108 times monthly for wealth attraction',
      ]}
    />
  );
}
