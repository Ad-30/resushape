import React from 'react';

export const LoadingPageComponent: React.FC = () => {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-black text-emerald-400">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-pulse">
          <ListRestartIcon className="h-full w-full" />
        </div>
        <p className="animate-pulse text-lg font-medium">Loading your resume...</p>
      </div>
    </div>
  );
};

const ListRestartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 6H3" />
      <path d="M7 12H3" />
      <path d="M7 18H3" />
      <path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" />
      <path d="M11 10v4h4" />
    </svg>
  );
};