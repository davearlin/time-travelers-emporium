import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'var(--color-text-primary)' }}>
          <h1>Something went wrong.</h1>
          <p>Please reload the page. If the issue persists, try again later.</p>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', opacity: 0.7 }}>
            {this.state.error?.message}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem' }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
