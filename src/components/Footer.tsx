import { motion } from 'framer-motion';
import { Github, Linkedin, Moon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-cyan-500/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Left side - Logo + Text (shifted more to the left) */}
          <div className="flex items-center space-x-2 pl-1">   {/* Added pl-1 for left shift */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Moon className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <span className="text-gray-400 text-sm">
              Created By Team Moonbow
            </span>
          </div>

          {/* Right side - Social Icons */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/MoonbowAgency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/moon-bow-8b5930400/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}