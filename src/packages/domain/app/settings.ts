export type Replace = {
  source?: string;
  from: string | RegExp;
  to: string;
};
export type Settings = {
  blogTitle: string;
  author: string;
  replace?: Replace[];
}
