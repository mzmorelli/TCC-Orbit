import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
    navigation.goBack();
  };

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
        <Text style={styles.titulo}>Notificar Desaparecimento</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.addPhotoButton}>
          <View style={styles.photoPlaceholder}>
            <Ionicons name="camera" size={32} color="rgba(255,255,255,0.7)" />
            <Text style={styles.addPhotoText}>Adicionar Foto</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Digite o nome completo"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, {flex: 1, marginRight: 10}]}>
            <Text style={styles.label}>Idade *</Text>
            <TextInput
              style={styles.input}
              value={idade}
              onChangeText={setIdade}
              keyboardType="numeric"
              placeholder="Ex: 32"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>
          
          <View style={[styles.formGroup, {flex: 1}]}>
            <Text style={styles.label}>Altura</Text>
            <TextInput
              style={styles.input}
              value={altura}
              onChangeText={setAltura}
              placeholder="Ex: 1.75"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Último local visto *</Text>
          <TextInput
            style={styles.input}
            value={ultimoLocal}
            onChangeText={setUltimoLocal}
            placeholder="Onde foi visto pela última vez"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.sexoContainer}>
            <TouchableOpacity
              style={[styles.sexoButton, sexo === "M" && styles.sexoSelected]}
              onPress={() => setSexo("M")}
            >
              <Text style={[styles.sexoText, sexo === "M" && styles.sexoSelectedText]}>Masculino</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sexoButton, sexo === "F" && styles.sexoSelected]}
              onPress={() => setSexo("F")}
            >
              <Text style={[styles.sexoText, sexo === "F" && styles.sexoSelectedText]}>Feminino</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, {flex: 1, marginRight: 10}]}>
            <Text style={styles.label}>Telefone para contato</Text>
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
              placeholder="(00) 00000-0000"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={[styles.formGroup, {flex: 1}]}>
            <Text style={styles.label}>Última data visto</Text>
            <TextInput
              style={styles.input}
              value={ultimaData}
              onChangeText={setUltimaData}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            placeholder="Descreva as roupas, características físicas, etc."
            placeholderTextColor="rgba(255,255,255,0.5)"
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={enviarDados}>
          <Text style={styles.submitText}>Cadastrar Desaparecimento</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  backIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 15,
  },
  titulo: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  addPhotoButton: {
    marginBottom: 25,
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputFocused: {
    borderColor: '#FFFFFF',
  },
  descriptionInput: {
    height: 120,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sexoContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  sexoButton: {
    flex: 1,
    padding: 14,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 5,
  },
  sexoSelected: {
    backgroundColor: "#283BE3",
    borderColor: '#283BE3',
  },
  sexoText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  sexoSelectedText: {
    color: "#fff",
    fontWeight: '500',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283BE3',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});