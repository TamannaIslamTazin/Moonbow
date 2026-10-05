import { motion } from 'framer-motion';
import { Bot, Zap, Brain, Globe, FlaskConical, Moon } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Chatbot Development',
    description:
      'Build bots for Telegram, WhatsApp, Messenger, Email, and Websites with advanced conversational AI.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Zap,
    title: 'Workflow Automation (No-Code)',
    description:
      'Streamline your business processes using Zapier, Make, Typebot, and Botpress.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Brain,
    title: 'Custom AI Systems',
    description:
      'RAG based context-aware chatbots and intelligent AI tools.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Globe,
    title: 'AI Website Assistant',
    description:
      'Chatbots that understand and respond about your website services intelligently.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: FlaskConical,
    title: 'AI Research & Projects',
    description:
      'ML/DL thesis implementation, code development, and industrial AI solutions.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function ServicesPage() {
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
              Our Services
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge AI solutions tailored to transform your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
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
                  y: -12,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="group relative p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-4`}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                    <span>For more details contact us</span>
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
