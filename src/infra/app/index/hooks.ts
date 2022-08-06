import type { IAnalytics } from '@/domain/analytics';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = (analytics?: IAnalytics) => {
  const router = useRouter();
  const handleRouteChange = useCallback((path: string) => {
    if (analytics?.isValid()) {
      analytics.pageView(path);
    }
  }, [analytics]);

  useEffect(() => {
    if (!analytics?.isValid()) {
      return;
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, handleRouteChange, analytics]);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
};
