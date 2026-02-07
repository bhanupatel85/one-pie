import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Sparkles, Loader, Brain } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize chat when opened first time
      geminiService.startChat(isThinkingMode).then(() => {
        setMessages([{
          role: 'model',
          text: "Hey! I'm Reddy 🤖. Looking for a Naruto case or maybe something Spidey-themed? Ask me anything!"
        }]);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggleThinking = async () => {
    const newMode = !isThinkingMode;
    setIsThinkingMode(newMode);
    setLoading(true);
    
    // Re-initialize chat with new mode
    await geminiService.startChat(newMode);
    
    setMessages(prev => [
      ...prev,
      {
        role: 'model',
        text: newMode 
          ? "🧠 Deep Thinking Mode activated! I can now handle complex queries and comparisons." 
          : "⚡ Back to Flash mode for quick, snappy responses."
      }
    ]);
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await geminiService.sendMessage(userMsg);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ background: 'linear-gradient(135deg, #00f3ff 0%, #bc13fe 100%)' }}
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-slate-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-10 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-slate-800 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-neon to-brand-purple flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Reddy AI</h3>
                <p className="text-xs text-brand-neon">Online</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleThinking}
                className={`p-2 rounded-lg transition-all ${isThinkingMode ? 'text-brand-neon bg-brand-neon/10 ring-1 ring-brand-neon/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                title={isThinkingMode ? "Disable Thinking Mode" : "Enable Thinking Mode"}
              >
                <Brain className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-gray-200 border border-white/10 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin text-brand-neon" />
                    {isThinkingMode && <span className="text-xs text-brand-neon animate-pulse">Thinking...</span>}
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-800 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isThinkingMode ? "Ask a complex question..." : "Find me a cool case..."}
                className="flex-1 bg-slate-900 border border-white/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-neon placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-2 bg-brand-neon rounded-full text-black hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};