import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, MapPin, RefreshCw, Edit3 } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
  onManualAddressClick?: () => void;
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class MapErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Map Error caught by MapErrorBoundary:', error, errorInfo);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className={`w-full rounded-2xl border border-amber-300 bg-amber-50/70 p-6 text-center flex flex-col items-center justify-center min-h-[260px] ${
            this.props.className || ''
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center mb-3">
            <MapPin className="w-6 h-6 text-amber-600 animate-bounce" />
          </div>

          <h3 className="font-heading font-bold text-slate-900 text-base mb-1">
            Map unavailable. Please enter your delivery address manually.
          </h3>

          <p className="text-xs text-slate-600 max-w-md mb-4 font-body">
            {this.props.fallbackMessage ||
              'We could not load the interactive map tiles. You can still proceed smoothly by typing your Kigali address, street, or nearby landmark below.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {this.props.onManualAddressClick && (
              <button
                type="button"
                onClick={this.props.onManualAddressClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Fill Address Manually
              </button>
            )}

            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Map
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
