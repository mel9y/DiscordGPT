import { createBot, type GatewayIntents, Intents, startBot } from '../deps.ts';
import { logger } from './logger.ts';
import { chatAi } from './message/mod.ts';
import { getEnv } from './utils.ts';
import { Ids } from './message/api.ts';
import { reply } from './message/api.ts';

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

      if (content.split(' ')[1] == undefined) {
        logger.warning(
          `ID: [${ids.authorId}] のリクエストを却下しました (引数不足)`,
        );
        await reply(
          self.helpers,
          ids,
          'コマンドが正しくありません。詳しくは使い方を参照してください。\n' +
            '> <https://github.com/mel9y/DiscordGPT#使い方>',
          undefined,
          true,
        );
        return;
      }

      await chatAi(self.helpers, content, ids);
    },
  },
});

await startBot(client);
