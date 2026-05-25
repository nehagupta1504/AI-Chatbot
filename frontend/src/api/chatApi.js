import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function sendChatMessage(message) {
  const { data } = await api.post('/chat', { message });
  return data.reply;
}

export default api;
