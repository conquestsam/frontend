import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion } from 'framer-motion';

// Lazy load components for better performance
const LandingPage = lazy(() => import('./components/landing/LandingPage').then(module => ({ default: module.LandingPage })));
const LoginForm = lazy(() => import('./components/LoginForm').then(module => ({ default: module.LoginForm })));
const RegisterForm = lazy(() => import('./components/RegisterForm').then(module => ({ default: module.RegisterForm })));
const MovieDashboard = lazy(() => import('./components/MovieDashboard').then(module => ({ default: module.MovieDashboard })));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
    />
  </div>
);

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isLogin ? (
        <LoginForm onToggleMode={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onToggleMode={() => setIsLogin(true)} />
      )}
    </Suspense>
  );
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleGetStarted = () => {
    setAuthMode('register');
    setShowAuth(true);
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setShowAuth(true);
  };

  const handleBackToLanding = () => {
    setShowAuth(false);
  };

  // If user is authenticated, show dashboard
  if (user) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <MovieDashboard />
      </Suspense>
    );
  }

  // If showing auth forms
  if (showAuth) {
    return (
      <div className="relative">
        {/* Back to landing button */}
        <button
          onClick={handleBackToLanding}
          className="absolute top-4 left-4 z-50 text-white hover:text-gray-300 transition-colors"
        >
          ← Back to Home
        </button>
        
        <Suspense fallback={<LoadingSpinner />}>
          {authMode === 'login' ? (
            <LoginForm onToggleMode={() => setAuthMode('register')} />
          ) : (
            <RegisterForm onToggleMode={() => setAuthMode('login')} />
          )}
        </Suspense>
      </div>
    );
  }

  // Show landing page
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LandingPage 
        onGetStarted={handleGetStarted}
        onSignIn={handleSignIn}
      />
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;