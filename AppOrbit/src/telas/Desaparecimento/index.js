import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

export default function Desaparecidos({navigation}) {

  const desaparecidos = [
    {
      nome: 'João da Silva',
      idade: '35 anos',
      altura: '1,78m',
      ultimaVezVisto: '10/08/2023',
      ultimoLocal: 'Praça da Sé, São Paulo',
      telefone: '(11) 98765-4321',
      imagem: require('../../../assets/sem-foto.png')  },
    {
      nome: 'Maria Oliveira',
      idade: '28 anos',
      altura: '1,65m',
      ultimaVezVisto: '15/08/2023',
      ultimoLocal: 'Shopping Center Norte',
      telefone: '(11) 91234-5678',
      imagem: require('../../../assets/sem-foto.png')
    },
    {
      nome: 'Carlos Pereira',
      idade: '42 anos',
      altura: '1,82m',
      ultimaVezVisto: '05/08/2023',
      ultimoLocal: 'Av. Paulista, 1000',
      telefone: '(11) 99876-5432',
      imagem: require('../../../assets/sem-foto.png')
    }
  ];

  return (
    <LinearGradient
      colors={['#1B2CC1', '#0D155B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        
        <Text style={styles.title}>Desaparecidos</Text>
        
        <TouchableOpacity 
          style={styles.addIcon}
          onPress={() => navigation.navigate("CadDesaparecimento")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {desaparecidos.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.cardContainer}
            onPress={() => navigation.navigate("InfoDesaparecimento", { desaparecido: item })}
          >
            <View style={styles.imageShadow}>
              <Image 
                source={item.imagem} 
                style={styles.profileImage}
              />
            </View>
            
            <View style={styles.card}>
              <Text style={styles.userName}>{item.nome}</Text>
              
              <View style={styles.infoSection}>
                <View style={styles.infoItem}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="time-outline" size={16} color="#FFFFFF" />
                  </View>
                  <Text style={styles.infoText}>Desaparecido desde: {item.ultimaVezVisto}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="location-outline" size={16} color="#FFFFFF" />
                  </View>
                  <Text style={styles.infoText}>Último local: {item.ultimoLocal}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="call-outline" size={16} color="#FFFFFF" />
                  </View>
                  <Text style={styles.infoText}>Contato: {item.telefone}</Text>
                </View>
              </View>
              
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Idade</Text>
                  <Text style={styles.detailValue}>{item.idade}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Altura</Text>
                  <Text style={styles.detailValue}>{item.altura}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    position: 'relative',
    marginBottom: 20,
  },
  addIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  imageShadow: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginRight: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  card: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  infoSection: {
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
    opacity: 0.9,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});