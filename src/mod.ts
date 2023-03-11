import { createBot, type GatewayIntents, Intents, startBot } from '../deps.ts';
import { ChatCompletion, ChatMessage } from './api.ts';
import { getEnv } from './utils.ts';

const intent: GatewayIntents = Intents.Guilds | Intents.GuildMessages |
  Intents.MessageContent;

const client = createBot({
  token: getEnv('DISCORD_TOKEN'),
  intents: intent,
  events: {
    ready() {
      console.log('Successfully connected to gateway');
    },
  },
});

client.events.messageCreate = async function (self, message) {
  if (
    message.isFromBot || message.guildId == undefined ||
    !message.content.startsWith(`<@${self.id}>`)
  ) {
    return;
  }

  const messages = message.content.split(' ');
  messages.shift();
  const chatMessage = messages.join();

  if (chatMessage.length > 100) {
    await self.helpers.sendMessage(message.channelId, {
      content:
        '> **Error:** 文字数オーバーです。100文字以内で入力してください。',
      messageReference: {
        messageId: message.id,
        failIfNotExists: true,
      },
    });
    return;
  }

  const chatReply: ChatMessage[] = [
    {
      role: 'user',
      content: chatMessage,
    },
  ];

  const res = await ChatCompletion(chatReply);
  if (!res) {
    await self.helpers.sendMessage(message.channelId, {
      content: '> **Error:** APIからの応答がありませんでした。',
      messageReference: {
        messageId: message.id,
        failIfNotExists: true,
      },
    });
    return;
  }

  await self.helpers.sendMessage(message.channelId, {
    content: res.content,
    messageReference: {
      messageId: message.id,
      failIfNotExists: true,
    },
  });
};

await startBot(client);
