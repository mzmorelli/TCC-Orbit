import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import BASE_URL from "../../../url.js";

export default function EditarDesaparecido({ route, navigation }) {
  const { dados } = route.params;

  const [nome, setNome] = useState(dados.nome);
  const [idade, setIdade] = useState(dados.idade);
  const [altura, setAltura] = useState(dados.altura);
  const [vezVisto, setVezVisto] = useState(dados.vezVisto);
  const [localVisto, setLocalVisto] = useState(dados.localVisto);
  const [telefoneContato, setTelefoneContato] = useState(dados.telefoneContato);
  const [imagem, setImagem] = useState(dados.imagem);
  const [isLoading, setIsLoading] = useState(false);

  const salvarEdicao = async () => {
    if (!nome.trim() || !idade || !localVisto.trim()) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios!");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/editar_desaparecidos.php`, {
        id: dados.id,
        nome,
        idade,
        altura,
        vezVisto,
        localVisto,
        telefoneContato,
        imagem,
      });

      if (response.data.success) {
        Alert.alert("Sucesso", "Anúncio atualizado!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Erro", response.data.message || "Erro ao atualizar.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Editar Desaparecido</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${BASE_URL}/uploads/${imagem}` }}
            style={styles.imagePreview}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome completo"
            placeholderTextColor="rgba(44, 62, 80, 0.5)"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Idade *</Text>
          <TextInput
            style={styles.input}
            value={idade}
            onChangeText={setIdade}
            placeholder="Ex: 32"
            placeholderTextColor="rgba(44, 62, 80, 0.5)"
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Altura (cm)</Text>
          <TextInput
            style={styles.input}
            value={altura}
            onChangeText={setAltura}
            placeholder="Ex: 175"
            placeholderTextColor="rgba(44, 62, 80, 0.5)"
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Último local visto *</Text>
          <TextInput
            style={styles.input}
            value={localVisto}
            onChangeText={setLocalVisto}
            placeholder="Ex: Avenida Brasil, próximo ao banco"
            placeholderTextColor="rgba(44, 62, 80, 0.5)"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Data da última vez visto</Text>
          <TextInput
            style={styles.input}
            value={vezVisto}
            onChangeText={setVezVisto}
            placeholder="Ex: 15/11/2024"
            placeholderTextColor="rgba(44, 62, 80, 0.5)"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Telefone para contato</Text>
          <TextInput
            style={styles.input}
            value={telefoneContato}
            onChangeText={setTelefoneContato}
            placeholder="(00) 00000-0000"
            placeholderTextColor="rgba(44, 62, 80, 0.5)"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          onPress={salvarEdicao}
          disabled={isLoading}
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled
          ]}
        >
          <Text style={styles.submitText}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1e5f4",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(19,89,145,0.2)",
    marginRight: 15,
  },
  titulo: {
    fontSize: 20,
    color: "#2c3e50",
    fontWeight: "600",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#135991",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#2c3e50",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#2c3e50",
    borderWidth: 1,
    borderColor: "rgba(19,89,145,0.2)",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#135991",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#6c757d",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});