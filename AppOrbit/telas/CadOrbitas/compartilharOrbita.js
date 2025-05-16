import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CompartilharOrbita(navigation) {
  const codigo = 'AWGFFF'; 

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF"
          onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      </View>

     
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

   
      <Text style={styles.label}>
        Compartilhe esse código para seus amigos se juntarem ao círculo!
      </Text>

      
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>{codigo}</Text>
      </View>

      
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate("Orbitas")}>
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
    alignItems: 'center',
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
    marginBottom: 30,
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
    color: '#1E2330',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  codeBox: {
    backgroundColor: '#CFE2FF',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 40,
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7A7A7A',
  },
  button: {
    backgroundColor: '#283BE3',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});