# twitch_bell_bot for MacOS

**!!CAUTION!! / 注意**  
**!!this readme might be incorrect / この README は正しくない可能性があります!!**

## Concept / コンセプト

1. Just double click and ready / ダブルクリックで起動するだけで使える
1. 初コメ時にベルを鳴らす（デフォルト 12 時間以上空いた
1. 特にお勧めしたい配信者がコメントをくれた時にベルと一緒にメッセージ表示
1. レイドが来た時に `!so {username}`　コマンドを自動で実行(5+sqrt(viewer 数)秒後に投稿)

## Requirement / 必要なもの

- all user
  - twitch IRC token( see <https://twitchapps.com/tmi/>
- (from source code / ソースコードから使う場合に必須
  - node(~12.6.0)
  - yarn(~1.15.2)

## How to use / 使い方

### 1. Install / インストール

#### Using binary / こちらでビルドした実行ファイルを使う

1. move to latest release / latest release に移動: https://github.com/allpaqa-jgk/twitch_bell_bot/releases/latest
   - download & unzip / zip で落として解凍
   - edit config/default.js / コンフィグファイルセットアップ

#### Using source / ソースコードから yarn, node で使う

1. download this repo / 下記の中から好きな方法でリポジトリをダウンロード
   1. clone / クローン
      - use HTTPS
        - `git clone https://github.com/allpaqa-jgk/twitch_bell_bot.git`
      - use SSH
        - `git clone git@github.com:allpaqa-jgk/twitch_bell_bot.git`
1. install node / node のインストール
   1. install using（homebrew を利用する場合
      - mac: run `brew install node`
   1. use `n` or `nodenv` / （`n`や`nodenv`を使いたい人はご自由にどうぞ
      - see <https://github.com/tj/n>
      - see <https://github.com/nodenv/nodenv>
1. install yarn / yarn というパッケージマネージャを入れる（別に npm でもいいっちゃいいんだけど
   1. run `npm install -g yarn`
1. install packages / パッケージのインストール
   1. move to dir of this repository / このファイルのあるフォルダへ移動
   1. run `yarn install` to install packages to `node_module` directory.

### 2. Setting / 初期設定・設定変更

1. copy config files

   - `default.sample.js` to `default.js`
   - `shoutOutList.sample.csv` to `shoutOutList.csv`

1. set up config/default.js

   - mode // 全般
     ```
     testMode = false; // テストモード テスト時は音を鳴らさない、SOメッセージをコメントしない
     bootSound = false; // 起動音の有効/無効
     ```
   - twitch // twitch 関連
     ```
     twitchOauthToken = "oauth:"; // twitch IRC token
     twitchUsername = ""; // twitch IRC tokenを取得したユーザー名
     twitchChannelName = ""; // botの接続するチャンネルID
     ```
   - firstCommentBell // ベル機能
     ```
     firstCommentBellIsActive = true; // ベル機能の有効/無効
     firstCommentBellSound = "bell"; // ベル通知オンファイル名
     firstCommentBellOnlyRegularViewer = true; // 履歴にないユーザーはベルを鳴らさない
     firstCommentBellDulation = 12 * 60 * 60 * 1000; // 前回のコメントから指定の時間以上経っていたらベルを鳴らす（デフォルト12時間
     firstCommentBellIgnoreList = [ // ベル機能からの除外ユーザーリスト（カンマ区切り
       // "your_username",
       // "username_of_your_bot",
       "streamlabs",
       "nightbot",
       "songlistbot",
       "streamelements",
     ];
     ```
   - firstCommentShoutOut // 初コメで紹介メッセージ投稿
     ```
     firstCommentShoutOutIsActive = true; // 有効/無効
     ```
   - firstCommentShoutOut // レイド時に自動でシャウトアウトコマンド実行 (`!so {username}` 固定)
     ```
     firstCommentShoutOutIsActive = true; // 有効/無効
     ```

1. setup data/shoutOutList.csv

   - `username, message` ユーザー名と、そのユーザーの初コメ時に投稿するメッセージを設定、１ユーザーに対して１行ずつ書き込む

### 3. Exec / 起動

#### Binary

1. double click twitch_bell_bot from finder

#### Source

1. start / スタート
   - move to repository dir / このリポジトリのディレクトリに移動
   - run `yarn start`
1. stop / 終了
   - push `ctrl - c` on your keyboard / キーボードで`ctrl - c`

### 4. Reset LastChatHistory / 最終チャット日時データのリセット

- delete `data/lastChatHistory.csv` / 履歴ファイル削除
