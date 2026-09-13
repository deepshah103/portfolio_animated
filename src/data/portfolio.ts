export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveUrl?: string;
  image?: string;
  impact?: string;
  context?: string;
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

const GITHUB = 'https://github.com/deepshah103';

export const PORTFOLIO: Record<string, PortfolioSection> = {
  workstation: {
    zoneId: 'workstation',
    title: 'Software & Product Projects',
    subtitle: 'Production systems, web applications & tools',
    content:
      'A mix of production engineering, full-stack applications and personal products. I enjoy taking ideas from architecture to working software.',
    projects: [
      {
        title: 'Turbo Assistant',
        context: 'JPMorgan Chase · Software Developer III · 2025–Present',
        description:
          'Production enterprise AI assistant built around RAG, agent workflows and internal knowledge. The platform connects enterprise content, retrieves relevant context, orchestrates tools and APIs, and streams grounded answers with source citations.',
        techStack: [
          'Python', 'FastAPI', 'React', 'MongoDB', 'MongoDB Atlas Vector Search',
          'LangChain', 'LangGraph', 'Azure OpenAI', 'GPT-4/4o', 'AWS Bedrock',
          'Claude', 'AWS EKS', 'Kubernetes', 'SSE', 'RBAC', 'CI/CD',
        ],
        impact: 'Production enterprise RAG platform with document ingestion, connectors, agent workflows, streaming, citations and self-healing processing.',
      },
      {
        title: 'Unjha Reserve — Spice Ecommerce',
        context: 'Independent product',
        description:
          'Premium, origin-first whole-spice ecommerce MVP with a complete storefront, authentication, cart, checkout, order tracking and admin workflows.',
        techStack: [
          'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase Auth',
          'Firestore', 'Razorpay', 'Resend', 'Twilio WhatsApp', 'Vercel',
        ],
        github: 'https://github.com/deepshah103/spices',
        liveUrl: 'https://spices-lac.vercel.app',
        impact:
          'End-to-end ecommerce workflow including payment verification, inventory deduction, order management and notifications.',
      },
      {
        title: 'Deep Works Lab',
        context: 'Independent / portfolio lab',
        description:
          'Interactive engineering and AI lab concept with a 3D/animated portfolio experience, categorized work areas and an animated robot environment.',
        techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
        github: 'https://github.com/deepshah103/my_portfolio',
      },
      {
        title: 'Interactive 3D Portfolio',
        context: 'Independent',
        description:
          'This portfolio itself: an interactive 3D environment where visitors explore work through a virtual workspace, with an accessible flat version as a fallback.',
        techStack: ['Next.js', 'React', 'React Three Fiber', 'Three.js', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/deepshah103/portfolio_animated',
        liveUrl: 'https://deepshah103.github.io/portfolio_animated/',
      },
      {
        title: 'Dentist Website',
        context: 'Independent web project',
        description:
          'Static website prepared for GitHub Pages deployment, demonstrating lightweight responsive web development.',
        techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
        github: 'https://github.com/deepshah103/dental_care_for_you',
      },
      {
        title: 'Smart Goods Transportation',
        context: 'Academic / earlier engineering project',
        description:
          'Earlier software project maintained in a public GitHub repository. The repository is retained as an academic engineering project; technical claims beyond the repository name are intentionally kept conservative.',
        techStack: ['Software Engineering', 'GitHub'],
        github: 'https://github.com/deepshah103/Smart-Goods-Transportation',
      },
    ],
  },

  'phone-dock': {
    zoneId: 'phone-dock',
    title: 'Android Apps',
    subtitle: 'Mobile applications & practical automation',
    content:
      'Android projects focused on solving real workflows, including profile/biodata organization and candidate review.',
    projects: [
      {
        title: 'Biodata Sorter',
        context: 'Independent Android product',
        description:
          'A practical app for organizing biodatas and profile information. The workflow includes importing biodata/profile material, processing associated photos and folders, extracting information such as names and ages, browsing candidates, rating profiles and accepting or rejecting them.',
        techStack: ['Android', 'Kotlin/Java', 'Gradle', 'Local Data Processing'],
        impact:
          'Built around a real-world profile-review workflow rather than a tutorial/demo application.',
      },
      {
        title: 'Biodata Sorter 2',
        context: 'Independent · newer implementation',
        description:
          'The newer Android implementation of the Biodata Sorter project, maintained in a separate private GitHub repository.',
        techStack: ['Android', 'Gradle', 'Kotlin/Java'],
      },
      {
        title: 'Biodata Communication Assistant',
        context: 'Independent experiment',
        description:
          'A companion workflow around biodata sharing and communication, designed to make profile sharing, follow-ups and requests more structured.',
        techStack: ['Android', 'Automation', 'Messaging Workflow'],
      },
    ],
  },

  whiteboard: {
    zoneId: 'whiteboard',
    title: 'Computer Vision & Applied ML',
    subtitle: 'Machine learning systems that solve real product problems',
    content:
      'Applied computer vision and machine learning work spanning automated photo moderation, fraud/celebrity detection and data-driven matching.',
    projects: [
      {
        title: 'Photo Automation',
        context: 'Shaadi.com · Senior Data Scientist · 2021–2023',
        description:
          'Photo automation platform covering decency detection, fraud detection and celebrity detection using in-house ML models and cloud infrastructure.',
        techStack: ['Python', 'Machine Learning', 'Computer Vision', 'AWS', 'GCP'],
        impact:
          '80% increase in photo automation rate and 30% reduction in service cost. Recognized with Best Use of AI in Enhancing Customer Experience at Data Analytics and AI Show 2024.',
      },
      {
        title: 'Match Score',
        context: 'Shaadi.com · Senior Data Scientist',
        description:
          'Data-driven matchmaking and compatibility scoring using demographic, behavioral and compatibility signals to improve the relevance of profile matches.',
        techStack: ['Python', 'Machine Learning', 'Feature Engineering', 'Ranking', 'Recommendation Systems'],
      },
      {
        title: 'Titanic — PyTorch',
        context: 'Independent / learning project',
        description:
          'Early deep-learning project implementing a Titanic prediction workflow in PyTorch, with separated data and source-code structure.',
        techStack: ['Python', 'PyTorch', 'Machine Learning'],
        github: 'https://github.com/deepshah103/titanic_pytorch',
      },
    ],
  },

  'ai-corner': {
    zoneId: 'ai-corner',
    title: 'Generative AI & Agents',
    subtitle: 'LLMs, RAG, agent workflows and AI assistants',
    content:
      'Enterprise and personal GenAI work focused on turning language models into useful systems: grounded retrieval, agents, assistants, tool use, APIs and production deployment.',
    projects: [
      {
        title: 'Turbo Assistant',
        context: 'JPMorgan Chase · 2025–Present',
        description:
          'Enterprise RAG and agent platform combining retrieval, document ingestion, connectors, tool/API execution and streaming responses with source citations.',
        techStack: [
          'Azure OpenAI', 'GPT-4', 'GPT-4o', 'AWS Bedrock', 'Claude',
          'LangChain', 'LangGraph', 'MongoDB Atlas Vector Search',
          'FastAPI', 'React', 'Kubernetes', 'AWS EKS',
        ],
        impact:
          'Production-grade architecture with async workers, retries/self-healing, RBAC, citations and internal API shortcuts.',
      },
      {
        title: 'Enterprise GenAI Assistants & Agents',
        context: 'LTIMindtree / Microsoft · AI Engineer · 2024–2025',
        description:
          'Enterprise chatbots, virtual assistants and GenAI agents developed around GPT-4/GPT-4o, prompt engineering, data pipelines and API integrations.',
        techStack: [
          'GPT-4', 'GPT-4o', 'Azure', 'Prompt Engineering',
          'GenAI Agents', 'APIs', 'Data Pipelines', 'Azure Bicep',
        ],
      },
      {
        title: 'Personal AI / WhatsApp Chatbot',
        context: 'Independent GenAI project',
        description:
          'A personal conversational AI system designed to answer in my style and stay grounded in my own information. The system combines a chat interface and /chat backend with conversation history, retrieval-augmented generation, embeddings with BM25-style reranking, prompt construction, style-aware responses and Hindi/Devanagari handling. Earlier experimentation also explored LoRA fine-tuning and evaluation.',
        techStack: [
          'Python', 'LLMs', 'RAG', 'Embeddings', 'BM25 Reranking',
          'Prompt Engineering', 'NLP', 'LoRA', 'Chat UI', 'APIs',
        ],
      },
    ],
  },

  'data-dashboard': {
    zoneId: 'data-dashboard',
    title: 'Data Science & Trading Systems',
    subtitle: 'Trading research, market analytics & quantitative experiments',
    content:
      'Trading and quantitative projects belong here. This section is intentionally left empty until a project can be verified from the original portfolio/history, rather than filling the Trading Terminal with unrelated professional ML projects.',
    projects: [],
  },

  bookshelf: {
    zoneId: 'bookshelf',
    title: 'About Me',
    subtitle: 'Software Engineer · Data Scientist · AI Builder',
    content:
      'I build intelligent products at the intersection of software engineering, machine learning and generative AI. My work ranges from production enterprise AI systems and computer-vision platforms to Android apps and independent full-stack products.',
    links: [
      { label: 'GitHub', url: GITHUB },
      { label: 'Portfolio Repository', url: 'https://github.com/deepshah103/portfolio_animated' },
    ],
  },

  lounge: {
    zoneId: 'lounge',
    title: 'Get In Touch',
    subtitle: 'Let’s connect',
    content:
      'Feel free to reach out for collaborations, engineering opportunities, AI/ML discussions, or interesting product ideas.',
    links: [
      { label: 'GitHub', url: GITHUB },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/deepshah/' },
    ],
  },

  'coffee-terminal': {
    zoneId: 'coffee-terminal',
    title: 'Coffee Break',
    subtitle: 'Recharge before the next build',
    content:
      'A small break station in the workspace. Press E to make coffee and let the robot relax for a moment.',
  },

  'skill-shelf': {
    zoneId: 'skill-shelf',
    title: 'Skills & Education',
    subtitle: 'Technical expertise & credentials',
    content:
      'A blend of software engineering, data science and AI/ML built through production systems, independent products and formal study.',
    skills: [
      'Python', 'TypeScript', 'Java', 'Kotlin',
      'React', 'Next.js', 'FastAPI',
      'LangChain', 'LangGraph',
      'Azure OpenAI', 'AWS Bedrock', 'GPT-4', 'GPT-4o', 'Claude',
      'RAG', 'AI Agents', 'Prompt Engineering',
      'PyTorch', 'TensorFlow', 'Scikit-learn',
      'SQL', 'MongoDB', 'MongoDB Atlas Vector Search', 'Firebase',
      'AWS', 'Azure', 'EKS', 'Kubernetes', 'Docker', 'Git', 'CI/CD',
      'Machine Learning', 'Deep Learning', 'NLP',
      'Computer Vision', 'Recommendation Systems', 'Forecasting',
      'Data Analysis', 'Statistics',
    ],
  },
};
