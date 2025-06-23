import { useApp } from '../contexts/AppContext';

const translations = {
  ar: {
    home: 'الرئيسية',
    files: 'الملفات',
    welcome: 'مرحباً بك في',
    subtitle: 'شارك ملفاتك الكبيرة بسهولة وأمان',
    description: 'منصة متقدمة لمشاركة الملفات الكبيرة مع أصدقائك وزملائك. ادعم جميع أنواع الملفات مع واجهة سهلة الاستخدام.',
    getStarted: 'ابدأ الآن',
    features: 'المميزات',
    easyUpload: 'رفع سهل',
    easyUploadDesc: 'اسحب وأفلت ملفاتك أو انقر للاختيار',
    secureSharing: 'مشاركة آمنة',
    secureSharingDesc: 'روابط مشاركة فريدة وآمنة',
    allFormats: 'جميع الصيغ',
    allFormatsDesc: 'دعم كامل لجميع أنواع الملفات',
    uploadFiles: 'رفع الملفات',
    dragDrop: 'اسحب ملفاتك هنا أو انقر للاختيار',
    supportedFormats: 'ندعم جميع أنواع الملفات - صوتية، فيديو، مستندات، صور',
    chooseFiles: 'اختر الملفات',
    allFiles: 'جميع الملفات',
    audio: 'الصوتيات',
    video: 'الفيديو',
    documents: 'المستندات',
    images: 'الصور',
    other: 'أخرى',
    share: 'مشاركة',
    download: 'تحميل',
    delete: 'حذف',
    linkCopied: 'تم نسخ رابط المشاركة!',
    size: 'الحجم',
    type: 'النوع',
    date: 'التاريخ',
    noFiles: 'لا توجد ملفات في هذا التصنيف',
    startUploading: 'ابدأ برفع ملفاتك لتراها هنا',
    language: 'اللغة',
    theme: 'المظهر',
    lightMode: 'فاتح',
    darkMode: 'داكن'
  },
  en: {
    home: 'Home',
    files: 'Files',
    welcome: 'Welcome to',
    subtitle: 'Share your large files easily and securely',
    description: 'Advanced platform for sharing large files with your friends and colleagues. Support all file types with an easy-to-use interface.',
    getStarted: 'Get Started',
    features: 'Features',
    easyUpload: 'Easy Upload',
    easyUploadDesc: 'Drag and drop your files or click to select',
    secureSharing: 'Secure Sharing',
    secureSharingDesc: 'Unique and secure sharing links',
    allFormats: 'All Formats',
    allFormatsDesc: 'Full support for all file types',
    uploadFiles: 'Upload Files',
    dragDrop: 'Drag your files here or click to select',
    supportedFormats: 'We support all file types - audio, video, documents, images',
    chooseFiles: 'Choose Files',
    allFiles: 'All Files',
    audio: 'Audio',
    video: 'Video',
    documents: 'Documents',
    images: 'Images',
    other: 'Other',
    share: 'Share',
    download: 'Download',
    delete: 'Delete',
    linkCopied: 'Share link copied!',
    size: 'Size',
    type: 'Type',
    date: 'Date',
    noFiles: 'No files in this category',
    startUploading: 'Start uploading your files to see them here',
    language: 'Language',
    theme: 'Theme',
    lightMode: 'Light',
    darkMode: 'Dark'
  }
};

export function useTranslation() {
  const { language } = useApp();
  
  const t = (key: keyof typeof translations.ar): string => {
    return translations[language][key] || key;
  };
  
  return { t, language };
}