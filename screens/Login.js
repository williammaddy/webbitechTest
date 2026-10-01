import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (!phone || phone.trim().length < 6) {
      setError('Please enter a valid phone number');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (otp.trim() === '123456') {
      setError('');
      navigation.replace('Main');
    } else {
      setError('Invalid OTP code. Please enter 123456');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.innerContainer}
        >
          {/* Big Rounded Hero Banner */}
          <View style={styles.heroWrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.logoBadgeOverHero}>
              <Ionicons name="bag-handle" size={32} color="#E94B4B" />
            </View>
          </View>

          {/* Heading */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              {step === 'phone'
                ? 'Enter your phone number to start your shopping journey'
                : `Enter 6-digit OTP code sent to +1 ${phone}`}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {step === 'phone' ? (
              <>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.phoneInputRow}>
                  <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+1</Text>
                  </View>
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="Enter phone number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={(text) => {
                      setPhone(text);
                      if (error) setError('');
                    }}
                  />
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSendOtp}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryButtonText}>Send OTP</Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.inputLabel}>Verification Code</Text>
                <TextInput
                  style={[styles.input, styles.otpInput]}
                  placeholder="123456"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={(text) => {
                    setOtp(text);
                    if (error) setError('');
                  }}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleVerifyOtp}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryButtonText}>Verify & Proceed</Text>
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    setStep('phone');
                    setError('');
                    setOtp('');
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Change Phone Number</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Footer note */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Test OTP code: <Text style={styles.otpCodeBold}>123456</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  heroWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  logoBadgeOverHero: {
    position: 'absolute',
    bottom: -1,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  form: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
    height: 54,
  },
  countryCode: {
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingHorizontal: 14,
    height: '100%',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    height: 54,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  otpInput: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 8,
    textAlign: 'center',
  },
  errorText: {
    color: '#E94B4B',
    fontSize: 13,
    marginTop: 8,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#E94B4B',
    borderRadius: 16,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#E94B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 12,
  },
  footerText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  otpCodeBold: {
    color: '#E94B4B',
    fontWeight: '700',
  },
});
