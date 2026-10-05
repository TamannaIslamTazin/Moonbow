import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, User, Mail, Briefcase, MessageSquare, Send } from 'lucide-react';
import { FORM_API } from '../config';

interface FormData {
  name: string;
  email: string;
  service: string;
  discord: string;
  socialMedia: string;
}

export default function RequestPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    discord: '',
    socialMedia: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(FORM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: "🌙 Your request has been sent to Moon Bow — we'll contact you soon!",
        });
        setFormData({
          name: '',
          email: '',
          service: '',
          discord: '',
          socialMedia: '',
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: "🚀 Oops! Something went wrong. Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Moon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-white bg-clip-text text-transparent">
              Request a Project
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Tell us about your project and we'll bring it to life
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300"
        >
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-white font-semibold mb-2">
                <Moon className="w-5 h-5 text-cyan-400" />
                <span>Your Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-white font-semibold mb-2">
                <Moon className="w-5 h-5 text-cyan-400" />
                <span>Email Address</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-white font-semibold mb-2">
                <Moon className="w-5 h-5 text-cyan-400" />
                <span>Services You Want</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="chatbot">Chatbot</option>
                  <option value="ai-website-assistant">AI Website Assistant</option>
                  <option value="workflow-automation">Workflow Automation</option>
                  <option value="research-project">Research Project</option>
                  <option value="custom-ai-system">Custom AI System</option>
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-white font-semibold mb-2">
                <Moon className="w-5 h-5 text-cyan-400" />
                <span>Discord Name</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="yourname#1234"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-white font-semibold mb-2">
                <Moon className="w-5 h-5 text-cyan-400" />
                <span>Preferred Social Media</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  placeholder="Telegram / LinkedIn / Fiverr / Upwork"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
            </motion.button>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl border ${
                message.type === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
}
