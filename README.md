# NextJs Blog

[![CI Status](https://github.com/nextjs-blog/nextjs-blog/workflows/CI/badge.svg)](https://github.com/nextjs-blog/nextjs-blog/actions)
[![codecov](https://codecov.io/gh/nextjs-blog/nextjs-blog/branch/main/graph/badge.svg)](https://codecov.io/gh/nextjs-blog/nextjs-blog)
[![CodeFactor](https://www.codefactor.io/repository/github/nextjs-blog/nextjs-blog/badge)](https://www.codefactor.io/repository/github/nextjs-blog/nextjs-blog)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/nextjs-blog/nextjs-blog/blob/main/LICENSE)

NextJs で作ったブログ

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
  - [WordPressのデータベース](#wordpress%E3%81%AE%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9)
  - [対応予定](#%E5%AF%BE%E5%BF%9C%E4%BA%88%E5%AE%9A)
- [Author](#author)

*generated with [TOC Generator](https://github.com/technote-space/toc-generator)*

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
