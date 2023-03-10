import { getEnv } from './utils.ts';

export type ChatMessage = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

export const ChatCompletion = async (
  messages: ChatMessage[],
): Promise<ChatMessage | undefined> => {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getEnv('API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      model: 'gpt-3.5-turbo',
    }),
  }).then((res) => res.json());

  const choice = 0;
  return res.choices[choice].message;
};
