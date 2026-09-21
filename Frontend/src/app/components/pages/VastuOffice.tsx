import { VastuTemplate } from '../VastuTemplate';
import { Briefcase } from 'lucide-react';

export function VastuOffice() {
  return (
    <VastuTemplate
      title="Office & Study Room Vastu"
      description="Transform your workspace into a powerhouse of productivity, success, prosperity, and achievement. Proper Vastu alignment enhances focus, decision-making, wealth creation, and career advancement."
      imageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      icon={<Briefcase className="w-12 h-12 text-white" />}
      directions={['North (Career)', 'East (Knowledge)', 'West (Finance)', 'South-West (Stability)']}
      tips={[
        { category: 'do', text: 'Sit facing North (career growth) or East (knowledge & wisdom) while working' },
        { category: 'do', text: 'Position your desk with a solid wall behind you for support, authority, and backing' },
        { category: 'do', text: 'Place the office/study room in West, South-West, or South part of the house' },
        { category: 'do', text: 'Use motivating, concentration-enhancing colors like light blue, green, cream, or white' },
        { category: 'do', text: 'Display certificates, awards, and achievements on South or West walls' },
        { category: 'do', text: 'Keep the workspace organized, clean, clutter-free, and well-ventilated' },
        { category: 'do', text: 'Place a crystal globe or pyramid on the North-East corner of desk for focus' },
        { category: 'do', text: 'Ensure proper natural lighting from North or East windows' },
        { category: 'dont', text: 'Avoid sitting with your back to the door (insecurity and lack of control)' },
        { category: 'dont', text: 'Don\'t position your desk in the center of the room (no support)' },
        { category: 'dont', text: 'Avoid keeping broken equipment, old files, or obsolete materials' },
        { category: 'dont', text: 'Don\'t use aggressive red or depressing black as dominant wall colors' },
        { category: 'dont', text: 'Avoid sitting directly under a beam, AC duct, or heavy chandelier' },
        { category: 'dont', text: 'Don\'t have a toilet adjacent to or directly behind your main work desk wall' },
        { category: 'dont', text: 'Avoid mirrors directly behind your sitting position (creates instability)' },
        { category: 'dont', text: 'Don\'t clutter the desk with unnecessary items (blocks mental clarity)' },
      ]}
      planetInfluence={{
        planet: 'Saturn (Shani), Mercury (Budh) & Jupiter (Guru)',
        description: 'Saturn governs hard work, discipline, perseverance, and long-term success. Mercury rules business acumen, communication, intelligence, and analytical thinking. Jupiter brings wisdom, expansion, and professional growth. A Vastu-compliant office space harmonizes these planetary influences, attracting professional success, business prosperity, career advancement, and financial abundance.',
      }}
      elements={{
        primary: 'Air (Vayu)',
        secondary: 'Space (Akasha)',
        description: 'The office embodies the Air element representing mental activity, communication, and movement of ideas. The Space element ensures clarity, creativity, and room for expansion. Together they create an environment conducive to intellectual work, strategic thinking, and professional achievement.',
      }}
      colors={{
        recommended: ['Light Blue', 'Green', 'Cream', 'White', 'Light Yellow', 'Beige'],
        avoid: ['Black', 'Dark Grey', 'Bright Red', 'Dark Brown', 'Dark Purple'],
      }}
      benefits={[
        'Dramatically increased productivity and work efficiency',
        'Enhanced decision-making abilities and strategic thinking',
        'Accelerated career growth, promotions, and professional recognition',
        'Improved business profits and financial gains',
        'Significantly reduced workplace stress and mental fatigue',
        'Better professional relationships and networking opportunities',
        'Enhanced focus, concentration, and memory retention',
        'Increased creativity and innovative problem-solving',
      ]}
      remedies={[
        'If you must sit facing wrong direction, place a small mirror to reflect the auspicious direction',
        'Keep a metal pyramid or crystal on the work desk to enhance focus and energy',
        'Place a small money plant in the South-East corner of the office for prosperity',
        'Display motivational quotes, vision boards, or success symbols in your line of sight',
        'Keep a clear quartz crystal or amethyst on the desk for mental clarity',
        'Use full-spectrum LED lights or natural daylight lamps for proper illumination',
        'Place a brass or wooden tortoise figurine in the North direction for career stability',
        'Chant "Om Budhaya Namaha" mantra 108 times on Wednesdays for business and communication success',
      ]}
    />
  );
}
