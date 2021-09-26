---
title: "ブログカードのテスト"
createdAt: "2021-09-25"
updatedAt: "2021-09-25"
thumbnail: "/images/pet_cat_sit.png"
tags: ["test"]
published: true
---

投稿内に埋め込まれたURLの動作テスト

---

## 普通のサイト

https://zenn.dev/

https://zenn.dev/zenn/articles/editor-guide

https://qiita.com/

https://qiita.com/Qiita/items/c686397e4a0f4f11683d

https://hatenablog.com/

https://blog.hatenablog.com/entry/2021/08/19/170000

https://github.com/

https://github.com/vercel/next.js/

## 404のサイト

### ドメインは生きている場合

https://docs.github.com/ja/articles/software-in-virtual-environments-for-github-actions

### ドメインも死んでいる場合

https://test.invalid/123

## コード内のURLはブログカード化されない

~~~markdown
```json
{
  "url": "https://example.com"
}
```
~~~

```json
{
  "url": "https://example.com"
}
```

~~~markdown
```html
<p><a href="https://example.com">https://example.com</a></p>
```
~~~

```html
<p><a href="https://example.com">https://example.com</a></p>
```
