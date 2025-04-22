import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation resources
import enTranslation from './translations/en';
import heTranslation from './translations/he';

const DEFAULT_LANGUAGE = 'he';

// Language detector using AsyncStorage
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // Get saved language preference from storage
      const storedLanguage = await AsyncStorage.getItem('user-language');
      
      if (storedLanguage) {
        // Use the stored language preference
        return callback(storedLanguage);
      } else {
        // Default to Hebrew if no preference is saved
        return callback(DEFAULT_LANGUAGE);
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      return callback(DEFAULT_LANGUAGE);
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      // Save language preference to AsyncStorage
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  }
};

const resources = {
  en: {
    translation: enTranslation,
  },
  he: {
    translation: heTranslation,
  },
};

// Initialize i18next
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    compatibilityJSON: 'v3', // Required for Android
    
    interpolation: {
        escapeValue: false, 
    },
    react: {
      useSuspense: false,
    }
  });

// Function to change language and save preference
export const changeLanguage = async (language) => {
  try {
    // Change language in i18n
    await i18n.changeLanguage(language);
    
    // This will trigger the cacheUserLanguage method in our detector
    
    console.log(`Language changed to ${language} and saved to preferences`);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

export default i18n;