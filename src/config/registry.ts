import { container } from 'tsyringe';
import './registry.theme';
import { Cache } from '$/infra/shared/library/cache';
import { ColorService } from '$/infra/post/service/color';
import { OembedService } from '$/infra/post/service/oembed';
import { TocService } from '$/infra/post/service/toc';
import { FooterComponent } from '$/infra/app/layout/footer';
import { HeaderComponent } from '$/infra/app/layout/header';
import { LayoutComponent } from '$/infra/app/layout';
import { HeadComponent } from '$/infra/app/head';
import { AppService } from '$/infra/app/index';
import { GoogleAnalytics } from '$/infra/analytics/google';
import { GoogleAdsense } from '$/infra/advertising/google';
import { Sitemap } from '$/infra/sitemap';
import { IndexPage, IndexPageProps } from '$/infra/pages/index';
import { PostPage, PostPageProps } from '$/infra/pages/post';
import { AnyPageProps } from '$/infra/pages/any';
import { SitemapPageProps } from '$/infra/pages/sitemap';
import { RobotsPageProps } from '$/infra/pages/robots';
import { PostFactory } from '$/infra/post/factory';
import { PostManager } from '$/infra/post/manager';
import { MarkdownPostRepository } from '$/infra/post/repository/mdPost';
import { WordPressPostRepository } from '$/infra/post/repository/wpPost';
import { postSources } from '^/config/settings';
import { IOembedService } from '$/domain/post/service/oembed';

container.registerSingleton('ICache', Cache);
container.registerSingleton('IColorService', ColorService);
container.registerSingleton('IOembedService', OembedService);
container.registerSingleton('ITocService', TocService);
container.registerSingleton('IFooterComponent', FooterComponent);
container.registerSingleton('IHeaderComponent', HeaderComponent);
container.registerSingleton('ILayoutComponent', LayoutComponent);
container.registerSingleton('IHeadComponent', HeadComponent);
container.registerSingleton('IAppService', AppService);
container.registerSingleton('IAnalytics', GoogleAnalytics);
container.registerSingleton('IAdvertising', GoogleAdsense);
container.registerSingleton('ISitemap', Sitemap);
container.registerSingleton('IPostFactory', PostFactory);
container.registerSingleton('IPostManager', PostManager);
container.registerSingleton('MarkdownPostRepository', MarkdownPostRepository);
container.registerSingleton('WordPressPostRepository', WordPressPostRepository);
const availablePostSources: Record<string, string> = {
  'md': 'MarkdownPostRepository',
  'wp': 'WordPressPostRepository',
};
container.registerInstance('postRepositories', Object.assign({},
  ...Object.keys(postSources).filter(source => source in availablePostSources).map(source => ({
    [postSources[source]]: {
      sourceId: postSources[source],
      repository: availablePostSources[source],
    },
  }))),
);

// pages
container.registerSingleton('IIndexPage', IndexPage);
container.registerSingleton('IIndexPageProps', IndexPageProps);
container.registerSingleton('IPostPage', PostPage);
container.registerSingleton('IPostPageProps', PostPageProps);
container.registerSingleton('IAnyPageProps', AnyPageProps);
container.registerSingleton('ISitemapPageProps', SitemapPageProps);
container.registerSingleton('IRobotsPageProps', RobotsPageProps);
