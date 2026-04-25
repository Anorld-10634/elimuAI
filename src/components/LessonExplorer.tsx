import { STEM_CONCEPTS } from '../constants';
import { Concept, UserProfile } from '../types';
import { BookOpen, Play, CheckCircle, Clock, BarChart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function LessonExplorer({ profile, setProfile }: { profile: UserProfile, setProfile: any }) {
  const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Explore Lessons</h2>
        <p className="text-gray-500">Master broad concepts with localized Sheng-style explanations.</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', ...subjects].map(s => (
          <button key={s} className={cn(
            "px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all",
            s === 'All' ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"
          )}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STEM_CONCEPTS.map((concept, i) => {
          const progress = profile.progress[concept.id] || 0;
          const isCompleted = progress === 100;

          return (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-white",
                      concept.subject === 'Physics' ? "bg-orange-500" : 
                      concept.subject === 'Chemistry' ? "bg-blue-500" :
                      concept.subject === 'Biology' ? "bg-green-500" : "bg-indigo-500"
                    )}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{concept.subject}</span>
                      <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{concept.title}</h3>
                    </div>
                  </div>
                  {isCompleted && (
                    <div className="bg-green-100 text-green-700 p-1 rounded-full">
                      <CheckCircle className="w-5 h-5 fill-current" />
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                  {concept.description}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                    <Clock className="w-3 h-3" />
                    15 min
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                    <BarChart className="w-3 h-3" />
                    {concept.difficulty}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      to={`/tutor?conceptId=${concept.id}`}
                      className="flex-1 bg-indigo-600 text-white text-sm font-bold p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors relative group"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      {progress > 0 ? 'Continue' : 'Start Lesson'}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-[9px] rounded-lg whitespace-nowrap pointer-events-none shadow-xl z-50"
                      >
                        {progress > 0 ? 'Resume where you left off' : 'Begin this adaptive STEM module'}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                      </motion.div>
                    </Link>
                    <button className="px-4 py-3 bg-white border border-gray-200 text-gray-400 rounded-xl hover:text-indigo-600 hover:border-indigo-600 transition-all relative group">
                      <CheckCircle className="w-5 h-5" />
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute bottom-full mb-3 right-0 px-2 py-1 bg-indigo-600 text-white text-[8px] font-bold uppercase rounded pointer-events-none whitespace-nowrap"
                      >
                        Mark Complete
                      </motion.div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
