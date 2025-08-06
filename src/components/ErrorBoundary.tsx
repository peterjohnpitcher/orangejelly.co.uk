'use client';

import { Component, ReactNode } from 'react';
import Button from './Button';
import Heading from './Heading';
import Text from './Text';
import Card from './Card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // In production, you might want to send this to an error reporting service
    // Example: reportError({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card variant="bordered" className="max-w-md text-center">
            <div className="text-6xl mb-4">😅</div>
            <Heading level={3} align="center" className="mb-2">
              Oops! Something went wrong
            </Heading>
            <Text align="center" color="muted" className="mb-6">
              Don't worry, it happens to the best of us. Just like when the 
              beer lines decide to foam up during Friday rush!
            </Text>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => this.setState({ hasError: false })}
                variant="secondary"
                size="small"
              >
                Try Again
              </Button>
              <Button
                href="/"
                variant="ghost"
                size="small"
              >
                Go Home
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-charcoal/60">
                  Error details (development only)
                </summary>
                <pre className="mt-2 text-xs bg-charcoal/5 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}