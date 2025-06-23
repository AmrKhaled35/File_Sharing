import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { Header } from './components/ui/Header';
import { LandingPage } from './components/pages/LandingPage';
import { FilesPage } from './components/pages/FilesPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'files'>('landing');

  const handleGetStarted = () => {
    setCurrentPage('files');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-500">
      <AnimatedBackground />
      
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      
      <main>
        {currentPage === 'landing' ? (
          <LandingPage onGetStarted={handleGetStarted} />
        ) : (
          <FilesPage />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;