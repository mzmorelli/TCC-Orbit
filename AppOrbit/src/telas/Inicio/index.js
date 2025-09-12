import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Inicio({navigation}) {
  return (
    <LinearGradient
      colors={["#83bde3","#3f92cb", "#135991"]}
      style={styles.container}
      start={{ x: 0, y: 0, w:0 }}
      end={{ x: 0, y: 0.9, w: 1}}
    >
      <View style={styles.logoContainer}>
                <Image
                  source={require('../../../assets/logoOrbitOfc.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.subtitle}>
        Bem-vindo!{'\n'}Sua órbita mais segura!
      </Text>
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="arrow-forward" size={24} color="#283BE3" />
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
  iconButton: { 
    backgroundColor: '#FFFFFF', 
    padding: 16,
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
   logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 200,
    height: 200,
  },
});