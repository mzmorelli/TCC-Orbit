import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function DesaparecidosLista() {
  // Dados dos desaparecidos (aleatórios, depois vai ter q fazer isso puxando do banco de dados)
  const desaparecidos = [
    {
      nome: 'João da Silva',
      idade: '35 anos',
      altura: '1,78m',
      ultimaVezVisto: '10/08/2023',
      ultimoLocal: 'Praça da Sé, São Paulo',
      telefone: '(11) 98765-4321',
      imagem: ''  },
    {
      nome: 'Maria Oliveira',
      idade: '28 anos',
      altura: '1,65m',
      ultimaVezVisto: '15/08/2023',
      ultimoLocal: 'Shopping Center Norte',
      telefone: '(11) 91234-5678',
      imagem: 'https://via.placeholder.com/100'
    },
    {
      nome: 'Carlos Pereira',
      idade: '42 anos',
      altura: '1,82m',
      ultimaVezVisto: '05/08/2023',
      ultimoLocal: 'Av. Paulista, 1000',
      telefone: '(11) 99876-5432',
      imagem: 'https://via.placeholder.com/100'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DESAPARECIDOS</Text>
      <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollContent}>
        {desaparecidos.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.cardContainer}
            onPress={() => console.log('Card pressionado:', item.nome)}
          >
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: item.imagem }} 
                style={styles.imagePlaceholder}
              />
            </View>
            
            <View style={styles.card}>
              <View style={styles.textRow}>
                <Text style={styles.textInfo}>Nome: </Text>
                <Text style={styles.textResposta}>{item.nome}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.textInfo}>Idade: </Text>
                <Text style={styles.textResposta}>{item.idade}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.textInfo}>Altura: </Text>
                <Text style={styles.textResposta}>{item.altura}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.textInfo}>Última vez visto: </Text>
                <Text style={styles.textResposta}>{item.ultimaVezVisto}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.textInfo}>Último local visto: </Text>
                <Text style={styles.textResposta}>{item.ultimoLocal}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.textInfo}>Telefone de contato: </Text>
                <Text style={styles.textResposta}>{item.telefone}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAECEF',
    paddingTop: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    textTransform: 'uppercase',
  },
  scrollview: {
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  cardContainer: {
    width: '90%',
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 190,
    borderRadius: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#4CB4FF',
    padding: 15,
  },
  textRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  textInfo: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  textResposta: {
    fontSize: 12,
    color: '#333',
  },
});