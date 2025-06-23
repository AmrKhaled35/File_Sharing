import React from 'react';
import { Music, Video, FileText, FileImage, Folder } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useApp } from '../../contexts/AppContext';
import { FileItem } from '../../types';

interface FileCategoriesProps {
  activeCategory: 'all' | FileItem['category'];
  onCategoryChange: (category: 'all' | FileItem['category']) => void;
}

export function FileCategories({ activeCategory, onCategoryChange }: FileCategoriesProps) {
  const { t } = useTranslation();
  const { files } = useApp();

  const categories = [
    { 
      key: 'all' as const, 
      label: t('allFiles'), 
      count: files.length,
      icon: Folder,
      gradient: 'from-gray-500 to-gray-600'
    },
    { 
      key: 'audio' as const, 
      label: t('audio'), 
      count: files.filter(f => f.category === 'audio').length,
      icon: Music,
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      key: 'video' as const, 
      label: t('video'), 
      count: files.filter(f => f.category === 'video').length,
      icon: Video,
      gradient: 'from-red-500 to-orange-500'
    },
    { 
      key: 'document' as const, 
      label: t('documents'), 
      count: files.filter(f => f.category === 'document').length,
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      key: 'image' as const, 
      label: t('images'), 
      count: files.filter(f => f.category === 'image').length,
      icon: FileImage,
      gradient: 'from-green-500 to-teal-500'
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.key;
        
        return (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`group relative flex items-center space-x-3 rtl:space-x-reverse px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl scale-105'
                : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-xl'
            }`}
          >
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-50 animate-pulse"></div>
            )}
            <div className="relative flex items-center space-x-3 rtl:space-x-reverse">
              <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20' : `bg-gradient-to-r ${category.gradient}`}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
              </div>
              <span className="text-lg">{category.label}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {category.count}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}