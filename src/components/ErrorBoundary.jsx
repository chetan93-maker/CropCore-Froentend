import React from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Get error message safely
      const errorMessage = this.state.error?.message || 'An unknown error occurred';
      const errorStack = this.state.error?.stack || '';
      const componentStack = this.state.errorInfo?.componentStack || '';
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
              <p className="text-gray-600">
                We're sorry, but an error occurred. Please try refreshing the page.
              </p>
            </div>

            {/* Error Details - Safely rendered as strings */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 overflow-auto max-h-96">
              <p className="font-mono text-sm text-red-600 mb-2">
                {errorMessage}
              </p>
              {errorStack && (
                <details className="mt-2">
                  <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                    Error Stack Trace
                  </summary>
                  <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-100 p-3 rounded">
                    {errorStack}
                  </pre>
                </details>
              )}
              {componentStack && (
                <details className="mt-2">
                  <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                    Component Stack
                  </summary>
                  <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-100 p-3 rounded">
                    {componentStack}
                  </pre>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;