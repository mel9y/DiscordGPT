import { createBot, type GatewayIntents, Intents, startBot } from '../deps.ts';
import { logger } from './logger.ts';
import { chatAi } from './message/mod.ts';
import { getEnv } from './utils.ts';
import { Ids } from './message/api.ts';

const intent: GatewayIntents = Intents.Guilds | Intents.GuildMessages |
  Intents.DirectMessages | Intents.MessageContent;

const client = createBot({
  token: getEnv('DISCORD_TOKEN'),
  intents: intent,
  events: {
    ready() {
      logger.info('Successfully connected to gateway');
    },
    async messageCreate(self, msg) {
      if (msg.isFromBot || msg.guildId == undefined) {
        return;
      }

      const content = msg.content;
      if (
        !content.startsWith(`<@${self.id}>`) && !content.startsWith('!chat')
      ) return;

      const ids: Ids = {
        authorId: msg.authorId,
        messageId: msg.id,
        channelId: msg.channelId,
      };

      await chatAi(self.helpers, content, ids);
    },
  },
});

await startBot(client);
