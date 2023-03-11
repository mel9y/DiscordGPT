import { Bot } from '../../deps.ts';
import { editReply, Ids, reply } from './api.ts';
import { createChatReply } from '../api.ts';
import { createTextfile } from './attachment.ts';

export async function chatAi(self: Bot, content: string, ids: Ids) {
  const args = content.split(' ');
  args.shift();
  const chatMessage = args.join();

  if (chatMessage.length > 200) {
    await reply(self.helpers, ids, '文字数オーバーです。', undefined, true);
  }

  // ChatGPT の思考中であることがわかるようにする
  const anserReply = await reply(self.helpers, ids, '*思考中.....*');

  const anser = await createChatReply(chatMessage);
  // 2000文字以上は Discord API の仕様上、送信できないため。
  if (anser.length > 2000) {
    await reply(
      self.helpers,
      ids,
      'ChatGPT からの回答が2000文字を超過しました。\n' +
        'Discord API の仕様上、 2000文字以上のメッセージは送信できないため、テキストファイルとして送信します。',
      createTextfile(anser),
    );
    return;
  }

  await editReply(self.helpers, ids.channelId, anserReply.id, anser);
}
