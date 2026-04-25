import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { UserProfile, Message } from '../types';
import { Users, Send, Hash, MessageSquare, StickyNote, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function CollaborationRoom({ profile }: { profile: UserProfile }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState('Anza kuandika notes hapa... Everyone can see this shared space.');
  const [activeMembers, setActiveMembers] = useState<string[]>(['AI Tutor Bot', 'Student A', 'Student B']);
  const roomId = 'stem-biology-group-1'; // Static for demo
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io(); // Connects to same host
    setSocket(newSocket);

    newSocket.emit('join-room', roomId);

    newSocket.on('receive-message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    newSocket.on('notes-updated', (data: { notes: string }) => {
      setNotes(data.notes);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    const msg: Message = {
      id: Date.now().toString(),
      sender: profile.name,
      text: input,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, msg]);
    socket.emit('send-message', { ...msg, roomId });
    setInput('');
  };

  const handleNoteChange = (newNotes: string) => {
    setNotes(newNotes);
    socket?.emit('update-notes', { roomId, notes: newNotes });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
      {/* Sidebar - Channels & Members */}
      <div className="hidden lg:flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <header className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-gray-900">Study Hub</h3>
        </header>
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          <section>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Live Channels</h4>
            <div className="space-y-1">
              {['general', 'biology-study', 'question-bank'].map(ch => (
                <button key={ch} className={cn(
                  "w-full flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors",
                  ch === 'biology-study' ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:bg-gray-100"
                )}>
                  <Hash className="w-4 h-4" />
                  {ch}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Online sasa ({activeMembers.length})</h4>
            <div className="space-y-3">
              {activeMembers.map(m => (
                <div key={m} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                    {m[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{m}</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 ml-auto"></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 flex flex-col gap-4 h-full">
        <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <header className="p-4 border-b border-gray-100 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-gray-900">Biology Study Chat</h3>
            </header>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
               <div className="text-center py-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-gray-50 mb-4">
                 Soga za Kikundi zimeanza
               </div>
               <AnimatePresence>
                {messages.map(m => (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col mb-2"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-xs text-indigo-600">{m.sender}</span>
                      <span className="text-[10px] text-gray-400">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-0.5">{m.text}</p>
                  </motion.div>
                ))}
               </AnimatePresence>
            </div>

            <div className="p-4 bg-gray-50">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message to the group..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  onClick={sendMessage}
                  className="absolute right-2 top-1.5 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Shared Notes Area */}
          <div className="hidden lg:flex flex-col w-[300px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm shadow-indigo-100/50">
            <header className="p-4 border-b border-gray-100 flex items-center gap-2 bg-yellow-50/50">
              <StickyNote className="w-5 h-5 text-yellow-600" />
              <h3 className="font-bold text-gray-900">Shared Pad</h3>
            </header>
            <textarea
              value={notes}
              onChange={e => handleNoteChange(e.target.value)}
              className="flex-1 p-4 text-sm text-gray-700 bg-yellow-50/30 font-medium resize-none focus:outline-none leading-relaxed"
              placeholder="Start collaborating on notes here..."
            />
            <div className="p-3 bg-yellow-100/50 text-[10px] text-yellow-700 font-bold border-t border-yellow-200 text-center">
              SYNCED WITH ALL PEERS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
