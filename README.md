# NextJs Blog

NextJs で作ったブログ

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->

## デモ

準備中...

## 動作要件

- Node.js >= 14
- yarn = 1.x

### セットアップ
   ```bash
   make setup
   ```

nvm の設定と package のインストール

## 記事

いくつかの方法で表示する記事を追加できます。

### Markdown

posts ディレクトリ下に `.md` ファイルを追加

### WordPressのデータベース

1. `.env` に接続情報を設定
2. `src/config/settings.ts` の postSources の wp のコメントを外す

### 対応予定

* WordPressのエクスポート機能で出力されたxml
* microCMS

## Author

[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
