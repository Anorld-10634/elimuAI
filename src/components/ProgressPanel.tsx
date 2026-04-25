import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { UserProfile } from '../types';
import { Trophy, Target, TrendingUp, Award } from 'lucide-react';
import { motion } from 'motion/react';

const SUBJECT_DATA = [
  { subject: 'Physics', knowledge: 45 },
  { subject: 'Chemistry', knowledge: 20 },
  { subject: 'Biology', knowledge: 100 },
  { subject: 'Maths', knowledge: 10 },
];

const PERFORMANCE_HISTORY = [
  { date: 'Mon', score: 65 },
  { date: 'Tue', score: 58 },
  { date: 'Wed', score: 72 },
  { date: 'Thu', score: 85 },
  { date: 'Fri', score: 78 },
  { date: 'Sat', score: 92 },
  { date: 'Sun', score: 95 },
];

export default function ProgressPanel({ profile }: { profile: UserProfile }) {
  return (
    <div className="space-y-8 pb-10">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Academic Progress</h2>
          <p className="text-gray-500">Checking footprints on your high road to success.</p>
        </div>
        <div className="flex gap-2">
           <div className="flex -space-x-2">
             {[1,2,3].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                  <Award className="w-4 h-4" />
               </div>
             ))}
           </div>
           <span className="text-xs font-bold text-indigo-600 self-center ml-2">+2 New Badges</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Completed Lessons', value: profile.completedAssessments.length, icon: Target, color: 'bg-blue-500' },
          { label: 'Average Score', value: '88%', icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Total XP', value: '2,400', icon: Trophy, color: 'bg-yellow-500' },
          { label: 'Focus Time', value: '12h', icon: Target, color: 'bg-indigo-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className={`${stat.color} w-8 h-8 rounded-lg flex items-center justify-center text-white mb-2 shadow-sm`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            Subject Mastery %
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUBJECT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="knowledge" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            Quiz Performance Trend
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERFORMANCE_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#ef4444" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 p-8 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold">Unlocking "Science Prodigy" Badge</h3>
          <p className="text-indigo-200 mt-2 max-w-md">You're just 2 assessments away from your next prestige rank. Path yako ya success iko clear!</p>
          <div className="relative inline-block group">
            <button className="mt-6 bg-white text-indigo-900 px-6 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-colors relative">
              Take Assessment Now
            </button>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              whileHover={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute top-full mt-3 left-0 px-4 py-2 bg-white text-indigo-900 text-[10px] font-bold rounded-xl shadow-2xl pointer-events-none whitespace-nowrap z-50 border border-indigo-100"
            >
              Launch a localized STEM evaluation
              <div className="absolute bottom-full left-6 border-8 border-transparent border-b-white" />
            </motion.div>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-32 h-32 bg-pink-500 rounded-full blur-[60px] opacity-20"></div>
      </div>
    </div>
  );
}
