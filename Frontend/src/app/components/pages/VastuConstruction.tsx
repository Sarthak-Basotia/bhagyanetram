import { VastuTemplate } from '../VastuTemplate';
import { HardHat } from 'lucide-react';

export function VastuConstruction() {
  return (
    <VastuTemplate
      title="Under Construction Properties"
      description="Building from the ground up? Incorporate Vastu principles from the foundation stage for lifetime benefits and prosperity."
      imageUrl="https://images.unsplash.com/photo-1720433963013-91fd65fdcb4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGUlMjBtYW5kYWxhfGVufDF8fHx8MTc2MTYyOTE0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      icon={<HardHat className="w-12 h-12 text-white" />}
      directions={['East', 'North', 'North-East']}
      tips={[
        { category: 'do', text: 'Start construction on an auspicious day after consulting an astrologer' },
        { category: 'do', text: 'Ensure the plot is square or rectangular in shape' },
        { category: 'do', text: 'Leave more open space in the North and East sides' },
        { category: 'do', text: 'Start construction from the North-East corner' },
        { category: 'do', text: 'Keep the North-East corner of the plot lower than the South-West' },
        { category: 'do', text: 'Perform Bhoomi Puja before starting construction' },
        { category: 'dont', text: 'Avoid irregular or triangular-shaped plots' },
        { category: 'dont', text: 'Don\'t leave the construction incomplete for extended periods' },
        { category: 'dont', text: 'Avoid starting construction during inauspicious months' },
        { category: 'dont', text: 'Don\'t build on land with a history of negative events' },
        { category: 'dont', text: 'Avoid higher elevation in the North-East direction' },
        { category: 'dont', text: 'Don\'t compromise on quality of construction materials' },
      ]}
      planetInfluence={{
        planet: 'Mars (Mangal)',
        description: 'Mars governs land, property, and construction activities. Following Vastu during construction appeases Mars and brings courage, strength, and protection to the property.',
      }}
      benefits={[
        'Long-term prosperity and stability',
        'Protection from natural calamities',
        'Strong foundation for family growth',
        'Smooth construction process',
        'Appreciation in property value',
        'Harmonious living for generations',
      ]}
    />
  );
}
