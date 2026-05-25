export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm sm:text-base leading-relaxed shadow-sm ${
          isUser
            ? 'bg-gray-800 text-white rounded-br-md'
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
        }`}
      >
        {!isUser && (
          <span className="block text-xs font-semibold text-emerald-600 mb-1">
            AI Assistant
          </span>
        )}
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  );
}
