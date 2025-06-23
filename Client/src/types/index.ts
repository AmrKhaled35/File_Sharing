export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  category: 'audio' | 'video' | 'document' | 'image' | 'other';
  url: string;
  uploadDate: Date;
  uploaderId: string;
  shareId: string;
}

export interface User {
  id: string;
  name: string;
  joinDate: Date;
}

export type Language = 'ar' | 'en';

export type Theme = 'light' | 'dark';

export interface AppState {
  files: FileItem[];
  currentUser: User | null;
  language: Language;
  theme: Theme;
}