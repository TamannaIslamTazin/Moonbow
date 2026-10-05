import { motion } from 'framer-motion';
import { Moon, Brain, Cpu, Database, Code } from 'lucide-react';

const technologies = [
  { name: 'TensorFlow', icon: Brain, color: 'from-orange-500 to-red-500' },
  { name: 'PyTorch', icon: Cpu, color: 'from-red-500 to-pink-500' },
  { name: 'Scikit-learn', icon: Database, color: 'from-blue-500 to-cyan-500' },
  { name: 'LangChain', icon: Code, color: 'from-violet-500 to-purple-500' },
];

const researchAreas = [
  {
    title: 'Deep Learning Research',
    description:
      'Neural networks, CNN, RNN, transformers for computer vision, NLP, and time series analysis.',
  },
  {
    title: 'Machine Learning Solutions',
    description:
      'Classification, regression, clustering, and recommendation systems with production-ready code.',
  },
  {
    title: 'Thesis Implementation',
    description:
      'Complete implementation of ML/DL research papers with documentation and experiments.',
  },
  {
    title: 'Industrial AI Projects',
    description:
      'Custom AI solutions for real-world business problems with scalability and deployment.',
  },
];

export default function ResearchPage() {
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
              AI Research
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced machine learning and deep learning solutions for academic and
            industrial applications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Technologies We Master
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 180,
                    damping: 12
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="flex flex-col items-center p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                >
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${tech.color} mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-white font-semibold">{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Research Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 140,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-white/10 border border-cyan-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Academic Excellence
          </h2>
          <p className="text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
            We specialize in implementing ML/DL research papers, providing complete
            code for thesis projects, and developing custom AI solutions for
            industrial applications. Our team combines academic rigor with
            practical implementation skills to deliver production-ready systems.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
