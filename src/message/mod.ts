import { FinalHelpers } from '../../deps.ts';
import { editReply, Ids, reply } from './api.ts';
import { createChatReply } from '../api.ts';
import { createTextfile } from './attachment.ts';
import { logger } from '../logger.ts';

export async function chatAi(helpers: FinalHelpers, content: string, ids: Ids) {
  let settingContext = '';
  const args = content.split(' ');
  args.shift();

  if (args[0] === '-s') {
    settingContext = args[1];
    args.splice(args.indexOf('-s'), 2);
  }

  const chatMessage = args.join();

  if (chatMessage.length > 200) {
    logger.warning(
      `ID: [${ids.authorId}] のリクエストを却下しました (文字数制限:チャットメッセージ)`,
    );
    await reply(helpers, ids, '文字数オーバーです', undefined, true);
    return;
  }

  // ChatGPT の思考中であることがわかるようにする
  logger.info(`ID: [${ids.authorId}] のリクエストを承認しました`);
  const anserReply = await reply(helpers, ids, '*思考中.....*');

  const anser = await createChatReply(chatMessage, settingContext);
  // 2000文字以上は Discord API の仕様上、送信できないため
  if (anser.length > 2000) {
    logger.warning(
      `ID: [${ids.authorId}] のリクエストの処理が完了しました (2000文字超過)`,
    );
    await reply(
      helpers,
      ids,
      'ChatGPT からの回答が2000文字を超過しました\n' +
        'Discord API の仕様上、 2000文字以上のメッセージは送信できないため、テキストファイルとして送信します',
      createTextfile(anser),
    );
    return;
  }

  await editReply(helpers, ids.channelId, anserReply.id, anser);
  logger.info(
    `ID: [${ids.authorId}] のリクエストの処理が完了しました`,
  );
}
