import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // TODO: Implement reset password logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('forgotPasswordTitle')}</Text>
      <Text style={styles.subtitle}>{t('forgotPasswordSubtitle')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>{t('resetPassword')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{t('backToLogin')}</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
