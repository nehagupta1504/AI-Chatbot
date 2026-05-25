import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

const DEMO_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Hello! I am your local AI assistant powered by Ollama (llama3). Ask me anything to get started.',
  },
  {
    id: 2,
    role: 'user',
    content: 'Can you explain what React hooks are?',
  },
  {
    id: 3,
    role: 'assistant',
    content:
      'React hooks let you use state and other React features inside function components. We will connect real AI responses in a later step!',
  },
];

export default function ChatBox() {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            AI Chatbot
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Powered by Ollama · llama3
          </p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center text-gray-500">
              <p className="text-lg font-medium text-gray-700">
                Start a conversation
              </p>
              <p className="text-sm mt-1">
                Type a message below and press Send.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Sticky input */}
      <footer className="shrink-0 border-t border-gray-200 bg-white px-4 py-4">
        <form
          onSubmit={handleSend}
          className="mx-auto max-w-3xl flex gap-2 sm:gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="shrink-0 rounded-xl bg-emerald-600 px-5 py-3 text-sm sm:text-base font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
