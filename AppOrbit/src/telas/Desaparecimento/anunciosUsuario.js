import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Anuncios({ navigation }) {
  const formatarTelefone = (numero) => {
    return numero
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  // Placeholder para exemplo visual
  const placeholder = {
    nome: "João da Silva",
    vezVisto: "12/05/2025",
    localVisto: "Praça Central, São Paulo",
    telefoneContato: "11987654321",
    idade: 35,
    altura: 175,
    imagem: "https://via.placeholder.com/150",
  };

  return (
 <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Anúncios</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => {
          }}
        >
          <View style={styles.imageShadow}>
            <Image
              source={{ uri: placeholder.imagem }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.userName}>{placeholder.nome}</Text>

            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="time-outline" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.infoText}>
                  Desaparecido desde: {placeholder.vezVisto}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="location-outline" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.infoText}>
                  Último local: {placeholder.localVisto}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="call-outline" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.infoText}>
                  Contato: {formatarTelefone(placeholder.telefoneContato)}
                </Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Idade</Text>
                <Text style={styles.detailValue}>{placeholder.idade} anos</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Altura</Text>
                <Text style={styles.detailValue}>{placeholder.altura} cm</Text>
              </View>
            </View>
          </View>

          {/* Aqui adicionamos a área dos ícones */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
              <Ionicons name="create-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
              <Ionicons name="trash-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
      </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1e5f4", // fundo geral mais claro
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#135991", // destaque para o título
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF", // cards claros
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#135991", // borda destaque
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageShadow: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#cfe4f3", // leve sombra azul
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#135991", // borda azul
  },
  card: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#135991",
    marginBottom: 10,
  },
  infoSection: {
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIcon: {
    backgroundColor: "#135991",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#135991",
    flex: 1,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailItem: {
    backgroundColor: "#cfe4f3",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    minWidth: "45%",
  },
  detailLabel: {
    fontSize: 12,
    color: "#135991",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: "#135991",
    fontWeight: "500",
  },
  iconsContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 15,
  },
  iconButton: {
    marginVertical: 8,
  },
});
