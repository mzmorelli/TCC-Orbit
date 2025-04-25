import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Cadastro({navigation}) {
  const [telefone, setTelefone] = useState('');

  return (
    <LinearGradient
      colors={['#1B2CC1', '#0D155B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}
        onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View> */}
        
        <Text style={styles.title}>Orbit</Text>
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
      </View>
      
      <View style={styles.body}>
        <Text style={styles.labelBold}>Bem-vindo!</Text>
        <Text style={styles.label}>Digite seu número de telefone aqui:</Text>
        
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.countryCode}>+55</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Insira o número"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
            autoFocus={true}
          />
        </View>
        
        <TouchableOpacity style={styles.button} activeOpacity={0.8}
        onPress={() => navigation.navigate("InfoPessoal")}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
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
  },
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  labelBold: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E2330',
    textAlign: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  countryCodeContainer: {
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#D1D1D1',
    marginRight: 12,
  },
  countryCode: {
    fontSize: 16,
    color: '#1E2330',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E2330',
    paddingVertical: 14,
  },
  button: {
    backgroundColor: '#283BE3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});