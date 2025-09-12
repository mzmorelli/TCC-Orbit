import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import axios from "axios";

export default function CadDesaparecimento({ navigation }) {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    idade: "",
    altura: "",
    sexo: "M",
    telefone: "",
    ultimoLocal: "",
    ultimaData: "",
    descricao: "",
    imagem: null,
  });

  const formatarTelefone = (numero) => {
    if (!numero || typeof numero !== "string") return "";

    return numero
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputFocused, setInputFocused] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName) => {
    setInputFocused(fieldName);
  };

  const handleBlur = () => {
    setInputFocused(null);
  };

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Acesso à galeria é obrigatório.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, imagem: result.assets[0].uri }));
    }
  };

  const enviarDados = async () => {
    const telefoneNumerico = formData.telefone.replace(/\D/g, "");

    if (
      !formData.nomeCompleto.trim() ||
      !formData.idade ||
      !formData.ultimoLocal.trim()
    ) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios!");
      return;
    }

    if (!formData.imagem) {
      Alert.alert("Atenção", "Selecione uma imagem!");
      return;
    }

    if (telefoneNumerico && telefoneNumerico.length < 10) {
      Alert.alert("Erro", "Número de telefone inválido.");
      return;
    }

    if (isLoading || isSubmitted) return;
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      const localUri = formData.imagem;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formDataToSend.append("imagem", {
        uri: localUri,
        name: filename,
        type,
      });

      formDataToSend.append(
        "data",
        JSON.stringify({
          nomeCompleto: formData.nomeCompleto.trim(),
          idade: formData.idade,
          altura: formData.altura || null,
          sexo: formData.sexo,
          telefone: telefoneNumerico || null,
          ultimoLocal: formData.ultimoLocal.trim(),
          ultimaData: formData.ultimaData || null,
          descricao: formData.descricao.trim() || null,
          origem: "app"
        })
      );

      const response = await axios.post(
        `http://10.68.36.140/appTcc/salvar.php`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setIsSubmitted(true);
        Alert.alert("Sucesso", "Desaparecimento cadastrado!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Erro", response.data.message || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Falha ao conectar com o servidor.");
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
        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={selecionarImagem}
        >
          {formData.imagem ? (
            <Image
              source={{ uri: formData.imagem }}
              style={styles.imagePreview}
            />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={32} color="rgba(255,255,255,0.7)" />
              <Text style={styles.addPhotoText}>Adicionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={[
              styles.input,
              inputFocused === "nomeCompleto" && styles.inputFocused,
            ]}
            value={formData.nomeCompleto}
            onChangeText={(text) => handleChange("nomeCompleto", text)}
            onFocus={() => handleFocus("nomeCompleto")}
            onBlur={handleBlur}
            placeholder="Digite o nome completo"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Idade *</Text>
            <TextInput
              style={[
                styles.input,
                inputFocused === "idade" && styles.inputFocused,
              ]}
              value={formData.idade}
              onChangeText={(text) =>
                handleChange("idade", text.replace(/[^0-9]/g, ""))
              }
              onFocus={() => handleFocus("idade")}
              onBlur={handleBlur}
              keyboardType="numeric"
              placeholder="Ex: 32"
              placeholderTextColor="rgba(255,255,255,0.5)"
              maxLength={3}
            />
          </View>

          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={[
                styles.input,
                inputFocused === "altura" && styles.inputFocused,
              ]}
              value={formData.altura}
              onChangeText={(text) =>
                handleChange("altura", text.replace(/[^0-9]/g, ""))
              }
              onFocus={() => handleFocus("altura")}
              onBlur={handleBlur}
              placeholder="Ex: 175"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Último local visto *</Text>
          <TextInput
            style={[
              styles.input,
              inputFocused === "ultimoLocal" && styles.inputFocused,
            ]}
            value={formData.ultimoLocal}
            onChangeText={(text) => handleChange("ultimoLocal", text)}
            onFocus={() => handleFocus("ultimoLocal")}
            onBlur={handleBlur}
            placeholder="Ex: Avenida Brasil, próximo ao banco"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.sexoContainer}>
            <TouchableOpacity
              style={[
                styles.sexoButton,
                formData.sexo === "M" && styles.sexoSelected,
              ]}
              onPress={() => handleChange("sexo", "M")}
            >
              <Text
                style={[
                  styles.sexoText,
                  formData.sexo === "M" && styles.sexoSelectedText,
                ]}
              >
                Masculino
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sexoButton,
                formData.sexo === "F" && styles.sexoSelected,
              ]}
              onPress={() => handleChange("sexo", "F")}
            >
              <Text
                style={[
                  styles.sexoText,
                  formData.sexo === "F" && styles.sexoSelectedText,
                ]}
              >
                Feminino
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Telefone para contato</Text>
            <TextInput
              style={[
                styles.input,
                inputFocused === "telefone" && styles.inputFocused,
              ]}
              value={formData.telefone}
              onChangeText={(text) => handleChange("telefone", formatarTelefone(text))}
              onFocus={() => handleFocus("telefone")}
              onBlur={handleBlur}
              placeholder="(00) 00000-0000"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="phone-pad"
            />
          </View>

          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Última data visto</Text>
            <TouchableOpacity
              onPress={() => setMostrarCalendario(true)}
              style={[
                styles.dataInput,
                inputFocused === "ultimaData" && styles.inputFocused,
              ]}
            >
              <Text
                style={[
                  styles.dataText,
                  !formData.ultimaData && { opacity: 0.5 },
                ]}
              >
                {formData.ultimaData || "Selecione a data"}
              </Text>
            </TouchableOpacity>

            {mostrarCalendario && (
              <DateTimePicker
                value={dataSelecionada}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setMostrarCalendario(Platform.OS === "ios"); // iOS continua aberto
                  if (selectedDate) {
                    const data = selectedDate.toLocaleDateString("pt-BR");
                    setDataSelecionada(selectedDate);
                    handleChange("ultimaData", data); // atualiza no formData
                  }
                }}
              />
            )}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[
              styles.input,
              styles.descriptionInput,
              inputFocused === "descricao" && styles.inputFocused,
            ]}
            value={formData.descricao}
            onChangeText={(text) => handleChange("descricao", text)}
            onFocus={() => handleFocus("descricao")}
            onBlur={handleBlur}
            multiline
            numberOfLines={4}
            placeholder="Descreva as roupas, características físicas, etc."
            placeholderTextColor="rgba(255,255,255,0.5)"
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (isLoading || isSubmitted) && styles.submitButtonDisabled,
          ]}
          onPress={enviarDados}
          disabled={isLoading || isSubmitted}
        >
          <Text style={styles.submitText}>
            {isLoading
              ? "Enviando..."
              : isSubmitted
              ? "Cadastrado!"
              : "Cadastrar Desaparecimento"}
          </Text>
          {!(isLoading || isSubmitted) && (
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1e5f4", // fundo leve
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
    backgroundColor: "rgba(19,89,145,0.2)", // destaque suave
    marginRight: 15,
  },
  titulo: {
    fontSize: 20,
    color: "#2c3e50",
    fontWeight: "600",
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
    alignItems: "center",
  },
  photoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FFFFFF",
    opacity: 0.2,
    borderWidth: 2,
    borderColor: "#135991", // destaque azul
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#135991", // destaque azul
  },
  addPhotoText: {
    color: "#135991", // destaque azul
    fontSize: 14,
    marginTop: 10,
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
    opacity: 0.9,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#2c3e50",
    borderWidth: 1,
    borderColor: "rgba(19,89,145,0.2)", // borda leve azul
  },
  inputFocused: {
    borderColor: "#135991", // destaque ao focar
  },
  descriptionInput: {
    height: 120,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sexoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sexoButton: {
    flex: 1,
    padding: 14,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    opacity: 0.2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(19,89,145,1)", // borda azul suave
    marginHorizontal: 5,
  },
  sexoSelected: {
    backgroundColor: "#135991",
    borderColor: "#135991",
  },
  sexoText: {
    fontSize: 14,
    color: "#ffff",
  },
  sexoSelectedText: {
    color: "#fff",
    fontWeight: "500",
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
    marginRight: 8,
  },
  dataInput: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(19,89,145,0.2)", // leve azul
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    opacity: 0.2,
    justifyContent: "center",
    color: "#2c3e50",
  },
  dataText: {
    fontSize: 15,
    color: "#2c3e50",
    opacity: 0.9,
  },
});
