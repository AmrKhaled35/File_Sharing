import React from 'react';
import { FileText } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { FileItem } from '../../types';
import { FileCard } from './FileCard';

interface FileGridProps {
  files: FileItem[];
}

export function FileGrid({ files }: FileGridProps) {
  const { t } = useTranslation();

  if (files.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative w-32 h-32 mx-auto bg-gradient-to-r from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center">
            <FileText className="w-16 h-16 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('noFiles')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t('startUploading')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}