import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'email' | 'thirdParty'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleLogin = () => {
    // TODO: Implement login logic
  };

  const handleSendVerificationCode = () => {
    // TODO: Implement send verification code logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新闻阅读器</Text>
      <View style={styles.content}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, loginMethod === 'phone' && styles.activeTab]}
            onPress={() => setLoginMethod('phone')}
          >
            <Text style={[styles.tabText, loginMethod === 'phone' && styles.activeTabText]}>
              {t('phoneLogin')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, loginMethod === 'email' && styles.activeTab]}
            onPress={() => setLoginMethod('email')}
          >
            <Text style={[styles.tabText, loginMethod === 'email' && styles.activeTabText]}>
              {t('emailLogin')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, loginMethod === 'thirdParty' && styles.activeTab]}
            onPress={() => setLoginMethod('thirdParty')}
          >
            <Text style={[styles.tabText, loginMethod === 'thirdParty' && styles.activeTabText]}>
              {t('thirdPartyLogin')}
            </Text>
          </TouchableOpacity>
        </View>

        {loginMethod === 'phone' && (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={t('phoneNumber')}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <View style={styles.codeContainer}>
              <TextInput
                style={[styles.input, styles.codeInput]}
                placeholder={t('verificationCode')}
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={styles.codeButton}
                onPress={handleSendVerificationCode}
              >
                <Text style={styles.codeButtonText}>{t('getCode')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {loginMethod === 'email' && (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={t('email')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder={t('password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>{t('forgotPassword')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {loginMethod === 'thirdParty' && (
          <View style={styles.thirdPartyLogin}>
            <TouchableOpacity style={styles.thirdPartyButton}>
              <Text style={styles.thirdPartyButtonText}>微信登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.thirdPartyButton}>
              <Text style={styles.thirdPartyButtonText}>QQ登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.thirdPartyButton}>
              <Text style={styles.thirdPartyButtonText}>微博登录</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>{t('login')}</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>{t('noAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>{t('registerNow')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.skipButtonText}>跳过登录</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    alignSelf: 'center',
    marginBottom: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeInput: {
    flex: 1,
    marginRight: 10,
  },
  codeButton: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  codeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  thirdPartyLogin: {
    marginBottom: 20,
  },
  thirdPartyButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 15,
  },
  thirdPartyButtonText: {
    color: '#333',
    fontSize: 16,
  },
  loginButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  registerText: {
    color: '#666',
    marginRight: 5,
  },
  registerLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  skipButton: {
    alignSelf: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 14,
  },
});

export default LoginScreen;
