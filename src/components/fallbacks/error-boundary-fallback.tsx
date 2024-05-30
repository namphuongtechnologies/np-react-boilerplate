import type { FallbackProps } from 'react-error-boundary';

export const ErrorBoundaryFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      ErrorBoundaryFallback
      <button onClick={resetErrorBoundary}>Reset error</button>
    </div>
  );
};
