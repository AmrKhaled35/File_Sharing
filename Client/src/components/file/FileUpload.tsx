import React, { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useApp } from '../../contexts/AppContext';
import { FileItem } from '../../types';

export function FileUpload() {
  const { t } = useTranslation();
  const { addFile, currentUser } = useApp();
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const getFileCategory = (type: string): FileItem['category'] => {
    if (type.startsWith('audio/')) return 'audio';
    if (type.startsWith('video/')) return 'video';
    if (type.startsWith('image/')) return 'image';
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) return 'document';
    return 'other';
  };

  const handleFileUpload = async (uploadedFiles: FileList) => {
    if (!currentUser) return;
    
    setUploading(true);
    
    // Simulate upload delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    Array.from(uploadedFiles).forEach((file) => {
      const fileItem: FileItem = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        category: getFileCategory(file.type),
        url: URL.createObjectURL(file),
        uploadDate: new Date(),
        uploaderId: currentUser.id,
        shareId: `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      addFile(fileItem);
    });
    
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const uploadedFiles = e.dataTransfer.files;
    if (uploadedFiles.length > 0) {
      handleFileUpload(uploadedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl"></div>
      <div
        className={`relative p-12 border-2 border-dashed rounded-3xl transition-all duration-300 backdrop-blur-xl ${
          dragOver
            ? 'border-blue-500 bg-blue-500/10 scale-105'
            : 'border-white/30 dark:border-gray-600/30 hover:border-white/50 dark:hover:border-gray-500/50'
        } ${uploading ? 'pointer-events-none opacity-75' : ''} bg-white/10 dark:bg-gray-800/10`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-300 ${
              dragOver ? 'scale-110 rotate-12' : uploading ? 'animate-pulse' : ''
            }`}>
              <Upload className={`w-10 h-10 text-white transition-transform duration-300 ${uploading ? 'animate-bounce' : ''}`} />
            </div>
            {!uploading && (
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-ping" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {uploading ? 'Uploading...' : t('dragDrop')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            {t('supportedFormats')}
          </p>
          
          <input
            type="file"
            multiple
            className="hidden"
            id="file-upload"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center space-x-3 rtl:space-x-reverse px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
              uploading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            <Upload className="w-6 h-6" />
            <span>{uploading ? 'Uploading...' : t('chooseFiles')}</span>
          </label>
        </div>
      </div>
    </div>
  );
}