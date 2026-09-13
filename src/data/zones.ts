export interface Zone {
  id: string;
  name: string;
  position: [number, number, number];
  radius: number;
  interactionPoint: [number, number, number];
  description: string;
  icon: string;
}

export const ZONES: Zone[] = [
  {
    id: 'workstation',
    name: 'Workstation',
    position: [0, 0, -4.5],
    radius: 1.5,
    interactionPoint: [0, 0, -3.5],
    description: 'Software Projects & Websites',
    icon: '💻',
  },
  {
    id: 'phone-dock',
    name: 'Mobile Terminal',
    position: [3, 0, -3],
    radius: 1.3,
    interactionPoint: [2.5, 0, -2.5],
    description: 'Android Applications',
    icon: '📱',
  },
  {
    id: 'whiteboard',
    name: 'Neural Wall',
    position: [-5, 0, -2.5],
    radius: 1.5,
    interactionPoint: [-4.2, 0, -2],
    description: 'CV & Neural Network Projects',
    icon: '🧠',
  },
  {
    id: 'ai-corner',
    name: 'AI Corner',
    position: [-3, 0, -4.5],
    radius: 1.3,
    interactionPoint: [-2.5, 0, -4],
    description: 'Generative AI Projects',
    icon: '🤖',
  },
  {
    id: 'data-dashboard',
    name: 'Trading Terminal',
    position: [-5, 0, 0],
    radius: 1.5,
    interactionPoint: [-4.5, 0, 0.8],
    description: 'Data Science & Trading Systems',
    icon: '📈',
  },
  {
    id: 'bookshelf',
    name: 'About Me',
    position: [4, 0, -4.5],
    radius: 1.5,
    interactionPoint: [3.5, 0, -4],
    description: 'Overview & Background',
    icon: '📖',
  },
  {
    id: 'lounge',
    name: 'Contact',
    position: [3.5, 0, 1.5],
    radius: 1.5,
    interactionPoint: [4, 0, 1.5],
    description: 'Get In Touch',
    icon: '✉️',
  },
  {
    id: 'skill-shelf',
    name: 'Skills & Certs',
    position: [5, 0, 0],
    radius: 1.5,
    interactionPoint: [4.5, 0, 0.5],
    description: 'Skills, Education & Certifications',
    icon: '🎓',
  },
  {
    id: 'bed',
    name: 'Rest Zone',
    position: [4.5, 0, 3.5],
    radius: 1.3,
    interactionPoint: [4.5, 0, 3.5],
    description: 'Recharging...',
    icon: '😴',
  },
  {
    id: 'coding-desk',
    name: 'Coding Desk',
    position: [1.5, 0, -5.5],
    radius: 1.3,
    interactionPoint: [1.5, 0, -4.8],
    description: 'Writing Code',
    icon: '⌨️',
  },
  {
    id: 'couch',
    name: 'Lounge Couch',
    position: [0, 0, 3],
    radius: 1.5,
    interactionPoint: [0, 0, 3.1],
    description: 'Taking a break',
    icon: '🛋️',
  },
];
