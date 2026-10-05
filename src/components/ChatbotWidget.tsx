import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CHATBOT_API, CLEAR_SESSION_API } from '../config';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);   // New: for auto-focus

  // Load or generate unique session ID
  useEffect(() => {
    let sid = localStorage.getItem('moonbot_session');
    if (!sid) {
      sid = uuidv4();
      localStorage.setItem('moonbot_session', sid);
    }
    setSessionId(sid);
  }, []);

  // Load saved UI messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('moonbot_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          id: '1',
          text: "Hi there! I'm MoonBot — how can I help you explore Moon Bow?",
          sender: 'bot',
          timestamp: Date.now(),
        },
      ]);
    }
  }, []);

  // Save last 10 UI messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const lastTenMessages = messages.slice(-10);
      localStorage.setItem('moonbot_messages', JSON.stringify(lastTenMessages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Clear backend session AND UI messages on tab/browser close
  useEffect(() => {
    const cleanup = () => {
      localStorage.removeItem('moonbot_messages');

      if (sessionId && CLEAR_SESSION_API) {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            CLEAR_SESSION_API,
            JSON.stringify({ session_id: sessionId })
          );
        } else {
          fetch(CLEAR_SESSION_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId }),
            keepalive: true,
          });
        }
      }
    };

    window.addEventListener('beforeunload', cleanup);
    return () => window.removeEventListener('beforeunload', cleanup);
  }, [sessionId]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(CHATBOT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I'm here to help! Tell me more about what you need.",
        sender: 'bot',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm currently offline, but I'll be back soon! In the meantime, feel free to explore our services or please contact moonbow717@gmail.com for your queries",
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Re-focus input after sending
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-violet-500 via-cyan-500 to-white shadow-lg shadow-cyan-500/50 flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Moon className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:bottom-24 md:right-6 z-50 md:w-96 h-[calc(100vh-2rem)] md:h-[500px] rounded-2xl backdrop-blur-lg bg-black/80 border border-cyan-500/30 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-violet-600 to-cyan-600 px-4 md:px-4 py-3 md:py-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Moon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <span className="text-white font-bold text-sm md:text-base">MoonBot</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors p-1"
              >
                <X className="w-5 h-5 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] px-3 md:px-4 py-2 md:py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                    ) : (
                      <div className="text-xs md:text-sm leading-relaxed prose prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            strong: ({ children }) => (
                              <strong className="font-bold">{children}</strong>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 font-bold underline hover:text-gray-700 break-all transition-colors"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-r from-violet-600 to-white text-gray-900 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 md:p-4 border-t border-cyan-500/30">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}                     // Added for auto-focus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type message..."
                  className="flex-1 px-3 md:px-4 py-2 md:py-2 rounded-full bg-gray-900/50 border border-cyan-500/30 text-white placeholder-gray-500 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isLoading || !sessionId}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 md:px-4 py-2 md:py-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}