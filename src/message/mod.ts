import { FinalHelpers } from '../../deps.ts';
import { editReply, Ids, reply } from './api.ts';
import { createChatReply } from '../api.ts';
import { createTextfile } from './attachment.ts';

export async function chatAi(helpers: FinalHelpers, content: string, ids: Ids) {
  const args = content.split(' ');
  args.shift();

  const chatMessage = args.join();

  if (chatMessage.length > 200) {
    await reply(helpers, ids, '文字数オーバーです。', undefined, true);
    return;
  }

  // ChatGPT の思考中であることがわかるようにする
  const anserReply = await reply(helpers, ids, '*思考中.....*');

  const anser = await createChatReply(chatMessage);
  // 2000文字以上は Discord API の仕様上、送信できないため。
  if (anser.length > 2000) {
    await reply(
      helpers,
      ids,
      'ChatGPT からの回答が2000文字を超過しました。\n' +
        'Discord API の仕様上、 2000文字以上のメッセージは送信できないため、テキストファイルとして送信します。',
      createTextfile(anser),
    );
    return;
  }

  await editReply(helpers, ids.channelId, anserReply.id, anser);
}
