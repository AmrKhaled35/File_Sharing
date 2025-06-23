import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { FileUpload } from '../file/FileUpload';
import { FileCategories } from '../file/FileCategories';
import { FileGrid } from '../file/FileGrid';
import { useApp } from '../../contexts/AppContext';
import { FileItem } from '../../types';

export function FilesPage() {
  const { t } = useTranslation();
  const { files } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | FileItem['category']>('all');

  const filteredFiles = activeCategory === 'all' 
    ? files 
    : files.filter(file => file.category === activeCategory);

  return (
    <div className="relative z-10 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upload Section */}
        <div className="mb-12">
          <FileUpload />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <FileCategories 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Files Grid */}
        <FileGrid files={filteredFiles} />
      </div>
    </div>
  );
}