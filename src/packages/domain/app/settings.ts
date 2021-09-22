type Replace = {
  source?: string;
  from: string | RegExp;
  to: string;
};
type Exclude = {
  source: string;
  type?: string;
  id: string;
};
type UrlMap = {
  source: string;
  destination: {
    source: string;
    id: string | number;
  };
};
export type Settings = {
  blogTitle: string;
  author: string;
  replace?: Replace[];
  exclude?: Exclude[];
  urlMaps?: UrlMap[];
};
