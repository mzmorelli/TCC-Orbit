import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <LinearGradient
      colors={["#83bde3","#3f92cb", "#135991"]}
      style={styles.container}
      start={{ x: 0, y: 0, w: 0 }}
      end={{ x: 0, y: 0.9, w:1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF"
          onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        
        
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
      </View>
      
      <View style={styles.body}>
        <Text style={styles.labelBold}>Bem-vindo</Text>
        
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
        
        <TouchableOpacity
        onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.link}>Cadastrar-se</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Login</Text>
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
    paddingBottom: 40,
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 200,
    height: 200,
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
    paddingBottom: 20,
  },
  labelBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E2330',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1E2330',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  link: {
    textAlign: 'center',
    color: '#3f92cb',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3f92cb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
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