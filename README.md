# DiscordGPT

ChatGPT と Discord Bot を通して会話できます。

## TODO

- [ ] コードの最適化
- [ ] 2000文字以上の応答が帰ってきた際にテキストファイルとして送信する

## 注意

- 元々自分用に作ったBotなので、***かなり*** 不十分です。
  - OpenAI API 側との応答は問題なく行えます。
- 100文字以上のメッセージは ChatGPT に送れないようにしています。
  - あなたの財布を守るためです。
- Discord API の仕様上、 2000文字を超えるメッセージは送信できないため、ChatGPTの応答が2000文字以上だった場合はメッセージを送らず無視します。
  - これは今後、制限を回避してテキストファイルとして送信するよう変更する予定です。

## 使い方

```shell
<@BotのID> [メッセージ内容...]
```

- メッセージ内容ではスペース、改行を使用できます。
- 写真等の添付ファイルは OpenAI API 側に送信されないので使えません。
- **100文字以上のメッセージ送信はできません**
  - 100文字以上のメッセージを送信したいときは API を使わず、従来の [ChatGPT (Free Reseatch Preview)](https://chat.openai.com/chat) を使ってください。
- 使用しているモデルは `gpt-3.5-turbo` です。

詳しい詳細: [Chat completions - OpenAI Documention](https://platform.openai.com/docs/guides/chat)

## 環境変数

**DiscordGPT を使用するには OpenAI API の API Key が必要です** (当たり前ですが、 Discord API のトークンも必要です。)

[Billing overview - OpenAI API](https://platform.openai.com/account/billing/overview) から支払い方法を設定して **API Key を発行してください**。

また、 OpenAI API は使用した分請求される方式です。Discord Botなどの不特定多数が触れるようなもので使用する際は制限をかけることをおすすめします。

なお 現在APIで使用できるモデルは ChatGPT で使用されているモデル `gpt-3.5-turbo` のみ選択でき、1k (1000) トークンあたり `$0.002` 程度です。

詳しくは [Pricing - OpenAI](https://openai.com/pricing) の Faq を確認してください。

| 変数名 | 説明 |
| ----- | ----- |
| `DISCORD_TOKEN`   | Discord API のトークン |
| `API_KEY` | OpenAI API の キー |
