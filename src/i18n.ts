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
      changeLanguage: 'Change Language',
      settingsButton: 'Settings',
      share: 'Share',
      // 登录页面
      phoneLogin: 'Phone Login',
      emailLogin: 'Email Login',
      thirdPartyLogin: 'Third Party Login',
      phoneNumber: 'Phone Number',
      verificationCode: 'Verification Code',
      getCode: 'Get Code',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password',
      login: 'Login',
      noAccount: 'No account?',
      registerNow: 'Register Now',
      
      // 注册页面
      registerTitle: 'Register',
      confirmPassword: 'Confirm Password',
      register: 'Register',
      alreadyHaveAccount: 'Already have an account?',
      loginNow: 'Login Now',
      
      // 忘记密码页面
      forgotPasswordTitle: 'Forgot Password',
      forgotPasswordSubtitle: 'Please enter your email address to reset your password',
      resetPassword: 'Reset Password',
      backToLogin: 'Back to Login'
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
      changeLanguage: '切换语言',
      settingsButton: '设置',
      share: '分享',
      // 登录页面
      phoneLogin: '手机登录',
      emailLogin: '邮箱登录',
      thirdPartyLogin: '第三方登录',
      phoneNumber: '手机号',
      verificationCode: '验证码',
      getCode: '获取验证码',
      email: '邮箱',
      password: '密码',
      forgotPassword: '忘记密码',
      login: '登录',
      noAccount: '没有账号？',
      registerNow: '立即注册',
      
      // 注册页面
      registerTitle: '注册新账号',
      confirmPassword: '确认密码',
      register: '注册',
      alreadyHaveAccount: '已有账号？',
      loginNow: '立即登录',
      
      // 忘记密码页面
      forgotPasswordTitle: '忘记密码',
      forgotPasswordSubtitle: '请输入您的邮箱地址以重置密码',
      resetPassword: '重置密码',
      backToLogin: '返回登录'
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
