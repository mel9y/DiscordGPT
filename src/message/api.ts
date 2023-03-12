import { BigString, FileContent, FinalHelpers } from '../../deps.ts';

export type Ids = {
  authorId: BigString;
  channelId: BigString;
  messageId: BigString;
};

export async function reply(
  helper: FinalHelpers,
  id: Ids,
  msg: string,
  attachment?: FileContent,
  errorMsg = false,
) {
  let message = msg;
  if (errorMsg) {
    message = '> **Error:** ' + msg;
  }

  return await helper.sendMessage(id.channelId, {
    content: message,
    file: attachment,
    messageReference: {
      messageId: id.messageId,
      failIfNotExists: true,
    },
  });
}
export async function editReply(
  helper: FinalHelpers,
  channelId: BigString,
  messageId: BigString,
  msg: string,
  errorMsg = false,
) {
  let message = msg;
  if (errorMsg) {
    message = '> **Error:** ' + msg;
  }

  await helper.editMessage(channelId, messageId, { content: message });
}
