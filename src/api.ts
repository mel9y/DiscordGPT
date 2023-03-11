import { getEnv } from './utils.ts';

export type Role = 'user' | 'system' | 'assistant';

export type ChatMessage = {
  role: Role;
  content: string;
};

const ChatCompletion = async (
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

export async function createChatReply(
  content: string,
  settingText = '',
  role: Role = 'user',
) {
  const messages: ChatMessage[] = [
    {
      role: role,
      content: content,
    },
    {
      role: 'system',
      content: settingText,
    },
  ];

  const res = await ChatCompletion(messages);
  if (!res) {
    throw new Error('APIからの応答がありませんでした。');
  }

  return res.content;
}
