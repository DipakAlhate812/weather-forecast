import React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Something went wrong",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>

      <h2 className="text-lg font-semibold text-gray-800">
        Oops! Something went wrong
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;