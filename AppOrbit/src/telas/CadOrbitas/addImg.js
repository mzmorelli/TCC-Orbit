import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddImg({ navigation }) {
  return (
    <LinearGradient
      colors={['#1B2CC1', '#0D155B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Foto</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Conteúdo Principal - Ajustado para ficar mais acima */}
      <View style={styles.content}>
        {/* Indicador de Passos - Reduzi o marginBottom */}
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        {/* Ícone Grande - Reduzi o tamanho e marginBottom */}
        <View style={styles.iconContainer}>
          <Ionicons name="camera" size={80} color="rgba(255,255,255,0.7)" />
        </View>

        {/* Botão Adicionar - Ajuste de posicionamento */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => console.log('Adicionar foto')}
          >
            <Text style={styles.buttonText}>Adicionar Foto</Text>
          </TouchableOpacity>

          {/* Link para Pular - Mais próximo do botão */}
          <TouchableOpacity
            onPress={() => navigation.navigate('CompartilharOrbita')}
          >
            <Text style={styles.skipText}>Pular esta etapa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,  // Reduzi o padding
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,  // Reduzi a margem
  },
  backIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,  // Adicionei paddingTop para subir o conteúdo
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,  // Reduzi o espaçamento
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    width: 150,  // Reduzi o tamanho
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,  // Reduzi o espaçamento
  },
  buttonContainer: {
    marginTop: 20,  // Ajuste de posicionamento
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#283BE3',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 15,  // Reduzi o espaçamento
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  skipText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});