import type { HeadingTagName } from '@jsdevtools/rehype-toc';

export type PostData = {
  source: string;
  id: string | number;
  postType?: string;
};
type Replace = {
  source?: string;
  from: string | RegExp;
  to: string;
};
type Exclude = PostData & {
  type?: string;
};
type UrlMap = {
  source: string;
  destination: PostData;
};
type PageData = PostData & {
  title: string;
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
  toc?: {
    postTypes?: string[];
    headings?: HeadingTagName[];
  };
  seo: SEO;
  breakpoints?: BreakPoints;
  analytics?: {
    googleAnalyticsId?: string;
  };
  advertising?: {
    googleAdsenseClientId?: string;
  };
  postType?: {
    default?: string;
    hideDate?: string[];
  };
  pages?: {
    header?: PageData[];
    footer?: PageData[];
  };
};
