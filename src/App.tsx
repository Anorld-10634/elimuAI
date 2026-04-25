/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  BarChart3, 
  Users, 
  Settings, 
  Sparkles,
  MessageCircle,
  Trophy,
  Layout,
  Menu,
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import ChatTutor from './components/ChatTutor';
import ProgressPanel from './components/ProgressPanel';
import CollaborationRoom from './components/CollaborationRoom';
import SettingsView from './components/SettingsView';
import LessonExplorer from './components/LessonExplorer';
import Login from './components/Login';
import { UserProfile } from './types';

const INITIAL_PROFILE: UserProfile = {
  name: 'Student',
  learningStyle: 'visual',
  streak: 0,
  progress: {},
  completedAssessments: []
};

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (o: boolean) => void }) {
  const location = useLocation();
  
  const menuItems = [
    { icon: Layout, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Lessons', path: '/lessons' },
    { icon: Sparkles, label: 'AI Tutor', path: '/tutor' },
    { icon: Users, label: 'Study Groups', path: '/collab' },
    { icon: BarChart3, label: 'My Progress', path: '/progress' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300",
        isOpen ? "w-64" : "w-0 lg:w-20 overflow-hidden"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            {isOpen && <span className="font-bold text-xl tracking-tight text-gray-900 line-clamp-1 text-nowrap">ElimuAI</span>}
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  location.pathname === item.path 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-gray-500 hover:bg-gray-100"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-6 h-6 shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold shrink-0">
                S
              </div>
              {isOpen && (
                <div className="overflow-hidden">
                  <p className="font-semibold text-sm text-gray-900 truncate">Student User</p>
                  <p className="text-xs text-gray-500">Gold Learner</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Dashboard({ profile }: { profile: UserProfile }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Karibu tena, {profile.name}! 👋</h1>
        <p className="text-gray-500 mt-1">Ready to master some complex STEM concepts today?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm font-medium">Daily Streak</p>
              <h3 className="text-4xl font-bold mt-1">{profile.streak} Days</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-4 text-sm text-orange-50) opacity-90 italic">Keep it up! Tunakaribia badge mpya.</p>
        </div>

        {/* Current Lesson */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Continuing Lesson
            </h3>
            <Link to="/lessons" className="text-indigo-600 text-sm font-medium hover:underline flex items-center relative group">
              View All <ChevronRight className="w-4 h-4" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileHover={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute -top-10 right-0 px-3 py-1 bg-gray-900 text-white text-[10px] rounded-lg whitespace-nowrap pointer-events-none z-30 shadow-xl"
              >
                Browse all STEM subjects
                <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900" />
              </motion.div>
            </Link>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold text-gray-800">Newton's Third Law</h4>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">Action-Reaction logic using Matatu examples.</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500 font-medium">Progress</span>
                <span className="text-indigo-600 font-bold">45%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  className="h-full bg-indigo-600"
                />
              </div>
            </div>
            <Link to="/tutor" className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors relative group">
              Continue Learning <Sparkles className="w-4 h-4" />
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-900 text-white text-[10px] rounded-xl whitespace-nowrap pointer-events-none z-30 shadow-2xl border border-indigo-400/30"
              >
                Resume your physics session with localized analogies
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-indigo-900" />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Jump Into Activity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/tutor" className="p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-indigo-600/5 rounded-xl flex items-center justify-center pointer-events-none z-10"
            />
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 mb-3 group-hover:bg-pink-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">Ask AI Tutor</h4>
            <p className="text-xs text-gray-500 mt-1">Get localized analogies for any topic.</p>
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-2 right-2 text-[8px] font-bold text-indigo-600 uppercase tracking-tighter"
            >
              Start Chat Session →
            </motion.span>
          </Link>
          <Link to="/collab" className="p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group relative">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">Study Groups</h4>
            <p className="text-xs text-gray-500 mt-1">Collaborate with students remotely.</p>
          </Link>
          <Link to="/tutor?action=quiz" className="p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer relative">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">AI Assessment</h4>
            <p className="text-xs text-gray-500 mt-1">Test your skill with creative quizzes.</p>
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-2 right-2 text-[8px] font-bold text-green-600 uppercase tracking-tighter"
            >
              Start Quiz →
            </motion.span>
          </Link>
          <Link to="/progress" className="p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-3 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-900">Performance</h4>
            <p className="text-xs text-gray-500 mt-1">Track your growth across subjects.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('elimu-user-profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('elimu-user-email');
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('elimu-user-profile', JSON.stringify(profile));
    }
  }, [profile, isAuthenticated]);

  const handleLogin = (email: string) => {
    localStorage.setItem('elimu-user-email', email);
    // If it's a new user, we might want to personalize the name from email
    if (profile.name === 'Student') {
      const namePart = email.split('@')[0];
      setProfile(prev => ({ ...prev, name: namePart.charAt(0).toUpperCase() + namePart.slice(1) }));
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('elimu-user-email');
    localStorage.removeItem('elimu-user-profile');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className={cn(
          "flex-1 transition-all duration-300 min-h-screen",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}>
          {/* Top Bar for Mobile */}
          <div className="lg:hidden p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-500">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-indigo-600">ElimuAI</span>
            <button onClick={handleLogout} className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
               <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="max-w-6xl mx-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard profile={profile} />} />
              <Route path="/tutor" element={<ChatTutor profile={profile} setProfile={setProfile} />} />
              <Route path="/lessons" element={<LessonExplorer profile={profile} setProfile={setProfile} />} />
              <Route path="/progress" element={<ProgressPanel profile={profile} />} />
              <Route path="/collab" element={<CollaborationRoom profile={profile} />} />
              <Route path="/settings" element={<SettingsView profile={profile} setProfile={setProfile} onLogout={handleLogout} />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
