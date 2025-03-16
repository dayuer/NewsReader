import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// 语言资源
const resources = {
  en: {
    translation: {
      home: 'Home',
      settings: 'Settings',
      language: 'Language',
      chinese: 'Chinese',
      english: 'English',
      newsTitle: 'News',
      newsContent: 'This is news content',
      changeLanguage: 'Change Language'
    }
  },
  zh: {
    translation: {
      home: '首页',
      settings: '设置',
      language: '语言',
      chinese: '中文',
      english: '英文',
      newsTitle: '新闻',
      newsContent: '这是新闻内容',
      changeLanguage: '切换语言'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
