import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function CriarOrbita({navigation}) {
  const [nome, setNome] = useState('');

  return (
    <View style={styles.container}>
      {}
      <View style={styles.header}>
          <TouchableOpacity style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF"
          onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {}
      <Text style={styles.label}>Dê um nome ao círculo:</Text>

      {}
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      {}
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('AddImg')}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AAB0B5',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#1F32F4', 
  },
  label: {
    textAlign: 'center',
    color: '#C2C2C2',
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#1E2330', 
    marginHorizontal: 30,
    marginBottom: 40,
    fontSize: 16,
    color: '#1E2330',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#283BE3', 
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});