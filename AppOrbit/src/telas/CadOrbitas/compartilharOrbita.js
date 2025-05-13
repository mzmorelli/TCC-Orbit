import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CompartilharOrbita({ navigation }) {
  const codigo = 'AWGFFF';

  return (
    <LinearGradient
      colors={['#1B2CC1', '#0D155B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Compartilhar Órbita</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
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

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate("Home", { screen: "Orbitas" })}
        >
          <Ionicons name="checkmark" size={20} color="#FFFFFF" style={styles.buttonIcon} />
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
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
    paddingTop: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
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
  label: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  codeBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 25,
    paddingHorizontal: 50,
    borderRadius: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  codeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#283BE3',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});