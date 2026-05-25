const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';

export async function sendMessage(req, res) {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ollamaResponse = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: 'user', content: message.trim() }],
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error('Ollama error:', errorText);
      return res.status(502).json({
        error: 'Failed to get response from Ollama',
        details: errorText,
      });
    }

    const data = await ollamaResponse.json();
    const reply = data.message?.content;

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from Ollama' });
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error.message);

    if (error.cause?.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: 'Ollama is not running. Start it with: ollama serve',
      });
    }

    res.status(500).json({ error: 'Something went wrong on the server' });
  }
}
