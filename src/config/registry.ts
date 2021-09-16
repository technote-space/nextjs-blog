import { container } from 'tsyringe';
import { ChakraUiTheme } from '$/infra/app/theme/chakraUi';
import { FooterComponent } from '$/infra/app/layout/footer';
import { HeaderComponent } from '$/infra/app/layout/header';
import { LayoutComponent } from '$/infra/app/layout';
import { HeadComponent } from '$/infra/app/head';
import { AppService } from '$/infra/app';
import { IndexPage, IndexPageProps } from '$/infra/pages';
import { PostPage, PostPageProps } from '$/infra/pages/post';
import { PostFactory } from '$/infra/post/factory';
import { PostManager } from '$/infra/post/manager';
import { MarkdownPostRepository } from '$/infra/post/repository/markdownPost';

container.registerSingleton('ITheme', ChakraUiTheme);
container.registerSingleton('IFooterComponent', FooterComponent);
container.registerSingleton('IHeaderComponent', HeaderComponent);
container.registerSingleton('ILayoutComponent', LayoutComponent);
container.registerSingleton('IHeadComponent', HeadComponent);
container.registerSingleton('IAppService', AppService);
container.registerSingleton('IPostFactory', PostFactory);
container.registerSingleton('IPostManager', PostManager);
container.registerInstance('postRepositories', {
  'md': container.resolve(MarkdownPostRepository),
});

// pages
container.registerSingleton('IIndexPage', IndexPage);
container.registerSingleton('IIndexPageProps', IndexPageProps);
container.registerSingleton('IPostPage', PostPage);
container.registerSingleton('IPostPageProps', PostPageProps);
