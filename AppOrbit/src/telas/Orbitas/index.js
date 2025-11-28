import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { BASE_URL } from "../../../url.js";

export default function Orbitas({ navigation }) {
  const [orbitas, setOrbitas] = useState([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);

  useEffect(() => {
    carregarOrbitas();
  }, []);

  const carregarOrbitas = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/listar-orbitas.php`);

      if (response.data.success) {
        setOrbitas(response.data.orbita); 
      }
    } catch (error) {
      console.log("Erro ao carregar órbitas:", error);
    }
  };

  const toggleGrupo = (id) => {
    setGrupoSelecionado(grupoSelecionado === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Órbitas</Text>
      </View>

      <FlatList
        data={orbitas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => toggleGrupo(item.id)} style={styles.groupItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="planet-outline" size={24} color="#135991" />

              </View>

              <Text style={styles.groupName}>{item.nome}</Text>

              <Ionicons name="chevron-down" size={18} color="#135991" />
            </TouchableOpacity>

            {grupoSelecionado === item.id && (
              <Animatable.View animation="fadeInDown" duration={400} style={styles.optionsContainer}>
                
                <TouchableOpacity
                  onPress={() => navigation.navigate("Home", { orbitaId: item.id })}
                >
                  <Text style={styles.optionText}>Ver no Mapa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChatOrbitas", {
                      orbitaId: item.id,
                      nomeOrbita: item.nome
                    })
                  }
                >
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
  container: { flex: 1, backgroundColor: '#d1e5f4' },
  header: {
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#135991',
    fontWeight: '600',
  },
  listContainer: { padding: 30 },
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
  groupName: { flex: 1, fontSize: 16, color: '#135991' },
  optionsContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  optionText: { color: '#135991', paddingVertical: 8 },
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
