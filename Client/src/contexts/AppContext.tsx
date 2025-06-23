import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, FileItem, User, Language, Theme } from '../types';

interface AppContextType extends AppState {
  addFile: (file: FileItem) => void;
  removeFile: (fileId: string) => void;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  setCurrentUser: (user: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'ADD_FILE'; payload: FileItem }
  | { type: 'REMOVE_FILE'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  files: [],
  currentUser: null,
  language: 'ar',
  theme: 'light'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_FILE':
      return { ...state, files: [...state.files, action.payload] };
    case 'REMOVE_FILE':
      return { ...state, files: state.files.filter(f => f.id !== action.payload) };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Simulated shared storage (in real app, this would be a backend API)
const SHARED_STORAGE_KEY = 'shared_files_global';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load shared files from global storage
    const sharedFiles = localStorage.getItem(SHARED_STORAGE_KEY);
    const userPrefs = localStorage.getItem('user_preferences');
    
    if (sharedFiles) {
      try {
        const files = JSON.parse(sharedFiles).map((file: any) => ({
          ...file,
          uploadDate: new Date(file.uploadDate)
        }));
        dispatch({ type: 'LOAD_STATE', payload: { files } });
      } catch (error) {
        console.error('Error loading shared files:', error);
      }
    }

    if (userPrefs) {
      try {
        const prefs = JSON.parse(userPrefs);
        dispatch({ type: 'SET_LANGUAGE', payload: prefs.language || 'ar' });
        dispatch({ type: 'SET_THEME', payload: prefs.theme || 'light' });
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    }

    // Generate user if not exists
    if (!state.currentUser) {
      const userId = localStorage.getItem('user_id') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('user_id', userId);
      
      const user: User = {
        id: userId,
        name: `User ${userId.slice(-4)}`,
        joinDate: new Date()
      };
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, []);

  useEffect(() => {
    // Save files to shared storage
    localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(state.files));
  }, [state.files]);

  useEffect(() => {
    // Save user preferences
    localStorage.setItem('user_preferences', JSON.stringify({
      language: state.language,
      theme: state.theme
    }));
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
    document.documentElement.setAttribute('dir', state.language === 'ar' ? 'rtl' : 'ltr');
  }, [state.language, state.theme]);

  const addFile = (file: FileItem) => {
    dispatch({ type: 'ADD_FILE', payload: file });
  };

  const removeFile = (fileId: string) => {
    dispatch({ type: 'REMOVE_FILE', payload: fileId });
  };

  const setLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setCurrentUser = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      addFile,
      removeFile,
      setLanguage,
      setTheme,
      setCurrentUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}