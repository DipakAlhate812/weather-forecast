import React from "react";

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
}

const LoaderComp: React.FC<LoaderProps> = ({ fullScreen = true, text }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-6"
      }`}
    >
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"/>
      {text && (
        <p className="mt-3 text-sm text-gray-500">{text}</p>
      )}
    </div>
  );
};

export default LoaderComp;