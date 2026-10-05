import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  category: string;
}

const projects: Project[] = [
  {
    title: 'Telegram Support Bot',
    description:
      'Intelligent customer support bot handling 10,000+ queries daily with 95% accuracy. Features multi-language support, context-aware responses, and seamless CRM integration.',
    techStack: ['Python', 'Telegram API', 'LangChain', 'PostgreSQL'],
    category: 'Chatbot',
  },
  {
    title: 'CRM Lead Collector',
    description:
      'Automated lead capture system integrating multiple platforms, qualifying prospects, and syncing data to CRM with real-time notifications and analytics dashboard.',
    techStack: ['Make.com', 'Zapier', 'HubSpot API', 'Webhook'],
    category: 'Automation',
  },
  {
    title: 'AI Research Assistant',
    description:
      'Advanced ML model for academic research, processing 1000+ papers, extracting insights, generating summaries, and providing citation recommendations.',
    techStack: ['PyTorch', 'Transformers', 'LangChain', 'FastAPI'],
    category: 'Research',
  },
  {
    title: 'E-commerce Chat Assistant',
    description:
      'Shopping assistant providing product recommendations, order tracking, and personalized experiences with 40% increase in conversion rates.',
    techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    category: 'Chatbot',
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Moon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-white bg-clip-text text-transparent">
              Our Projects
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world AI solutions delivering measurable results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 150,
                damping: 15
              }}
              whileHover={{
                scale: 1.03,
                y: -8,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="group relative p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30">
                <span className="text-cyan-400 text-sm font-semibold">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 pr-32">
                {project.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
                    +{project.techStack.length - 3} more
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center text-cyan-400 font-semibold">
                <span>View Details</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full p-8 rounded-2xl backdrop-blur-lg bg-black/90 border border-cyan-500/50"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-semibold">
                  {selectedProject.category}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
