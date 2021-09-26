import type { IAnalytics } from '$/domain/analytics';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = (analytics: IAnalytics) => {
  const router = useRouter();
  const handleRouteChange = useCallback((path: string) => {
    analytics.pageView(path);
  }, [analytics]);

  useEffect(() => {
    if (!analytics.isValid()) {
      return;
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, handleRouteChange, analytics]);
};
