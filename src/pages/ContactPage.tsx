import { motion } from 'framer-motion';
import { Moon, Github, Linkedin, Globe, MessageSquare, Facebook, Instagram } from 'lucide-react';

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: MessageSquare,
    url: 'https://wa.me/01773923604',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/share/1CQu9DVpz2/',
    gradient: 'from-blue-600 to-blue-500',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/moonbow717/',
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
  },

  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/moon-bow-8b5930400/',
    gradient: 'from-blue-700 to-blue-500',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/MoonbowAgency',
    gradient: 'from-gray-700 to-gray-500',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Moon className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-white bg-clip-text text-transparent">
              Get in Touch
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16 p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-white/10 border border-cyan-500/30"
        >
          <MessageSquare className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Need help? Ask MoonBot
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Your AI assistant is ready to help you 24/7
          </p>
          <p className="text-gray-400">
            Click the glowing moon icon in the bottom-right corner to start a
            conversation with MoonBot, or use the chat widget on any page to get
            instant answers about our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Connect With Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.08,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -8,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  <motion.div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${link.gradient} mb-3 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <p className="text-white font-semibold">{link.name}</p>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center justify-center space-x-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <Moon className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <p className="text-gray-400 text-lg">
            Team Moonbow - Bringing you stellar service and support, one moonbeam at a time.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
