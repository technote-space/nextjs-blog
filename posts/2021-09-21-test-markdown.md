---
title: "Markdown 記法のテスト"
createdAt: "2021-09-20"
updatedAt: "2021-09-21"
thumbnail: "https://user-images.githubusercontent.com/39912269/134110725-899217f2-03bb-44b7-a3bd-910b5d19c1a9.png"
tags: ["test"]
published: true
---

Markdownでも投稿できるようにしたのでそれの記法のテスト

---

## 見出し

見出し1 はカバー画像内のタイトル表示部分で使用するため使用しない

```markdown
## 見出し2

見出し2です。

### 見出し3

見出し3です。

#### 見出し4

見出し4です。

##### 見出し5

見出し5です。

###### 見出し6

見出し6です。
```

## 見出し2

見出し2です。

### 見出し3

見出し3です。

#### 見出し4

見出し4です。

##### 見出し5

見出し5です。

###### 見出し6

見出し6です。

## 段落

```markdown
これは1つ目の段落の1行目です。  
これは1つ目の段落の2行目です。

これは2つ目の段落の1行目です。  
これは2つ目の段落の2行目です。
```

これは1つ目の段落の1行目です。  
これは1つ目の段落の2行目です。

これは2つ目の段落の1行目です。  
これは2つ目の段落の2行目です。

## 順序無しリスト

```markdown
- 1
- 2
  - 2-1
  - 2-2
    - 2-2-1
    - 2-2-2
- 3
```

- 1
- 2
  - 2-1
  - 2-2
    - 2-2-1
    - 2-2-2
- 3

## 順序付きリスト

```markdown
1. 1
1. 2
  1. 2-1
  1. 2-2
    1. 2-2-1
    1. 2-2-2
1. 3
```

1. 1
1. 2
1. 2-1
1. 2-2
   1. 2-2-1
   1. 2-2-2
1. 3

## 引用

```markdown
> 引用1  
> 引用2
>> 引用の入れ子3  
>> 引用の入れ子4 
```

> 引用1  
> 引用2
>> 引用の入れ子3  
>> 引用の入れ子4

## コードブロック

~~~markdown
```javascript
console.log('Hello World!');
```
~~~

```javascript
console.log('Hello World!');
```

## テーブル

```markdown
| Left align | Right align | Center align |
|:-----------|------------:|:------------:|
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |
```

| Left align | Right align | Center align |
|:-----------|------------:|:------------:|
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |

## リンク

```markdown
 [リンク](https://example.com) 
```

[リンク](https://example.com)

## コード

```markdown
これはインラインの `console.log('Hello World!')` コード
```

これはインラインの `console.log('Hello World!')` コード

## 強い強調

```markdown
これは **強い強調** です。
```

これは **強い強調** です。

## 強調

```markdown
これは *強調* です。
```

これは *強調* です。

## 削除済みテキスト

```markdown
これは ~~削除済みテキスト~~ です。
```

これは ~~削除済みテキスト~~ です。

## 水平線

```markdown
これは水平線です。

---

これは水平線です。
```

これは水平線です。

---

これは水平線です。

## 画像

```markdown
これは ![猫に小判](https://user-images.githubusercontent.com/39912269/134110725-899217f2-03bb-44b7-a3bd-910b5d19c1a9.png) 画像です。
```

これは ![猫に小判](https://user-images.githubusercontent.com/39912269/134110725-899217f2-03bb-44b7-a3bd-910b5d19c1a9.png) 画像です。
