import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { UserContext } from "../../userContext/index.js";
import { BASE_URL } from "../../../url.js";

export default function ChatOrbitas({ route }) {
  const { orbitaId, nomeOrbita } = route.params;
  const { user } = useContext(UserContext);

  const [mensagem, setMensagem] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    buscarMensagens();
    const interval = setInterval(buscarMensagens, 3000);
    return () => clearInterval(interval);
  }, []);

  const buscarMensagens = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/listar_mensagens.php?id=${orbitaId}`
      );

      if (Array.isArray(response.data)) {
        setLista(response.data);
      }
    } catch (error) {
      console.log("Erro ao buscar mensagens:", error);
    }
  };

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    try {
      const formData = new FormData();
      formData.append("orbita_id", orbitaId);
      formData.append("usuario_id", user.id);
      formData.append("mensagem", mensagem);

      await axios.post(`${BASE_URL}/salvar_mensagem.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMensagem("");
      buscarMensagens();
    } catch (error) {
      console.log("Erro ao enviar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{nomeOrbita}</Text>
      </View>
      
      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgBox,
              item.usuario_id == user.id ? styles.msgEnviada : styles.msgRecebida,
            ]}
          >
            <Text style={styles.msgAutor}>
              {item.usuario_id == user.id ? "Você" : item.usuario_nome}
            </Text>
            <Text style={styles.msgTexto}>{item.mensagem}</Text>
            <Text style={styles.msgHora}>{item.data_envio}</Text>
          </View>
        )}
        contentContainerStyle={styles.listaContainer}
      />

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          value={mensagem}
          onChangeText={setMensagem}
          multiline={true}
        />
        <TouchableOpacity 
          style={[styles.botaoEnviar, !mensagem.trim() && styles.botaoDisabled]} 
          onPress={enviarMensagem}
          disabled={!mensagem.trim()}
        >
          <Text style={styles.botaoTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#135991",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  listaContainer: {
    padding: 15,
  },
  msgBox: {
    marginVertical: 8,
    padding: 12,
    maxWidth: "80%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  msgEnviada: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
    borderBottomRightRadius: 4,
  },
  msgRecebida: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  msgAutor: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },
  msgTexto: {
    fontSize: 16,
    color: "#333",
    lineHeight: 20,
  },
  msgHora: {
    fontSize: 11,
    marginTop: 6,
    color: "#888",
    alignSelf: "flex-end",
  },
  inputArea: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    backgroundColor: "#f8f9fa",
    fontSize: 16,
  },
  botaoEnviar: {
    backgroundColor: "#135991",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    minWidth: 70,
  },
  botaoDisabled: {
    backgroundColor: "#ccc",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});