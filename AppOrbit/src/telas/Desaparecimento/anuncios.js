import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function anuncios({ navigation }) {
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const formatarTelefone = (numero) => {
    if (!numero || typeof numero !== "string") return "";

    return numero
      .replace(/\D/g, "") // remove tudo que não for número
      .replace(/(\d{2})(\d)/, "($1) $2") // coloca parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // coloca o hífen
      .replace(/(-\d{4})\d+?$/, "$1"); // limita a 4 dígitos no final
  };

  useEffect(() => {
    const buscarDesaparecidos = async () => {
      try {
        const response = await axios.get(
          "http://10.239.0.239/appTcc/listar-cards.php"
        );
        if (response.data.success) {
          setDesaparecidos(response.data.dados);
        } else {
          console.log("Erro ao carregar dados:", response.data.message);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDesaparecidos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Desaparecidos</Text>
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => navigation.navigate("CadDesaparecimento")}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: 50 }}
        />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {desaparecidos.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardContainer}
              onPress={() =>
                navigation.navigate("InfoDesaparecimento", {
                  desaparecido: item,
                })
              }
            >
              <View style={styles.imageShadow}>
                <Image
                  source={{
                    uri:
                      item.origem === "site"
                        ? `http://10.239.0.239/SiteOrbit/static/uploads/${item.imagem}`
                        : `http://10.239.0.239/appTcc/uploads/${item.imagem}`,
                  }}
                  style={styles.profileImage}
                />
              </View>

              <View style={styles.card}>
                <Text style={styles.userName}>{item.nome}</Text>
                <Text style={styles.usuario}>Reportado por: {item.usuario_nome}</Text>

                <View style={styles.infoSection}>
                  <View style={styles.infoItem}>
                    <View style={styles.infoIcon}>
                      <Ionicons name="time-outline" size={16} color="#FFFFFF" />
                    </View>
                    <Text style={styles.infoText}>
                      Desaparecido desde: {item.vezVisto}
                    </Text>
                  </View>

                  <View style={styles.infoItem}>
                    <View style={styles.infoIcon}>
                      <Ionicons name="location-outline" size={16} color="#FFFFFF" />
                    </View>
                    <Text style={styles.infoText}>
                      Último local: {item.localVisto}
                    </Text>
                  </View>

                  
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e5f4'
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 24,
    color: "#2c3e50",
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
    backgroundColor: "#89b6dbff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
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
    marginBottom: 5,
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
    color: "#16578dff",
    fontWeight: '500',
    flex: 1,
  },
  usuario: {
    fontSize: 14,
    color: "#4a4c50ff",
    fontStyle: "italic",
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    minWidth: "45%",
  },
  detailLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});