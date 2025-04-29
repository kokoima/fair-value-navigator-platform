
import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="w-16 h-16 mb-2 bg-primary rounded-lg flex items-center justify-center">
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="text-white"
        >
          <path 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h-2zm0 8h2v2h-2z" 
            fill="currentColor"
          />
        </svg>
      </div>
      <h1 className="text-xl font-bold">Fair Value</h1>
    </div>
  );
};

export default AuthHeader;
