import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Inicio() {
  return (
    <LinearGradient
      colors={['#1B2CC1', '#0D155B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </View>
      
      {/*
      <View style={styles.logoContainer}>
        <Image
          source={require('./caminho/para/sua/logo.png')} // Substitua pelo caminho correto
          style={styles.logo}
          resizeMode="contain"
        />
      </View> */}
      
      <Text style={styles.title}>Orbit</Text>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.subtitle}>
        Bem-vindo!{'\n'}Sua órbita mais segura!
      </Text>
      <TouchableOpacity style={styles.buttonWhite}>
        <Text style={styles.buttonTextBlue}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  backIcon: { 
    position: 'absolute', 
    top: 40, 
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: { 
    fontSize: 32, 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    marginBottom: 24,
  },
  dotsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 24,
  },
  dot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    marginHorizontal: 4,
  },
  activeDot: { 
    backgroundColor: '#FFFFFF',
    width: 16,
    opacity: 1,
  },
  subtitle: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 40,
    lineHeight: 24,
    opacity: 0.8,
  },
  buttonWhite: { 
    backgroundColor: '#FFFFFF', 
    paddingVertical: 16, 
    paddingHorizontal: 40, 
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonTextBlue: { 
    color: '#283BE3', 
    fontSize: 16, 
    fontWeight: 'bold',
  },
});