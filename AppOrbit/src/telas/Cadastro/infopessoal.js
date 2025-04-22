import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function InfoPessoal() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <LinearGradient
      colors={['#1B2CC1', '#0D155B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}>
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
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
      </View>
      
      <View style={styles.body}>
        <Text style={styles.labelBold}>Informações pessoais</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Nome" 
          placeholderTextColor="#888" 
          value={nome} 
          onChangeText={setNome} 
          autoCapitalize="words"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Sobrenome" 
          placeholderTextColor="#888" 
          value={sobrenome} 
          onChangeText={setSobrenome} 
          autoCapitalize="words"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Data de nascimento (DD/MM/AAAA)" 
          placeholderTextColor="#888" 
          value={nascimento} 
          onChangeText={setNascimento} 
          keyboardType="numeric"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          placeholderTextColor="#888" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          placeholderTextColor="#888" 
          secureTextEntry 
          value={senha} 
          onChangeText={setSenha} 
        />
        
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Salvar</Text>
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
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1E2330',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#283BE3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
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