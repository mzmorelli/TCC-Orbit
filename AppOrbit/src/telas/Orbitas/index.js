import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function Orbitas({ navigation }) {
  const grupos = [
    { id: '1', nome: 'Família', icone: 'home' },
    { id: '2', nome: 'Amigos', icone: 'beer' },
    { id: '3', nome: 'Amor', icone: 'heart-circle' },
  ];

  const [grupoSelecionado, setGrupoSelecionado] = useState(null);

  const toggleGrupo = (id) => {
    setGrupoSelecionado(grupoSelecionado === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Órbitas</Text>
      </View>

      <FlatList
        data={grupos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => toggleGrupo(item.id)} style={styles.groupItem}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icone} size={22} color="#135991" />
              </View>
              <Text style={styles.groupName}>{item.nome}</Text>
              <Ionicons name="chevron-down" size={18} color="#135991" />
            </TouchableOpacity>

            {grupoSelecionado === item.id && (
              <Animatable.View
                animation="fadeInDown"
                duration={400}
                style={styles.optionsContainer}
              >
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.optionText}>Ver no Mapa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ListaChat')}>
                  <Text style={styles.optionText}>Ir para o Chat</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CriarOrbita')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:'#d1e5f4' },
  header: {
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#135991',
    fontWeight: '600',
  },
  listContainer: {
    padding: 30,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  groupName: {
    flex: 1,
    fontSize: 16,
    color: '#135991',
  },
  optionsContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  optionText: {
    color: '#135991',
    paddingVertical: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#135991',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
