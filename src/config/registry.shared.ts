import { container } from 'tsyringe';
import { FooterComponent } from '$/infra/app/layout/footer';
import { HeaderComponent } from '$/infra/app/layout/header';
import { LayoutComponent } from '$/infra/app/layout';
import { HeadComponent } from '$/infra/app/head';
import { AppService } from '$/infra/app/index';
import { GoogleAnalytics } from '$/infra/analytics/google';
import { GoogleAdsense } from '$/infra/advertising/google';
import { IndexPage } from '$/infra/pages/index';
import { PostPage } from '$/infra/pages/post';

container.registerSingleton('IFooterComponent', FooterComponent);
container.registerSingleton('IHeaderComponent', HeaderComponent);
container.registerSingleton('ILayoutComponent', LayoutComponent);
container.registerSingleton('IHeadComponent', HeadComponent);
container.registerSingleton('IAppService', AppService);
container.registerSingleton('IAnalytics', GoogleAnalytics);
container.registerSingleton('IAdvertising', GoogleAdsense);

// pages
container.registerSingleton('IIndexPage', IndexPage);
container.registerSingleton('IPostPage', PostPage);
