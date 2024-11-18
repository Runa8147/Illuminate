import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Linkedin, X } from 'lucide-react';

const words = ["Only", "the", "brightest", "minds", "will", "enter"];

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showRiddle, setShowRiddle] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showSocial, setShowSocial] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowRiddle(true), 100);
    }
  }, [currentWordIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() === 'ecell') {
      setIsCorrectAnswer(true);
      setShowSocial(true);
      setIncorrectAttempts(0);
    } else {
      setHintMessage('Incorrect answer. Provide the correct answer to gain entry to Illuminate.');
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
      
      setIncorrectAttempts(prev => prev + 1);
      
      setShowSocial(true);
      setIsCorrectAnswer(false);
      
      if (incorrectAttempts >= 2) {
        setHintMessage("Take the first letters of each clue.");
      } else {
        setHintMessage("Not a phone, not a jail,\nBut a 'cell' where ideas sail!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 overflow-hidden">
      {/* Initial Animation */}
      <motion.div 
        initial={{ y: showRiddle ? -50 : 0 }}
        animate={{ y: showRiddle ? -50 : 0 }}
        className="flex flex-wrap justify-center items-center min-h-[50vh]"
      >
        {["UNLOCK", "YOUR", "OPPORTUNITY"].map((word, index) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 20 }}
            animate={index <= currentWordIndex ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-6xl mx-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Riddle Section */}
      <AnimatePresence>
        {showRiddle && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mt-8 p-6 rounded-lg border border-purple-500 shadow-lg backdrop-blur-sm bg-black/30"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 0px purple", "0 0 20px purple", "0 0 0px purple"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center mb-8"
            >
              <h2 className="text-xl font-bold mb-4 text-purple-400">💡 The Riddle</h2>
              <p className="text-gray-300 mb-4">
                "I am the home where ideas grow,<br/>
                I connect students and startups, you know.<br/>
                Your answer will reveal the truth."
              </p>
            </motion.div>

            <div className="space-y-4 text-sm text-gray-400">
              <p>🧩 Eager to empower young minds.</p>
              <p>🧩 Connecting innovation with collaboration.</p>
              <p>🧩 Entrepreneurship is in my DNA.</p>
              <p>🧩 Leaders of tomorrow start here.</p>
              <p>🧩 Learn, build, and grow with me.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <motion.input
                whileFocus={{ boxShadow: "0 0 15px purple" }}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 rounded bg-black/50 border border-purple-500 focus:outline-none focus:border-purple-400 text-white"
                placeholder="Enter your answer..."
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Social Links Modal */}
      <AnimatePresence>
        {showSocial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowSocial(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-gray-800 p-8 rounded-xl max-w-md w-full space-y-6 relative border border-purple-500"
            >
              <h3 className="text-2xl font-bold text-center mb-6 text-purple-400">
                🎉 Welcome to the Inner Circle!
              </h3>
              {isCorrectAnswer && (
                <p className="text-center text-gray-300 mb-4">
                  Join our WhatsApp group to get updates on Illuminate!
                </p>
              )}
              {isCorrectAnswer && (
                <a href="https://chat.whatsapp.com/LwAzAUmGAITC625WqO6f29" target="_blank" rel="noopener noreferrer" className="block w-full py-3 mt-6 text-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  Join us for Illuminate
                </a>
              )}
              {!isCorrectAnswer && (
                <p className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500/80 text-white px-6 py-3 rounded-lg">
                  {hintMessage}
                </p>
              )}
              <div className="flex justify-around mt-4">
                <a href="https://www.instagram.com/ecell_.jec?igsh=ejZoc2NyN3JzYWRr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Instagram className="w-6 h-6 text-pink-400" />
                </a>
                <a href="https://www.linkedin.com/company/e-cell-jec-iitb/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Linkedin className="w-6 h-6 text-blue-500" />
                </a>
                <a href="https://x.com/IedcE56917" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                  <X className="w-6 h-6 text-blue-400" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;