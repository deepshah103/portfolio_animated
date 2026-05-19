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
    position: [0, 0, -8],
    radius: 2.5,
    interactionPoint: [0, 0, -6],
    description: 'Software Projects & Websites',
    icon: '💻',
  },
  {
    id: 'phone-dock',
    name: 'Mobile Terminal',
    position: [5, 0, -5],
    radius: 2,
    interactionPoint: [4, 0, -4],
    description: 'Android Applications',
    icon: '📱',
  },
  {
    id: 'whiteboard',
    name: 'Neural Wall',
    position: [-8, 0, -4],
    radius: 2.5,
    interactionPoint: [-7, 0, -3],
    description: 'CV & Neural Network Projects',
    icon: '🧠',
  },
  {
    id: 'ai-corner',
    name: 'AI Corner',
    position: [-5, 0, -8],
    radius: 2,
    interactionPoint: [-4, 0, -7],
    description: 'Generative AI Projects',
    icon: '🤖',
  },
  {
    id: 'data-dashboard',
    name: 'Data Dashboard',
    position: [-9, 0, 3],
    radius: 2.5,
    interactionPoint: [-8, 0, 3],
    description: 'Data Science & ML Projects',
    icon: '📊',
  },
  {
    id: 'bookshelf',
    name: 'About Me',
    position: [7, 0, -8],
    radius: 2.5,
    interactionPoint: [6, 0, -7],
    description: 'Overview & Background',
    icon: '📖',
  },
  {
    id: 'lounge',
    name: 'Contact',
    position: [6, 0, 2],
    radius: 2.5,
    interactionPoint: [5, 0, 2],
    description: 'Get In Touch',
    icon: '✉️',
  },
  {
    id: 'skill-shelf',
    name: 'Skills & Certs',
    position: [-3, 0, -9],
    radius: 2.5,
    interactionPoint: [-3, 0, -8],
    description: 'Skills, Education & Certifications',
    icon: '🎓',
  },
  {
    id: 'bed',
    name: 'Rest Zone',
    position: [7, 0, 6],
    radius: 2,
    interactionPoint: [7, 0, 6],
    description: 'Recharging...',
    icon: '😴',
  },
  {
    id: 'coding-desk',
    name: 'Coding Desk',
    position: [3, 0, -9],
    radius: 2,
    interactionPoint: [3, 0, -8],
    description: 'Writing Code',
    icon: '⌨️',
  },
];
