import { Suspense, type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';

import { queryClient } from '~/config/query-client';

import FullscreenFallback from '~/components/fallbacks/fullscreen-fallback';
import ErrorBoundaryFallback from '~/components/fallbacks/error-boundary-fallback';

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<FullscreenFallback />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorBoundaryFallback}>
            <HelmetProvider>
              <QueryClientProvider client={queryClient}>
                <Router>{children}</Router>
                <ReactQueryDevtools initialIsOpen={false} position='left' />
              </QueryClientProvider>
            </HelmetProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
};

export default AppProviders;
