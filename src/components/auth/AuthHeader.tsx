
import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="mb-1">
        <img 
          src="/lovable-uploads/cbd6346f-281f-4424-aadb-c2b0ae3d87fc.png" 
          alt="Fair Value Logo" 
          className="h-9" // Reduced from h-12 (25% smaller)
        />
      </div>
      <div className="text-primary text-sm font-medium">Valoraciones</div>
    </div>
  );
};

export default AuthHeader;
