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
    <LinearGradient colors={["#1B2CC1", "#0D155B"]} style={styles.container}>
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
            // no futuro: navigation.navigate("EditarDesaparecimento", { desaparecido: placeholder })
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
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 20,
  },
  addIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  imageShadow: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginRight: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  card: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#FFFFFF",
    flex: 1,
    opacity: 0.9,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailItem: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    minWidth: "45%",
  },
  detailLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: "#FFFFFF",
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
