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
    position: [0, 0, -4.8],
    radius: 1.5,
    interactionPoint: [0, 0, -3.8],
    description: 'Software Projects & Websites',
    icon: '💻',
  },
  {
    id: 'phone-dock',
    name: 'Mobile Terminal',
    position: [3.2, 0, -3.8],
    radius: 1.3,
    interactionPoint: [2.7, 0, -3.1],
    description: 'Android Applications',
    icon: '📱',
  },
  {
    id: 'whiteboard',
    name: 'Neural Wall',
    position: [-5.4, 0, -1.8],
    radius: 1.5,
    interactionPoint: [-4.5, 0, -1.3],
    description: 'CV & Neural Network Projects',
    icon: '🧠',
  },
  {
    id: 'ai-corner',
    name: 'AI Corner',
    position: [-2.8, 0, -4.2],
    radius: 1.3,
    interactionPoint: [-2.1, 0, -3.6],
    description: 'Generative AI Projects',
    icon: '🤖',
  },
  {
    id: 'data-dashboard',
    name: 'Trading Terminal',
    position: [-5.4, 0, 1.1],
    radius: 1.5,
    interactionPoint: [-4.6, 0, 1.8],
    description: 'Data Science & Trading Systems',
    icon: '📈',
  },
  {
    id: 'bookshelf',
    name: 'About Me',
    position: [4.6, 0, -2.9],
    radius: 1.5,
    interactionPoint: [3.8, 0, -2.3],
    description: 'Overview & Background',
    icon: '📖',
  },
  {
    id: 'lounge',
    name: 'Contact',
    position: [3.8, 0, 1.8],
    radius: 1.35,
    interactionPoint: [4.6, 0, 1.8],
    description: 'Get In Touch',
    icon: '✉️',
  },
  {
    id: 'coffee-terminal',
    name: 'Coffee Terminal',
    position: [-4.2, 0, 4.1],
    radius: 1.05,
    interactionPoint: [-3.45, 0, 4.1],
    description: 'Make a coffee and take a break',
    icon: '☕',
  },
  {
    id: 'skill-shelf',
    name: 'Skills & Certs',
    position: [5.4, 0, 0],
    radius: 1.5,
    interactionPoint: [4.6, 0, 0.6],
    description: 'Skills, Education & Certifications',
    icon: '🎓',
  },
  {
    id: 'bed',
    name: 'Rest Zone',
    position: [4.8, 0, 4.0],
    radius: 1.3,
    interactionPoint: [4.8, 0, 4.0],
    description: 'Recharging...',
    icon: '😴',
  },
  {
    id: 'coding-desk',
    name: 'Coding Desk',
    position: [1.3, 0, -5.8],
    radius: 1.3,
    interactionPoint: [1.3, 0, -5.0],
    description: 'Writing Code',
    icon: '⌨️',
  },
  {
    id: 'couch',
    name: 'Lounge Couch',
    position: [0, 0, 3.5],
    radius: 1.5,
    interactionPoint: [0, 0, 3.6],
    description: 'Taking a break',
    icon: '🛋️',
  },
];
