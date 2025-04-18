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

export default function NotificacaoDesaparecimento() {
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
    <View style={styles.headerView}>
      <Text style={styles.header}>NOTIFICAR DESAPARECIMENTO</Text>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
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
            <Text style={styles.sexoText}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sexoButton, sexo === "F" && styles.sexoSelected]}
            onPress={() => setSexo("F")}
          >
            <Text style={styles.sexoText}>F</Text>
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
    backgroundColor: "#EAECEF",
  },
  headerView: {
    flex: 1,
    backgroundColor: "#EAECEF",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
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
  },
  sexoSelected: {
    backgroundColor: "#283BE3",
    color: "#fff",
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
