import { VastuTemplate } from '../VastuTemplate';
import { ChefHat } from 'lucide-react';

export function VastuKitchen() {
  return (
    <VastuTemplate
      title="Kitchen Vastu"
      description="The kitchen represents the fire element and is crucial for health and nourishment. Proper placement ensures good health, family prosperity, and harmonious energy flow in your home."
      imageUrl="https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      icon={<ChefHat className="w-12 h-12 text-white" />}
      directions={['South-East (Primary)', 'North-West (Alternative)']}
      tips={[
        { category: 'do', text: 'Place the kitchen in the South-East corner (Agni direction) of the house for optimal fire energy' },
        { category: 'do', text: 'Position the cooking stove in the South-East corner with cook facing East' },
        { category: 'do', text: 'Place water sink and water storage in the North-East or North direction' },
        { category: 'do', text: 'Keep the kitchen clean, organized, clutter-free, and well-ventilated at all times' },
        { category: 'do', text: 'Use light and bright colors like yellow, orange, rose pink, or light green' },
        { category: 'do', text: 'Ensure proper cross-ventilation with windows in the East or North direction' },
        { category: 'do', text: 'Position refrigerator in South-West, West, or North direction (never in North-East)' },
        { category: 'do', text: 'Keep a small window or exhaust fan for smoke and heat ventilation' },
        { category: 'dont', text: 'Avoid placing the kitchen in the North-East corner (Ishaan direction)' },
        { category: 'dont', text: 'Don\'t position the stove directly opposite or adjacent to the sink (fire-water conflict)' },
        { category: 'dont', text: 'Avoid having the kitchen under or above a bedroom, toilet, or pooja room' },
        { category: 'dont', text: 'Don\'t keep damaged, broken, or chipped utensils in the kitchen' },
        { category: 'dont', text: 'Avoid black color dominance; use it sparingly if at all' },
        { category: 'dont', text: 'Don\'t place the refrigerator in the South-East corner (Agni corner)' },
        { category: 'dont', text: 'Avoid exposed beams or slabs directly above the cooking area' },
        { category: 'dont', text: 'Don\'t keep the kitchen door directly aligned with the main entrance' },
      ]}
      planetInfluence={{
        planet: 'Sun (Surya) & Mars (Mangal)',
        description: 'The kitchen is ruled by the Sun representing fire element (Agni Tattva) and Mars representing energy and vitality. Proper kitchen Vastu enhances these planetary influences, promoting good health, strong digestive fire (Jatharagni), vitality, and prosperity. The Sun governs overall health and immunity while Mars provides the energy and strength to family members.',
      }}
      elements={{
        primary: 'Fire (Agni)',
        secondary: 'Water (Jal)',
        description: 'The kitchen embodies the sacred balance between Fire and Water elements. Fire (cooking) represents transformation and nourishment, while Water (cleaning, drinking) represents purification. These elements must be positioned correctly to avoid elemental conflict and maintain energetic harmony.',
      }}
      colors={{
        recommended: ['Yellow', 'Orange', 'Rose Pink', 'Light Green', 'White', 'Cream'],
        avoid: ['Black', 'Dark Blue', 'Dark Grey', 'Deep Red'],
      }}
      benefits={[
        'Improved overall health and immunity of family members',
        'Enhanced digestion and strong metabolism (Agni)',
        'Prosperity and abundance of food and resources',
        'Reduced family conflicts and improved harmony',
        'Better cooking experience with positive energy',
        'Protection from fire accidents and kitchen mishaps',
        'Increased appetite and satisfaction from meals',
        'Financial stability and continuous income flow',
      ]}
      remedies={[
        'If kitchen is in wrong direction, place a Vastu pyramid in the South-East corner of the kitchen',
        'Keep a bowl of sea salt in the kitchen to absorb negative energies; replace it monthly',
        'Hang a picture or symbol of Sun god (Surya) on the East wall to enhance fire element',
        'Use copper or brass utensils for cooking to increase positive vibrations',
        'Place a small plant like basil (Tulsi) near the kitchen window for purification',
        'Install bright lights in the kitchen to ensure the space is always well-lit',
        'Keep the kitchen door closed while cooking to contain positive energy',
        'Chant "Om Suryaya Namaha" mantra 11 times before starting to cook for blessing the food',
      ]}
    />
  );
}
