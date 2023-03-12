# DiscordGPT

ChatGPT と Discord Bot を通して会話できます。

> **Warning**
>
> これは趣味で作っていることに注意。

## インストール

### Docker Compose

```shell
git clone https://github.com/mel9y/DiscordGPT.git
cd DiscordGPT
docker compose up -d
```

### Docker Image

DiscordGPT の Docker Image は ghcr.io にプッシュしているので `docker pull` で取得できます。

```shell
docker pull ghcr.io/mel9y/discordgpt:latest
docker run ...
```

その場でビルドして使うこともできます。

```shell
git clone https://github.com/mel9y/DiscordGPT.git
cd DiscordGPT
docker build ./ -t discordgpt
docker run ...
```

## 使い方

```
<@BotのID> <-s 設定内容> [メッセージ内容...]
or
!chat <-s 設定内容> [メッセージ内容...]
```

- ChatGPT に聞いてみたいことをメッセージ内容に設定します。
  - メッセージ内容ではスペース、改行を使用できます。
- ChatGPT の感情等を設定したいときは `-s` をメッセージの第2引数にして、そのあとに設定内容を指定します。
  - 設定内容ではスペース、改行は使えません。万が一含まれていた場合はメッセージ内容として OpenAI API に送信されます。
- ChatGPT は Markdown 記法を理解します。コードブロック等も理解します。
- 写真等の添付ファイルは OpenAI API 側に送信されないので使えません。
- **200文字以上のメッセージ送信はできません**
  - 200文字以上のメッセージを送信したいときは API を使わず、従来の [ChatGPT (Free Reseatch Preview)](https://chat.openai.com/chat) を使ってください。
- 使用しているモデルは `gpt-3.5-turbo` です。
- 2000文字以上の回答は Discord API の仕様上、そのままでは送信できないためテキストファイルを生成、添付ファイルとして送信します。

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
