import React, { useEffect, useState, useContext } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from '../../userContext/index.js';
import axios from "axios";

const { width } = Dimensions.get("window");

const BASE_URL = "http://10.239.0.243//appTcc";

export default function Alerta({ navigation }) {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);


  const fetchAlertas = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/listar_alerta.php`);
      if (response.data.success) {
        setAlertas(response.data.alertas);
      }
    } catch (error) {
      console.log("Erro:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAlertas();
  };

  useEffect(() => {
    fetchAlertas();
  }, []);

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusColor = (index) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"];
    return colors[index % colors.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Alertas do Sistema</Text>
          <Text style={styles.headerSubtitle}>Últimas notificações de emergência</Text>
        </View>
        
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{alertas.length}</Text>
            <Text style={styles.statLabel}>Total de Alertas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {alertas.filter(a => new Date(a.criado_em).toDateString() === new Date().toDateString()).length}
            </Text>
            <Text style={styles.statLabel}>Hoje</Text>
          </View>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0B3D91" />
            <Text style={styles.loadingText}>Carregando alertas...</Text>
          </View>
        ) : (
          <FlatList
            data={alertas}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#0B3D91"]}
                tintColor="#0B3D91"
              />
            }
            renderItem={({ item, index }) => (
              <View style={[
                styles.card,
                { borderLeftColor: getStatusColor(index) }
              ]}>
                <View style={styles.cardHeader}>
                  <View style={styles.alertIcon}>
                    <Ionicons name="warning" size={20} color={getStatusColor(index)} />
                  </View>
                  <View style={styles.alertInfo}>
                    <Text style={styles.mensagem}>{item.mensagem}</Text>
                    <Text style={styles.timestamp}>{formatarData(item.criado_em)}</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.userInfo}>
                    <Ionicons name="person-circle" size={16} color="#6B93B8" />
                    <Text style={styles.usuario}>{item.usuario?.split(' ')[0] || 'Usuário'}</Text>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="notifications-off" size={64} color="#C5D9E8" />
                <Text style={styles.emptyTitle}>Nenhum alerta encontrado</Text>
                <Text style={styles.emptySubtitle}>
                  Quando houver novos alertas, eles aparecerão aqui
                </Text>
              </View>
            }
            contentContainerStyle={alertas.length === 0 && { flex: 1 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFD",
  },
  header: {
    backgroundColor: "#135991",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  notificationIcon: {
    position: "relative",
    padding: 8,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FF5757",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#0B3D91",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0B3D91",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B93B8",
    marginTop: 4,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6B93B8",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#0B3D91",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  alertIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertInfo: {
    flex: 1,
  },
  mensagem: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B3D91",
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: "#6B93B8",
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E6F0FA",
    paddingTop: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  usuario: {
    fontSize: 14,
    color: "#6B93B8",
    marginLeft: 6,
  },
  alertId: {
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  idText: {
    fontSize: 10,
    color: "#0B3D91",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B3D91",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B93B8",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0B3D91",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});