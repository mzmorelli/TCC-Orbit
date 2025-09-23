import React, { useEffect, useState, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from '../../userContext';
import axios from "axios";

const BASE_URL = "http://10.239.0.240/appTcc";

export default function MeusDesaparecidos({ navigation }) {
  const { user } = useContext(UserContext);
  const [desaparecidos, setDesaparecidos] = useState([]);

  const fetchMeusDesaparecidos = async () => {
    if (!user) return;
    try {
      const response = await axios.post(`${BASE_URL}/listar_meus_desaparecidos.php`, { usuario_id: user.id });
      if (response.data.success) {
        setDesaparecidos(response.data.desaparecidos);
      }
    } catch (error) {
      console.log("Erro:", error.message);
    }
  };

  useEffect(() => {
    fetchMeusDesaparecidos();
  }, []);

  const formatarTelefone = (numero) => {
    return numero
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {desaparecidos.map((item) => (
        <TouchableOpacity key={item.id} style={styles.cardContainer}>
          <View style={styles.imageShadow}>
            <Image
              source={{ uri: `${BASE_URL}/uploads/${item.imagem}` }}
              style={styles.profileImage}
            />

          </View>

          <View style={styles.card}>
            <Text style={styles.userName}>{item.nome}</Text>

            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="time-outline" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.infoText}>Desaparecido desde: {item.vezVisto}</Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="location-outline" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.infoText}>Último local: {item.localVisto}</Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="call-outline" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.infoText}>Contato: {formatarTelefone(item.telefoneContato)}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Idade</Text>
                <Text style={styles.detailValue}>{item.idade} anos</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Altura</Text>
                <Text style={styles.detailValue}>{item.altura} cm</Text>
              </View>
            </View>
          </View>

          {/* Área dos ícones */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => { }}>
              <Ionicons name="create-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => { }}>
              <Ionicons name="trash-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => { }}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      {desaparecidos.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Nenhum desaparecido encontrado.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d1e5f4" },
  scrollContent: { padding: 20 },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#135991",
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
    backgroundColor: "#cfe4f3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  profileImage: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: "#135991" },
  card: { flex: 1 },
  userName: { fontSize: 18, fontWeight: "600", color: "#135991", marginBottom: 10 },
  infoSection: { marginBottom: 10 },
  infoItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoIcon: {
    backgroundColor: "#135991",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoText: { fontSize: 14, color: "#135991", flex: 1 },
  detailsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  detailItem: { backgroundColor: "#cfe4f3", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12, alignItems: "center", minWidth: "45%" },
  detailLabel: { fontSize: 12, color: "#135991", marginBottom: 2 },
  detailValue: { fontSize: 14, color: "#135991", fontWeight: "500" },
  iconsContainer: { justifyContent: "space-around", alignItems: "center", flexDirection: "column", marginLeft: 15 },
  iconButton: { marginVertical: 8 },
});
