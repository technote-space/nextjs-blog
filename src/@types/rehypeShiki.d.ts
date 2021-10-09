declare module 'rehype-shiki' {
  import type { Root } from 'hast';
  import type { Plugin } from 'unified';
  declare const rehypeShiki: Plugin<[], string, Root>;
  export default rehypeShiki;
}
