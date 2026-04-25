import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Sparkles, User, Brain, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, Message } from '../types';
import { getTutorResponse, generateAssessment } from '../lib/gemini';
import { STEM_CONCEPTS } from '../constants';
import { cn } from '../lib/utils';

export default function ChatTutor({ profile, setProfile }: { profile: UserProfile, setProfile: any }) {
  const location = useLocation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Jambo, ${profile.name}! Mimi ni ElimuAI. Leo tutachunguza nini? I can explain chemistry, physics, and more using localized analogies just for you.`,
      timestamp: Date.now()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [assessment, setAssessment] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const conceptId = new URLSearchParams(location.search).get('conceptId');

  const updateProgress = (increment: number) => {
    if (!conceptId) return;
    setProfile((prev: UserProfile) => {
      const currentProgress = prev.progress[conceptId] || 0;
      const newProgress = Math.min(100, currentProgress + increment);
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [conceptId]: newProgress
        }
      };
    });
  };

  const startAssessment = async () => {
    setIsTyping(true);
    const concept = STEM_CONCEPTS.find(c => c.id === conceptId) || STEM_CONCEPTS[0];
    const data = await generateAssessment(concept.title);
    setAssessment(data);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsTyping(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'quiz') {
      startAssessment();
    }
  }, [location.search]);

  const handleAnswer = (index: number) => {
    if (index === assessment.questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finished
      const finalScore = score + (index === assessment.questions[currentQuestionIndex].correctAnswer ? 1 : 0);
      const percentage = Math.round((finalScore / assessment.questions.length) * 100);
      
      // Update progress based on score
      if (percentage >= 70) {
        updateProgress(20);
      } else if (percentage >= 40) {
        updateProgress(10);
      }

      const aiMsg: Message = {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Maliza! You scored ${finalScore}/${assessment.questions.length} (${percentage}%). ${percentage >= 70 ? 'Wewe ni mnoma sana! Keep it up.' : 'Punguza speed, rudia lesson kidogo alafu ujaribu tena.'}`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
      setAssessment(null);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.sender === 'ai' ? 'model' : 'user' as any,
      parts: [{ text: m.text }]
    }));

    const response = await getTutorResponse(input, history, {
      userName: profile.name,
      learningStyle: profile.learningStyle,
      conceptTitle: STEM_CONCEPTS.find(c => c.id === conceptId)?.title
    });

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: response,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
    
    // Each exchange adds 2% progress
    updateProgress(2);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <header className="p-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-none">ElimuAI Tutor</h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Sheng-English Adaptive Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="relative group">
             <button 
               onClick={startAssessment}
               className="px-2 py-1 rounded bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider hover:bg-orange-200 transition-colors"
             >
               Quiz Me!
             </button>
             <motion.div 
               initial={{ opacity: 0, x: 10 }}
               whileHover={{ opacity: 1, x: 0 }}
               className="absolute top-1/2 -translate-y-1/2 right-full mr-3 px-3 py-1.5 bg-orange-600 text-white text-[9px] font-bold rounded-lg whitespace-nowrap pointer-events-none shadow-lg z-50"
             >
               Start AI-powered test on this topic
               <div className="absolute top-1/2 -translate-y-1/2 left-full border-4 border-transparent border-l-orange-600" />
             </motion.div>
           </div>
           <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
             {profile.learningStyle} Style
           </span>
        </div>
      </header>

      {assessment && (
        <div className="absolute inset-0 z-20 bg-indigo-900/95 p-6 flex flex-col justify-center text-white overflow-y-auto">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div className="flex justify-between items-center bg-indigo-800/50 p-4 rounded-xl border border-indigo-700/50 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
              <span className="text-xs font-bold text-indigo-300">Score: {score}</span>
            </div>
            
            <h4 className="text-xl font-bold leading-relaxed">
              {assessment.questions[currentQuestionIndex].question}
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {assessment.questions[currentQuestionIndex].options.map((option: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full text-left p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all text-sm font-medium"
                >
                  {option}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setAssessment(null)}
              className="mt-6 text-indigo-300 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
            >
              Cancel Quiz
            </button>
          </div>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full mb-4",
                m.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "flex max-w-[85%] items-start gap-2",
                m.sender === 'user' ? "flex-row-reverse" : "flex-row"
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                  m.sender === 'user' ? "bg-indigo-600 text-white" : "bg-white border border-indigo-100 text-indigo-600 shadow-sm"
                )}>
                  {m.sender === 'user' ? <User className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl relative shadow-sm",
                  m.sender === 'user' 
                    ? "bg-indigo-600 text-white rounded-tr-none" 
                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                )}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  <div className={cn(
                    "text-[10px] mt-2 opacity-60",
                    m.sender === 'user' ? "text-right" : "text-left"
                  )}>
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center text-gray-400 text-xs font-medium ml-10 italic"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
            </div>
            ElimuAI is thinking...
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 italic text-[10px] text-gray-400 flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-indigo-400" />
        AI is using real-world African analogies to simplify complex math/science.
      </div>

      <div className="p-4 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about gravity, coding, or cells..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
