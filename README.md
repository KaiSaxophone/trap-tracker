# 捕獲機ど〜こだ？

保護団体等の内部チームで、各捕獲機（動物用の捕獲機）の保管者を共同管理するためのアプリ。認証なし・URLを知っていれば誰でも閲覧・編集可能な少人数内部ツール。

## セットアップ

### 1. Firebaseプロジェクトの準備

1. [Firebase console](https://console.firebase.google.com/) で新規プロジェクトを作成
2. Firestore Database を作成（本番モードでOK。ルールは後述の `firestore.rules` をデプロイして上書きする）
3. Storage を有効化
4. 「ウェブアプリを追加」で設定値（apiKey など）を取得

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、取得した設定値を記入する。

```
cp .env.example .env.local
```

### 3. 依存関係のインストール

```
npm install
```

### 4. Firestore / Storage のルールをデプロイ

Firebase CLI がインストールされていない場合は `npm install -g firebase-tools` でインストールし、`firebase login` 後に以下を実行。

```
firebase deploy --only firestore:rules,storage
```

## 開発

```
npm run dev
```

## デプロイ（GitHub Pages）

```
npm run build
npm run deploy
```

`gh-pages` パッケージが `dist/` を `gh-pages` ブランチへpushする。GitHubリポジトリの Settings > Pages で `gh-pages` ブランチを公開ソースに設定しておくこと。
