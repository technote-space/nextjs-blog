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
type SEO = {
  blogTitle: string;
  author: string;
  description: string;
  blogImage?: string;
  twitter?: string;
};
type BreakPoints = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl'?: string;
  [key: string]: string | undefined;
}
export type Settings = {
  isIsr?: boolean;
  isrRevalidate?: number;
  siteUrl: string;
  replace?: Replace[];
  exclude?: Exclude[];
  urlMaps?: UrlMap[];
  seo: SEO;
  breakpoints?: BreakPoints;
  gaMeasurementId?: string;
};
