import { VastuTemplate } from '../VastuTemplate';
import { Sofa } from 'lucide-react';

export function VastuDiningLiving() {
  return (
    <VastuTemplate
      title="Dining and Living Room Vastu"
      description="These social spaces are where families bond and guests are entertained. Proper Vastu ensures positive interactions, joy, and prosperity."
      imageUrl="https://images.unsplash.com/photo-1760042770871-24b88d11bb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzJTIwY2VsZXN0aWFsfGVufDF8fHx8MTc2MTYyOTE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      icon={<Sofa className="w-12 h-12 text-white" />}
      directions={['North-West', 'East', 'North']}
      tips={[
        { category: 'do', text: 'Place the living room in the North or East part of the house' },
        { category: 'do', text: 'Position seating so family faces East or North while sitting' },
        { category: 'do', text: 'Keep the dining table in the center or West side of the dining area' },
        { category: 'do', text: 'Use warm, inviting colors like cream, light yellow, or green' },
        { category: 'do', text: 'Ensure the living room receives ample natural light' },
        { category: 'do', text: 'Place family photos and pleasant artwork on the walls' },
        { category: 'dont', text: 'Avoid placing heavy furniture in the center of the room' },
        { category: 'dont', text: 'Don\'t position seating with backs towards the entrance' },
        { category: 'dont', text: 'Avoid broken or damaged furniture' },
        { category: 'dont', text: 'Don\'t use dark or aggressive colors' },
        { category: 'dont', text: 'Avoid placing the dining table directly under a beam' },
        { category: 'dont', text: 'Don\'t keep the space cluttered with unnecessary items' },
      ]}
      planetInfluence={{
        planet: 'Moon (Chandra)',
        description: 'The Moon governs emotions, family bonds, and social connections. A harmonious living and dining space enhances lunar energies, bringing emotional stability and joyful family gatherings.',
      }}
      benefits={[
        'Stronger family bonds and communication',
        'Positive social interactions with guests',
        'Enhanced appetite and digestion',
        'Joyful atmosphere and happy memories',
        'Reduced family conflicts',
        'Prosperity and abundance mindset',
      ]}
    />
  );
}
