import { VastuTemplate } from '../VastuTemplate';
import { BookOpen } from 'lucide-react';

export function VastuStudyRoom() {
  return (
    <VastuTemplate
      title="Study Room / Study Desk Vastu"
      description="A well-designed study space enhances concentration, memory, and academic success. Follow Vastu for optimal learning and intellectual growth."
      imageUrl="https://images.unsplash.com/photo-1729335511883-29eade10006b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb2xvZ3klMjB6b2RpYWMlMjBzeW1ib2xzfGVufDF8fHx8MTc2MTU4NjcwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      icon={<BookOpen className="w-12 h-12 text-white" />}
      directions={['North', 'East', 'North-East']}
      tips={[
        { category: 'do', text: 'Place the study room in the East, North, or North-East direction' },
        { category: 'do', text: 'Position the study desk so you face East or North while studying' },
        { category: 'do', text: 'Use light colors like white, cream, or light green' },
        { category: 'do', text: 'Ensure proper lighting, preferably natural light from the East' },
        { category: 'do', text: 'Keep books organized on shelves in the East or North walls' },
        { category: 'do', text: 'Place a crystal pyramid on the study desk for concentration' },
        { category: 'dont', text: 'Avoid studying facing the South direction' },
        { category: 'dont', text: 'Don\'t place the study desk under a beam' },
        { category: 'dont', text: 'Avoid placing mirrors in front of the study desk' },
        { category: 'dont', text: 'Don\'t keep the study room cluttered or messy' },
        { category: 'dont', text: 'Avoid using dark or dull colors in the study space' },
        { category: 'dont', text: 'Don\'t have a toilet adjacent to the study room' },
      ]}
      planetInfluence={{
        planet: 'Mercury (Budh) & Jupiter (Guru)',
        description: 'Mercury governs intellect and communication, while Jupiter represents wisdom and knowledge. A Vastu-compliant study space attracts these planetary energies for academic excellence.',
      }}
      benefits={[
        'Enhanced concentration and focus',
        'Improved memory retention',
        'Better academic performance',
        'Increased creativity and problem-solving',
        'Reduced mental fatigue',
        'Success in competitive exams',
      ]}
    />
  );
}
