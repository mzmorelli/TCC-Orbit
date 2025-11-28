import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../../../url.js';

export default function ListaChat({ navigation }) {
  const [orbitas, setOrbitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarOrbitas();
  }, []);

  const carregarOrbitas = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/listar-orbitas.php`);
      if (response.data.success && Array.isArray(response.data.orbita)) {
        setOrbitas(response.data.orbita);
      } else {
        console.log("Erro ao buscar órbitas:", response.data);
      }
    } catch (error) {
      console.log("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#135991" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversas</Text>
      </View>

      <FlatList
        data={orbitas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate('ChatOrbitas', {
                orbitaId: item.id,
                nomeOrbita: item.nome,
                membros: item.membro,
              })
            }
          >
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={24} color="#135991" />
            </View>

            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.nome}</Text>
                <Text style={styles.chatTime}>{" "}</Text>
              </View>

              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.membro.length} membros
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e5f4',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 0,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff80',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  chatTime: {
    fontSize: 12,
    color: '#4b5563',
  },
  lastMessage: {
    fontSize: 14,
    color: '#374151',
  },
  separator: {
    height: 1,
    backgroundColor: 'transparent',
  },
});
