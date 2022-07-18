import { container } from 'tsyringe';
import { AnyPageProps } from '$/infra/pages/any';
import { CardPageProps } from '$/infra/pages/card/server';
import { IndexPageProps } from '$/infra/pages/index/server';
import { PostPageProps } from '$/infra/pages/post/server';
import { RobotsPageProps } from '$/infra/pages/robots';
import { SitemapPageProps } from '$/infra/pages/sitemap';
import { TagPageProps } from '$/infra/pages/tag/server';
import { PostFactory } from '$/infra/post/factory';
import { MarkdownPostRepository } from '$/infra/post/repository/mdPost';
import { WordPressExportPostRepository } from '$/infra/post/repository/wpExport';
import { WordPressPostRepository } from '$/infra/post/repository/wpPost';
import { CodeService } from '$/infra/post/service/code';
import { ColorService } from '$/infra/post/service/color';
import { HtmlService } from '$/infra/post/service/html';
import { OembedService } from '$/infra/post/service/oembed';
import { TocService } from '$/infra/post/service/toc';
import { XmlService } from '$/infra/post/service/xml';
import { Cache } from '$/infra/shared/library/cache';
import { Slack } from '$/infra/shared/library/slack';
import { Sitemap } from '$/infra/sitemap';
import { postSources } from '^/config/settings';

container.registerSingleton('ICache', Cache);
container.registerSingleton('ISlack', Slack);
container.registerSingleton('IColorService', ColorService);
container.registerSingleton('IOembedService', OembedService);
container.registerSingleton('ITocService', TocService);
container.registerSingleton('ICodeService', CodeService);
container.registerSingleton('IHtmlService', HtmlService);
container.registerSingleton('IXmlService', XmlService);
container.registerSingleton('ISitemap', Sitemap);
container.registerSingleton('IPostFactory', PostFactory);
container.registerSingleton('MarkdownPostRepository', MarkdownPostRepository);
container.registerSingleton('WordPressPostRepository', WordPressPostRepository);
container.registerSingleton('WordPressExportPostRepository', WordPressExportPostRepository);
const availablePostSources: Record<string, string> = {
  'markdown': 'MarkdownPostRepository',
  'wpdb': 'WordPressPostRepository',
  'wpxml': 'WordPressExportPostRepository',
};
container.registerInstance('postRepositories', Object.assign({},
  ...Object.keys(postSources).filter(source => source in availablePostSources).map(source => ({
    [postSources[source]]: {
      source,
      sourceId: postSources[source],
      repository: availablePostSources[source],
    },
  }))),
);

// pages
container.registerSingleton('IIndexPageProps', IndexPageProps);
container.registerSingleton('IPostPageProps', PostPageProps);
container.registerSingleton('ITagPageProps', TagPageProps);
container.registerSingleton('IAnyPageProps', AnyPageProps);
container.registerSingleton('ISitemapPageProps', SitemapPageProps);
container.registerSingleton('IRobotsPageProps', RobotsPageProps);
container.registerSingleton('ICardPageProps', CardPageProps);
