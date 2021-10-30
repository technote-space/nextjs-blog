# My Tech Blog

[![CI Status](https://github.com/technote-space/nextjs-blog/workflows/CI/badge.svg)](https://github.com/technote-space/nextjs-blog/actions)
[![codecov](https://codecov.io/gh/technote-space/nextjs-blog/branch/main/graph/badge.svg)](https://codecov.io/gh/technote-space/nextjs-blog)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/nextjs-blog/badge)](https://www.codefactor.io/repository/github/technote-space/nextjs-blog)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/nextjs-blog/blob/main/LICENSE)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [デモ](#%E3%83%87%E3%83%A2)
- [動作要件](#%E5%8B%95%E4%BD%9C%E8%A6%81%E4%BB%B6)
  - [セットアップ](#%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)
- [記事](#%E8%A8%98%E4%BA%8B)
  - [Markdown](#markdown)
  - [WordPressのエクスポート機能で出力したXMLファイル](#wordpress%E3%81%AE%E3%82%A8%E3%82%AF%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%88%E6%A9%9F%E8%83%BD%E3%81%A7%E5%87%BA%E5%8A%9B%E3%81%97%E3%81%9Fxml%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB)
  - [WordPressのデータベース](#wordpress%E3%81%AE%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9)
  - [対応予定](#%E5%AF%BE%E5%BF%9C%E4%BA%88%E5%AE%9A)
- [Author](#author)

*generated with [TOC Generator](https://github.com/technote-space/toc-generator)*

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## デモ

https://nextjs-blog-technote-space.vercel.app/

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

contents ディレクトリ下に `.md` ファイルを追加

オフにする場合は `.env` の `MD_SOURCE` をコメントアウト

### WordPressのエクスポート機能で出力したXMLファイル

1. WordPressの 管理画面 > ツール > エクスポート からXML形式で全てのコンテンツをエクスポート
2. postsディレクトリなどに配置
3. 配置したファイルパスを `.env` の `WP_EXPORT_XML` に指定 (例：`export.xml`)
4. WordPress の `wp-content/uploads` を `public` にコピー (`public/wp-content/uploads`)
5. `.env` の `WP_XML_SOURCE` のコメントを外す

### WordPressのデータベース

既存の WordPress が稼働していて画像等にURLでアクセスできる前提です。

1. `.env` に接続情報を設定
   * `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_PORT`
2. `.env` の `WP_DB_SOURCE` のコメントを外す

### 対応予定

* microCMS
* WordPress REST API

## Author

[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
