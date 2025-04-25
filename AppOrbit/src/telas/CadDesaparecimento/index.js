import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function CadDesaparecimento({navigation}) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [idade, setIdade] = useState("");
  const [altura, setAltura] = useState("");
  const [sexo, setSexo] = useState("M");
  const [telefone, setTelefone] = useState("");
  const [ultimoLocal, setUltimoLocal] = useState("");
  const [ultimaData, setUltimaData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const enviarDados = () => {
    if (nomeCompleto == "" || idade == "" || ultimoLocal == "") {
      alert("Por favor, preencha os campos obrigatórios!");
      return;
    }

    alert("Notificação registrada com sucesso!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1B2CC1" />
        </TouchableOpacity>
        <Text style={styles.titulo}>NOTIFICAR DESAPARECIMENTO</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.addPhotoButton}>
          <Text style={styles.addPhotoText}>+ Adicionar Foto</Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Digite o nome completo"
        />

        <TextInput
          style={styles.input}
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
          placeholder="Idade"
        />

        <TextInput
          style={styles.input}
          value={altura}
          onChangeText={setAltura}
          placeholder="Ex: 1.75"
        />

        <TextInput
          style={styles.input}
          value={ultimoLocal}
          onChangeText={setUltimoLocal}
          placeholder="Local onde foi visto pela última vez"
        />

        <Text style={styles.label}>SEXO:</Text>
        <View style={styles.sexoContainer}>
          <TouchableOpacity
            style={[styles.sexoButton, sexo === "M" && styles.sexoSelected]}
            onPress={() => setSexo("M")}
          >
            <Text style={[styles.sexoText, sexo === "M" && styles.sexoSelectedText]}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sexoButton, sexo === "F" && styles.sexoSelected]}
            onPress={() => setSexo("F")}
          >
            <Text style={[styles.sexoText, sexo === "F" && styles.sexoSelectedText]}>F</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>TELEFONE PARA CONTATO:</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="(00) 00000-0000"
        />

        <Text style={styles.label}>ÚLTIMA DATA VISTO:</Text>
        <TextInput
          style={styles.input}
          value={ultimaData}
          onChangeText={setUltimaData}
          placeholder="DD/MM/AAAA"
        />

        <Text style={styles.label}>DESCRIÇÃO:</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
          placeholder="Descreva as roupas, características físicas, etc."
        />

        <TouchableOpacity style={styles.submitButton} onPress={enviarDados}>
          <Text style={styles.submitText}>POSTAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    textTransform: 'uppercase',
    paddingLeft: 15
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1E2330',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputFocused: {
    borderColor: "#283BE3",
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  addPhotoButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  addPhotoText: {
    color: "#555",
    fontSize: 16,
  },
  sexoContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  sexoButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  sexoSelected: {
    backgroundColor: "#283BE3",
  },
  sexoText: {
    fontSize: 16,
    color: "#000",
  },
  sexoSelectedText: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#283BE3",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});