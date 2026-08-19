'use client';

import React from 'react';

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback || (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}
