import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { sendChatMessage } from '../api/chatApi';

const WELCOME_MESSAGE = {
  id: 1,
  role: 'assistant',
  content:
    'Hello! I am your local AI assistant powered by Ollama (llama3). Ask me anything to get started.',
};

export default function ChatBox() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(trimmed);

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        'Failed to get a response. Is the backend and Ollama running?';
      setError(message);
    } finally {
      setIsLoading(false);
    }
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
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
            />
          ))}

          {isLoading && (
            <p className="text-sm text-gray-500 text-center py-2">
              AI is thinking...
            </p>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
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
            disabled={isLoading}
            className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition disabled:opacity-60"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="shrink-0 rounded-xl bg-emerald-600 px-5 py-3 text-sm sm:text-base font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </footer>
    </div>
  );
}
