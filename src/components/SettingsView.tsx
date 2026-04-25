import { UserProfile, LearningStyle } from '../types';
import { User, Brain, Mail, Bell, Shield, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export default function SettingsView({ profile, setProfile, onLogout }: { profile: UserProfile, setProfile: any, onLogout: () => void }) {
  const learningStyles: { id: LearningStyle, label: string, desc: string }[] = [
    { id: 'visual', label: 'Visual Learner', desc: 'I enjoy diagrams, charts and mental images.' },
    { id: 'auditory', label: 'Auditory Learner', desc: 'Tell me stories and use conversational tones.' },
    { id: 'kinesthetic', label: 'Kinesthetic Learner', desc: 'Focus on experiments and physical world analogies.' },
    { id: 'reading/writing', label: 'Reading/Writing', desc: 'Give me structured notes and clear definitions.' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500">Kurekebisha account yako kulingana na mahitaji yako.</p>
      </header>

      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
           <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-2xl font-bold">
             {profile.name[0]}
           </div>
           <div>
             <h3 className="font-bold text-gray-900 text-lg uppercase tracking-tight">{profile.name} Profile</h3>
             <p className="text-gray-500 text-sm">Nairobi, Kenya • Student Level</p>
           </div>
           <button className="ml-auto text-xs font-bold text-indigo-600 border border-indigo-200 px-3 py-1 rounded-full hover:bg-indigo-50 transition-colors">
              Edit Photo
           </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
            <input 
              type="text" 
              value={profile.name}
              onChange={e => setProfile({...profile, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 px-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          Learning Intelligence
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {learningStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setProfile({...profile, learningStyle: style.id})}
              className={cn(
                "w-full p-4 rounded-2xl border transition-all text-left group",
                profile.learningStyle === style.id 
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" 
                  : "bg-white border-gray-100 hover:border-indigo-300"
              )}
            >
              <div className="flex justify-between items-center">
                <span className={cn(
                  "font-bold text-sm",
                  profile.learningStyle === style.id ? "text-white" : "text-gray-900"
                )}>{style.label}</span>
                {profile.learningStyle === style.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <p className={cn(
                "text-xs mt-1",
                profile.learningStyle === style.id ? "text-indigo-100" : "text-gray-500"
              )}>{style.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 px-2 pb-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          Security & Others
        </h3>
        {[
          { icon: Mail, label: 'Email Notifications', desc: 'Progress reports and assignments.' },
          { icon: Bell, label: 'Push Notifications', desc: 'Study group alerts and reminders.' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-300 transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <ChevronRight className="ml-auto w-5 h-5 text-gray-300" />
          </div>
        ))}
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 hover:bg-red-600 hover:text-white transition-all group mt-4"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-current group-hover:bg-white/10">
             <LogOut className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">Sign Out from ElimuAI</span>
        </button>
      </section>
    </div>
  );
}
