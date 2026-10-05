import { motion } from 'framer-motion';
import { Moon, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-cyan-900/20" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center space-x-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Moon className="w-12 h-12 text-cyan-400" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-white bg-clip-text text-transparent">
              Moon Bow
            </h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-12 h-12 text-violet-400" />
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Building Intelligent Chatbots and Automations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            We craft AI chatbots, automate workflows, and build intelligent
            solutions for your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => onNavigate('services')}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Explore Services
            </motion.button>
            <motion.button
              onClick={() => onNavigate('request')}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-cyan-500 text-cyan-400 font-semibold text-lg hover:bg-cyan-500/10 transition-all duration-300"
            >
              Talk to MoonBow Team
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: '🤖', title: 'AI Chatbots', desc: 'Intelligent conversational AI' },
            { icon: '⚡', title: 'Automation', desc: 'Streamline your workflows' },
            { icon: '🔬', title: 'Research', desc: 'Custom AI solutions' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1 + index * 0.2,
                type: 'spring',
                stiffness: 150,
                damping: 12
              }}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
