import React from 'react';
import { Music, Video, FileText, FileImage, Download, Share2, Trash2, Sparkles } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useApp } from '../../contexts/AppContext';
import { FileItem } from '../../types';

interface FileCardProps {
  file: FileItem;
}

export function FileCard({ file }: FileCardProps) {
  const { t } = useTranslation();
  const { removeFile } = useApp();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryIcon = (category: FileItem['category']) => {
    switch (category) {
      case 'audio': return Music;
      case 'video': return Video;
      case 'document': return FileText;
      case 'image': return FileImage;
      default: return FileText;
    }
  };

  const getCategoryGradient = (category: FileItem['category']) => {
    switch (category) {
      case 'audio': return 'from-purple-500 to-pink-500';
      case 'video': return 'from-red-500 to-orange-500';
      case 'document': return 'from-blue-500 to-cyan-500';
      case 'image': return 'from-green-500 to-teal-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const shareFile = (file: FileItem) => {
    const shareUrl = `${window.location.origin}#file-${file.shareId}`;
    navigator.clipboard.writeText(shareUrl);
    alert(t('linkCopied'));
  };

  const deleteFile = (fileId: string) => {
    removeFile(fileId);
  };

  const Icon = getCategoryIcon(file.category);
  const gradient = getCategoryGradient(file.category);

  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl blur-xl`}></div>
      
      <div className="relative bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 hover:border-white/40 dark:hover:border-gray-600/40 transition-all duration-300 transform hover:-translate-y-4 hover:shadow-2xl">
        {/* File Icon */}
        <div className="relative mb-6">
          <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
        </div>
        
        {/* File Info */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={file.name}>
            {file.name}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>{t('size')}:</span>
              <span className="font-semibold">{formatFileSize(file.size)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('type')}:</span>
              <span className="font-semibold capitalize">{file.type.split('/')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('date')}:</span>
              <span className="font-semibold">{file.uploadDate.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-white/20 dark:border-gray-700/20">
          <button
            onClick={() => shareFile(file)}
            className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 font-semibold"
          >
            <Share2 className="w-4 h-4" />
            <span>{t('share')}</span>
          </button>
          
          <div className="flex space-x-2 rtl:space-x-reverse">
            <a
              href={file.url}
              download={file.name}
              className="p-3 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200 transform hover:scale-110"
              title={t('download')}
            >
              <Download className="w-5 h-5" />
            </a>
            <button
              onClick={() => deleteFile(file.id)}
              className="p-3 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 transform hover:scale-110"
              title={t('delete')}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}