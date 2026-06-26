// src/components/ErrorBoundary.jsx

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

const isDev = import.meta.env.DEV;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // In production you'd send this to an error tracking service
    // e.g. Sentry.captureException(error, { extra: errorInfo })
    if (isDev) {
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-lg w-full p-8 text-center">

          {/* Icon */}
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-8 h-8 text-red-500"/>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            An unexpected error occurred. You can try again or return to the home page.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
              onClick={this.handleReset}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4"/>
              Try Again
            </button>
            <button
              onClick={this.handleGoHome}
              className="flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Home className="w-4 h-4"/>
              Go to Home
            </button>
          </div>

          {/* Stack trace — dev only */}
          {isDev && this.state.error && (
            <details className="text-left bg-gray-50 border border-gray-200 rounded-xl p-4">
              <summary className="text-xs font-semibold text-gray-600 cursor-pointer select-none">
                Error details (dev only)
              </summary>
              <p className="mt-3 text-xs font-mono text-red-600 break-all">
                {this.state.error.toString()}
              </p>
              {this.state.errorInfo?.componentStack && (
                <pre className="mt-2 text-xs text-gray-500 overflow-auto max-h-48 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </details>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;