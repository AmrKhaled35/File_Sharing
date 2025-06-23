import React from 'react';
import { Upload, Shield, FileType, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { FeatureCard } from '../ui/FeatureCard';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { t } = useTranslation();

  const features = [
    {
      icon: Upload,
      title: t('easyUpload'),
      description: t('easyUploadDesc'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: t('secureSharing'),
      description: t('secureSharingDesc'),
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: FileType,
      title: t('allFormats'),
      description: t('allFormatsDesc'),
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="relative z-10 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
            <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              {t('welcome')}
              <br />
              <span className="text-4xl md:text-6xl">Share 3la ma tofrag</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center space-x-3 rtl:space-x-reverse px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span>{t('getStarted')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
            <Sparkles className="w-5 h-5 absolute -top-1 -right-1 text-yellow-300 animate-ping" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('features')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to share your files?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of users who trust our platform for secure file sharing.
              </p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center space-x-3 rtl:space-x-reverse px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <span>{t('getStarted')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}