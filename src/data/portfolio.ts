export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveUrl?: string;
  image?: string;
}

export interface PortfolioSection {
  zoneId: string;
  title: string;
  subtitle: string;
  content: string;
  projects?: Project[];
  skills?: string[];
  links?: { label: string; url: string }[];
}

export const PORTFOLIO: Record<string, PortfolioSection> = {
  workstation: {
    zoneId: 'workstation',
    title: 'Software Projects',
    subtitle: 'Web applications & tools I\'ve built',
    content: 'Full-stack web applications and developer tools showcasing modern frameworks and clean architecture.',
    projects: [
      {
        title: 'Portfolio Website',
        description: 'This interactive 3D portfolio built with Next.js, React Three Fiber, and TypeScript.',
        techStack: ['Next.js', 'React Three Fiber', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/deepshah103/portfolio',
      },
      {
        title: 'Project 2',
        description: 'Description of your second project goes here.',
        techStack: ['React', 'Node.js', 'MongoDB'],
      },
      {
        title: 'Project 3',
        description: 'Description of your third project goes here.',
        techStack: ['Python', 'Flask', 'PostgreSQL'],
      },
    ],
  },
  'phone-dock': {
    zoneId: 'phone-dock',
    title: 'Android Apps',
    subtitle: 'Mobile applications for Android',
    content: 'Native Android applications built with Kotlin/Java, focused on usability and performance.',
    projects: [
      {
        title: 'Android App 1',
        description: 'Description of your Android app goes here.',
        techStack: ['Kotlin', 'Jetpack Compose', 'Firebase'],
      },
      {
        title: 'Android App 2',
        description: 'Description of your second app goes here.',
        techStack: ['Java', 'Android SDK', 'SQLite'],
      },
    ],
  },
  whiteboard: {
    zoneId: 'whiteboard',
    title: 'Computer Vision & Neural Networks',
    subtitle: 'Deep learning and image processing',
    content: 'Projects involving convolutional neural networks, object detection, image classification, and more.',
    projects: [
      {
        title: 'CV Project 1',
        description: 'Description of your computer vision project.',
        techStack: ['Python', 'PyTorch', 'OpenCV'],
      },
      {
        title: 'Neural Network Project',
        description: 'Description of your neural network project.',
        techStack: ['TensorFlow', 'Keras', 'NumPy'],
      },
    ],
  },
  'ai-corner': {
    zoneId: 'ai-corner',
    title: 'Generative AI',
    subtitle: 'LLMs, agents, and generative models',
    content: 'Projects leveraging large language models, prompt engineering, and generative AI pipelines.',
    projects: [
      {
        title: 'GenAI Project 1',
        description: 'Description of your generative AI project.',
        techStack: ['Python', 'LangChain', 'OpenAI API'],
      },
      {
        title: 'GenAI Project 2',
        description: 'Description of your second GenAI project.',
        techStack: ['Hugging Face', 'Transformers', 'FAISS'],
      },
    ],
  },
  'data-dashboard': {
    zoneId: 'data-dashboard',
    title: 'Data Science & ML',
    subtitle: 'Analytics, modeling, and insights',
    content: 'End-to-end data science projects from EDA to production ML models.',
    projects: [
      {
        title: 'ML Project 1',
        description: 'Description of your ML project.',
        techStack: ['Python', 'Scikit-learn', 'Pandas'],
      },
      {
        title: 'Data Analysis Project',
        description: 'Description of your data analysis project.',
        techStack: ['Python', 'Matplotlib', 'Seaborn'],
      },
    ],
  },
  bookshelf: {
    zoneId: 'bookshelf',
    title: 'About Me',
    subtitle: 'Background & interests',
    content: 'I\'m a Data Scientist passionate about building intelligent systems and turning data into actionable insights. I enjoy working at the intersection of software engineering and machine learning, creating products that make a real impact.',
  },
  lounge: {
    zoneId: 'lounge',
    title: 'Get In Touch',
    subtitle: 'Let\'s connect',
    content: 'Feel free to reach out for collaborations, opportunities, or just a chat about tech!',
    links: [
      { label: 'GitHub', url: 'https://github.com/deepshah103' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/' },
      { label: 'Email', url: 'mailto:deep@example.com' },
    ],
  },
  'skill-shelf': {
    zoneId: 'skill-shelf',
    title: 'Skills & Education',
    subtitle: 'Technical expertise & credentials',
    content: 'A blend of software engineering, data science, and AI/ML skills built through education and hands-on projects.',
    skills: [
      'Python', 'TypeScript', 'Java', 'Kotlin',
      'React', 'Next.js', 'Node.js',
      'PyTorch', 'TensorFlow', 'Scikit-learn',
      'SQL', 'MongoDB', 'Firebase',
      'Docker', 'Git', 'AWS',
      'Machine Learning', 'Deep Learning', 'NLP',
      'Computer Vision', 'Data Analysis', 'Statistics',
    ],
  },
};
