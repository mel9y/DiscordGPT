import { logger } from './logger.ts';
import { getEnv } from './utils.ts';

export type Role = 'user' | 'system' | 'assistant';

export type ChatMessage = {
  role: Role;
  content: string;
};

type Context = {
  userContext: string;
  assistantContext: string;
  settingContext: string;
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
    // role 'system' は常に上に設定しておく必要があるとのこと
    // https://discord.com/channels/974519864045756446/1084115275940647012/1084124811732713583
    {
      role: 'system',
      content: settingText,
    },
    {
      role: role,
      content: content,
    },
  ];

  const res = await ChatCompletion(messages);
  if (!res) {
    throw new Error('APIからの応答がありませんでした。');
  }

  const repostContext: Context = {
    settingContext: settingText,
    userContext: content,
    assistantContext: res.content,
  };

  report(repostContext);

  return res.content;
}

function report(context: Context) {
  if (context.userContext.length + context.assistantContext.length > 500) {
    logger.warning('コンテキストが大きすぎるため、レポートは送信しません。');
    return;
  }

  logger.info('Report ===============');
  logger.info('[System] ---> ' + context.settingContext);
  logger.info('[User] ---> ' + context.userContext);
  logger.info('[Assistant] ---> ' + context.assistantContext);
  logger.info('======================');
}
