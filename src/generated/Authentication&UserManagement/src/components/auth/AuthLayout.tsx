import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Branding */}
        <div className="hidden md:flex flex-col gap-6 pr-8">
          <h1 className="text-5xl font-bold tracking-tighter">
            Supercharge your writing with AI
          </h1>
          <p className="text-slate-400 text-lg">
            Our AI-powered writing assistant helps you create high-quality content faster than ever before. Sign in to unlock your full potential.
          </p>
          {/* Abstract decorative graphic */}
          <div className="w-full h-64 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 mt-4" />
        </div>

        {/* Right Side: Form */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
