import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function addImg(navigation) {
  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF"
          onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Adicionar foto</Text>

   
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>

  
      {/* <Image
        source={require('./assets/mapa-com-pins.png')} 
        style={styles.image}
        resizeMode="contain"
      /> */}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => navigation.navigate('Orbitas')}>
        <Text style={styles.skipText}>Pular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEEF1',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 30,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E2330',
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
  image: {
    width: 220,
    height: 180,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#283BE3',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  skipText: {
    color: '#1E2330',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});