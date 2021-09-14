import { container } from 'tsyringe';
import { Theme } from '$/infra/app/theme';
import { FooterComponent } from '$/infra/app/layout/footer';
import { HeaderComponent } from '$/infra/app/layout/header';
import { LayoutComponent } from '$/infra/app/layout';
import { HeadComponent } from '$/infra/app/head';
import { AppService } from '$/infra/app';
import { IndexPage } from '$/infra/pages';
import { PostPage } from '$/infra/pages/post';

container.registerSingleton('ITheme', Theme);
container.registerSingleton('IFooterComponent', FooterComponent);
container.registerSingleton('IHeaderComponent', HeaderComponent);
container.registerSingleton('ILayoutComponent', LayoutComponent);
container.registerSingleton('IHeadComponent', HeadComponent);
container.registerSingleton('IAppService', AppService);

// pages
container.registerSingleton('IIndexPage', IndexPage);
container.registerSingleton('IPostPage', PostPage);
