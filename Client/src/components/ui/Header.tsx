import { Share2, Globe, Files, Home } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTranslation } from '../../hooks/useTranslation';

interface HeaderProps {
  currentPage: 'landing' | 'files';
  onPageChange: (page: 'landing' | 'files') => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const {  language, setLanguage } = useApp();
  const { t } = useTranslation();

  return (
    <header className="relative z-20 border-b border-white/20 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 animate-pulse"></div>
              <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Share2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Share 3la ma tofrag
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('subtitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <nav className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => onPageChange('landing')}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl transition-all duration-200 ${
                  currentPage === 'landing'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>{t('home')}</span>
              </button>
              <button
                onClick={() => onPageChange('files')}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl transition-all duration-200 ${
                  currentPage === 'files'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20'
                }`}
              >
                <Files className="w-4 h-4" />
                <span>{t('files')}</span>
              </button>
            </nav>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 backdrop-blur-sm"
                title={t('language')}
              >
                <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              {/* <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-3 rounded-xl bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 backdrop-blur-sm"
                title={t('theme')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}