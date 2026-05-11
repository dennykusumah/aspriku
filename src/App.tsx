/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Bell, 
  Settings, 
  FileText, 
  Bot, 
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Send,
  X,
  User,
  Loader2
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const RobotAssistant = ({ onClick }: { onClick: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use MotionValues for smooth reactive tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Update MotionValues directly
        mouseX.set((e.clientX - centerX) / (window.innerWidth / 2));
        mouseY.set((e.clientY - centerY) / (window.innerHeight / 2));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth springs linked to the manual MotionValues
  const springConfig = { damping: 25, stiffness: 120 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Transformations for the body and eyes
  const rotateX = useTransform(mouseYSpring, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], [-15, 15]);
  const eyeX = useTransform(mouseXSpring, [-1, 1], [-3, 3]);
  const eyeY = useTransform(mouseYSpring, [-1, 1], [-2, 2]);

  return (
    <div 
      ref={containerRef} 
      onClick={onClick}
      className="fixed top-20 right-2 md:top-24 md:right-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer group z-[80]"
    >
      {/* Glow effect */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-primary-light/20 blur-xl rounded-full group-hover:bg-primary-light/40 transition-colors" 
      />
      
      <motion.div
        style={{ rotateX, rotateY, perspective: 1000 }}
        animate={{ 
          y: [0, -5, 0],
          x: [-3, 3, -3],
          rotateZ: [-5, 5, -5]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative z-10 w-12 h-12 md:w-16 md:h-16"
      >
        <motion.div
          animate={{ rotateY: [0, 0, 360, 360] }}
          transition={{ 
            rotateY: { 
              duration: 15, 
              repeat: Infinity, 
              times: [0, 0.9, 1, 1],
              ease: "easeInOut"
            }
          }}
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Arms */}
          <motion.div 
            animate={{ rotateZ: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -left-2 top-[40%] w-1.5 h-4 md:w-2 md:h-6 bg-primary-blue rounded-full border border-white/30 origin-top shadow-sm"
          />
          <motion.div 
            animate={{ rotateZ: [20, -20, 20] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -right-2 top-[40%] w-1.5 h-4 md:w-2 md:h-6 bg-primary-blue rounded-full border border-white/30 origin-top shadow-sm"
          />

          {/* Robot Body */}
          <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center border-b border-slate-200 group-hover:border-primary-light/30 transition-colors relative z-10">
          <div className="bg-primary-blue w-10 h-8 md:w-12 md:h-10 rounded-lg flex flex-col items-center justify-center p-1 relative overflow-hidden ring-1 ring-slate-50 group-hover:ring-primary-light/20">
            {/* Face/Screen */}
            <div className="bg-slate-900 w-full h-full rounded-md flex items-center justify-center gap-1 relative overflow-hidden">
              {/* Eyes Container */}
              <motion.div 
                style={{ x: eyeX, y: eyeY }}
                className="flex gap-1.5"
              >
                <motion.div 
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }} 
                  transition={{ duration: 5, repeat: Infinity, times: [0, 0.95, 0.97, 0.99, 1] }}
                  className="w-1 h-1 md:w-1.5 md:h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.9)]" 
                />
                <motion.div 
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }} 
                  transition={{ duration: 5, repeat: Infinity, times: [0, 0.95, 0.97, 0.99, 1] }}
                  className="w-1 h-1 md:w-1.5 md:h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.9)]" 
                />
              </motion.div>
            </div>
          </div>
          
          {/* Antennas */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-0.5 h-2 bg-slate-300 rounded-full" />
            <div className="w-0.5 h-3 bg-slate-400 rounded-full relative">
              <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-red-500 rounded-full shadow-sm" />
            </div>
          </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Click Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -bottom-1 bg-primary-blue text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm pointer-events-none whitespace-nowrap"
      >
        ASPRIKU
      </motion.div>
    </div>
  );
};

const ChatBot = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Halo! Saya asisten ASPRIKU. Ada yang bisa saya bantu terkait standardisasi atau penilaian kesesuaian?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Clear session when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMessages([
          { role: 'assistant', content: 'Halo! Saya ASPRIKU. Ada yang bisa saya bantu terkait standardisasi atau RSNI hari ini?' }
        ]);
      }, 500); // Wait for exit animation
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      const stream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "Anda adalah ASPRIKU (Asisten Pintar Standardisasi dan Penilaian Kesesuaian). Tugas Anda adalah membantu pengguna memahami tentang standardisasi, SNI (Standar Nasional Indonesia), dan proses penilaian kesesuaian di Indonesia. Jawablah dengan ramah, profesional, dan informatif.",
        }
      });

      let fullText = "";
      for await (const chunk of stream) {
        const text = chunk.text;
        fullText += text;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.role === 'assistant') {
            return [...prev.slice(0, -1), { role: 'assistant', content: fullText }];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan teknis. Silakan coba lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed md:top-24 md:bottom-auto md:right-6 md:left-auto inset-x-4 top-1/2 -translate-y-1/2 md:translate-y-0 w-auto md:w-96 h-[500px] max-h-[80vh] bg-white rounded-3xl shadow-2xl z-[100] border border-slate-200 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-primary-blue p-4 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">ASPRIKU Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-white/70 font-medium">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-primary-light text-white' : 'bg-white text-primary-dark'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-blue text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.content ? (
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (isLoading && msg.role === 'assistant' ? (
                      <div className="flex gap-1 py-1">
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      </div>
                    ) : null)}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tulis pesan..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary-blue/30 outline-none transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-primary-blue text-white p-2 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 text-center">Powered by Gemini AI • ASPRIKU v2.0</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  delay,
  onClick
}: { 
  title: string; 
  description: string; 
  icon: any; 
  gradient: string;
  delay: number;
  onClick?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -8, scale: 1.02 }}
    onClick={onClick}
    className={`relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl p-5 md:p-8 h-40 md:h-64 text-white shadow-lg md:shadow-xl ${gradient}`}
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 md:opacity-20 group-hover:opacity-40 transition-opacity">
      <Icon size={80} className="md:w-[120px] md:h-[120px]" strokeWidth={1} />
    </div>
    
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="bg-white/20 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner overflow-hidden">
        <Icon className="text-white md:w-8 md:h-8" size={20} />
      </div>
      
      <div>
        <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 tracking-tight">{title}</h3>
        <p className="text-white/80 text-[10px] md:text-sm leading-tight md:leading-relaxed max-w-[150px] md:max-w-[200px]">
          {description}
        </p>
      </div>
    </div>
    
    <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
        <ChevronRight size={20} />
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-3d-world font-sans selection:bg-primary-light/20 overflow-hidden">
      {/* Generator RSNI Modal */}
      <AnimatePresence>
        {isGeneratorModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full overflow-hidden flex flex-col"
            >
              {/* Floating Close Button */}
              <button 
                onClick={() => setIsGeneratorModalOpen(false)}
                className="fixed top-4 right-4 z-[210] w-8 h-8 bg-primary-blue text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-white/30"
              >
                <X size={16} strokeWidth={3} />
              </button>

              <div className="flex-1 bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <Loader2 className="animate-spin text-primary-light" size={48} />
                </div>
                <iframe 
                  src="https://generator-rsni.streamlit.app/?embed=true" 
                  className="w-full h-full border-none relative z-10"
                  title="Generator RSNI"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Knowledge Assistant Modal */}
      <AnimatePresence>
        {isKnowledgeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full overflow-hidden flex flex-col"
            >
              {/* Floating Close Button */}
              <button 
                onClick={() => setIsKnowledgeModalOpen(false)}
                className="fixed top-4 right-4 z-[210] w-8 h-8 bg-primary-blue text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-white/30"
              >
                <X size={16} strokeWidth={3} />
              </button>

              <div className="flex-1 bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <Loader2 className="animate-spin text-primary-light" size={48} />
                </div>
                <iframe 
                  src="https://sni-companion.vercel.app/" 
                  className="w-full h-full border-none relative z-10"
                  title="SNI Knowledge Assistant"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 3D Background Elements */}
      <div className="grid-plane" />
      <div className="horizon-glow" />
      
      {/* Floating 3D Shapes */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="fixed top-1/4 left-10 w-16 h-16 bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-lg z-0 opacity-50 pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="fixed bottom-1/4 right-10 w-24 h-24 bg-primary-blue/10 backdrop-blur-sm rounded-full border border-primary-blue/20 shadow-xl z-0 opacity-40 pointer-events-none"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-primary-blue text-white py-3 md:py-4 px-4 md:px-12 flex items-center justify-between z-[70] shadow-lg">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center p-1 shadow-md">
            <div className="bg-primary-blue w-full h-full rounded flex items-center justify-center">
              <Bot size={22} className="md:w-7 md:h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-widest leading-none flex items-center gap-2">
              ASPRIKU
            </h1>
            <p className="text-[8px] md:text-[10px] text-white/70 font-medium tracking-wider mt-0.5 md:mt-1">
              ASisten Pintar standaRdIsasi dan penilaian KesesUaian
            </p>
          </div>
        </div>

      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center max-w-6xl mx-auto px-6 h-full relative z-10 w-full overflow-hidden md:pt-16">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-8 mt-12 md:mt-4"
        >
          <h2 className="text-xl md:text-5xl font-extrabold text-slate-800 mb-1 md:mb-3 tracking-tight">
            Selamat Datang di <span className="text-primary-light">ASPRIKU!</span>
          </h2>

        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-8 w-full max-w-4xl mx-auto px-2 md:px-4 pb-2 md:pb-4">
          <FeatureCard 
            title="Generator RSNI"
            description="Memformat & Menerjemahan Dokumen Standar ISO Menjadi Draft RSNI Secara Otomatis"
            icon={FileText}
            gradient="bg-gradient-to-br from-cyan-500/90 to-blue-600/90"
            delay={0.2}
            onClick={() => setIsGeneratorModalOpen(true)}
          />
          <FeatureCard 
            title="SNI Companion"
            description="Asisten AI untuk mencari informasi seputar SNI"
            icon={GraduationCap}
            gradient="bg-gradient-to-br from-orange-400/90 to-red-500/90"
            delay={0.4}
            onClick={() => setIsKnowledgeModalOpen(true)}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-12 opacity-10 pointer-events-none hidden lg:block">
          <Sparkles size={120} className="text-primary-blue animate-pulse" />
        </div>
        <div className="absolute bottom-0 -right-24 opacity-5 pointer-events-none hidden lg:block">
          <LayoutDashboard size={200} className="text-primary-blue" />
        </div>
      </main>

      {/* Fixed Robot Assistant */}
      <RobotAssistant onClick={() => setIsChatOpen(true)} />

      {/* Chat Component */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Footer */}
      <footer className="relative bg-white/40 backdrop-blur-md border-t border-slate-200 py-3 md:py-4 px-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] text-slate-400 font-medium z-[60] mt-auto">
        <div className="flex gap-4 mb-2 md:mb-0">
          <span>© 2026 ASPRIKU</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> System Online</span>
        </div>
        <div className="flex gap-4 md:gap-6">
          <a href="https://docs.google.com/document/d/1qB9mf25uvLuZ4diYEWMam4WXF1kqy7s8rinSQrUBlHc/edit?usp=sharing" className="hover:text-primary-blue underline-offset-4 hover:underline">Panduan Pengguna</a>
          <a href="https://docs.google.com/document/d/16gtHfOofgHX2QmJys0JEN9KI46osA2L3dZoKWgtICCw/edit?usp=sharing" className="hover:text-primary-blue underline-offset-4 hover:underline">Kebijakan Privasi</a>
          <a href="https://bsn.go.id/main" className="hover:text-primary-blue underline-offset-4 hover:underline">Kontak Kami</a>
        </div>
      </footer>
    </div>
  );
}
