import { container } from 'tsyringe';
import { Cache } from '$/infra/shared/library/cache';
import { ColorService } from '$/infra/post/service/color';
import { OembedService } from '$/infra/post/service/oembed';
import { TocService } from '$/infra/post/service/toc';
import { CodeService } from '$/infra/post/service/code';
import { HtmlService } from '$/infra/post/service/html';
import { Sitemap } from '$/infra/sitemap';
import { IndexPageProps } from '$/infra/pages/index/server';
import { PostPageProps } from '$/infra/pages/post/server';
import { AnyPageProps } from '$/infra/pages/any';
import { SitemapPageProps } from '$/infra/pages/sitemap';
import { RobotsPageProps } from '$/infra/pages/robots';
import { PostFactory } from '$/infra/post/factory';
import { PostManager } from '$/infra/post/manager';
import { MarkdownPostRepository } from '$/infra/post/repository/mdPost';
import { WordPressPostRepository } from '$/infra/post/repository/wpPost';
import { postSources } from '^/config/settings';

container.registerSingleton('ICache', Cache);
container.registerSingleton('IColorService', ColorService);
container.registerSingleton('IOembedService', OembedService);
container.registerSingleton('ITocService', TocService);
container.registerSingleton('ICodeService', CodeService);
container.registerSingleton('IHtmlService', HtmlService);
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
container.registerSingleton('IIndexPageProps', IndexPageProps);
container.registerSingleton('IPostPageProps', PostPageProps);
container.registerSingleton('IAnyPageProps', AnyPageProps);
container.registerSingleton('ISitemapPageProps', SitemapPageProps);
container.registerSingleton('IRobotsPageProps', RobotsPageProps);
