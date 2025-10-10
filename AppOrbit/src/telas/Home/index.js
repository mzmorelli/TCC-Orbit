import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WebView from "react-native-webview";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { UserContext } from '../../userContext/index.js';

export default function Home({ navigation }) {
  const { user } = useContext(UserContext);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [orbitas, setOrbitas] = useState([]);
  const [loadingDesaparecidos, setLoadingDesaparecidos] = useState(true);
  const [loadingOrbitas, setLoadingOrbitas] = useState(true);

  const toggleGrupo = (id) => {
    setGrupoSelecionado(grupoSelecionado === id ? null : id);
  };


  useEffect(() => {
    const fetchDesaparecidos = async () => {
      try {
        const response = await axios.get(
          "http://10.239.20.67//appTcc/listar-cards.php"
        );
        if (response.data.success) {
          setDesaparecidos(response.data.dados);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDesaparecidos(false);
      }
    };
    fetchDesaparecidos();
  }, []);

  useEffect(() => {
    const fetchOrbitas = async () => {
      try {
        const response = await axios.get(
          "http://10.239.20.67//appTcc/listar-orbitas.php"
        );
        if (response.data.success) {
          setOrbitas(response.data.orbita);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingOrbitas(false);
      }
    };
    fetchOrbitas();
  }, []);

  return (
    <FlatList
      data={orbitas}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: "https://via.placeholder.com/60" }}
                  style={styles.userPhoto}
                />
                <View style={styles.userTextContainer}>
                  <Text style={styles.welcome}>
                    Bem-vindo, {(user?.nome || "Usuário").split(' ')[0]}
                  </Text>

                  <Text style={styles.subtitle}>Explore o Orbit</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => navigation.navigate("Alerta")}
              >
                <Ionicons name="notifications-outline" size={24} color="#fff" />
                <View style={styles.notificationBadge}></View>
              </TouchableOpacity>

            </View>
          </View>

          <View style={styles.mainSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Desaparecidos</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Confira as pessoas desaparecidas cadastradas no aplicativo
            </Text>

            {loadingDesaparecidos ? (
              <ActivityIndicator
                size="large"
                color="#0B3D91"
                style={{ marginTop: 20 }}
              />
            ) : (
              <FlatList
                data={desaparecidos}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.desaparecidosList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.desaparecidoItem}
                    onPress={() =>
                      navigation.navigate("InfoDesaparecimento", {
                        desaparecido: item,
                      })
                    }
                  >
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri:
                            item.origem === "site"
                              ? `http://10.239.20.67/SiteOrbit/static/uploads/${item.imagem}`
                              : `http://10.239.20.67/appTcc/uploads/${item.imagem}`,
                        }}
                        style={styles.desaparecidoPhoto}
                      />
                    </View>
                    <Text
                      style={styles.desaparecidoName}
                      numberOfLines={1}
                    >
                      {item.nome}
                    </Text>
                    <Text style={styles.desaparecidoAge}>{item.idade} anos</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButton}
                onPress={() =>
                  navigation.navigate("CadDesaparecimento")
                }>
                <View style={[styles.actionIcon, { backgroundColor: "#E6F2FF" }]}>
                  <Ionicons name="add-circle" size={24} color="#0B3D91" />
                </View>
                <Text style={styles.actionText}>Reportar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}
              onPress={()=>
                navigation.navigate("MapaTodosDesaparecidos")
              }>
                <View style={[styles.actionIcon, { backgroundColor: "#FFF2E6" }]}>
                  <Ionicons name="map" size={24} color="#0B3D91" />
                </View>
                <Text style={styles.actionText}>Mapa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={async () => {
                  try {
                    await axios.post("http://10.239.20.67/appTcc/criar_alerta.php", {
                      usuario: user.nome,
                      mensagem: "🚨 Alerta de emergência enviado!",
                    });
                    alert("Alerta enviado com sucesso!");
                  } catch (error) {
                    alert("Erro ao enviar alerta: " + error.message);
                  }
                }}
              >
                <View style={[styles.actionIcon, { backgroundColor: "#E6FFFA" }]}>
                  <Ionicons name="alert-circle" size={24} color="#0B3D91" />
                </View>
                <Text style={styles.actionText}>Alertas</Text>
              </TouchableOpacity>

            </View>
          </View>

          <View style={styles.chaveiroContainer}>
            <Text style={styles.chaveiroTitle}>Seu Chaveiro</Text>
            <TouchableOpacity
              style={styles.mapaPreviewContainer}
              onPress={() => navigation.navigate("MapaChaveiro")}
            >
              <WebView
  source={{
    html: `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
    <style>
      html, body, #map {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      #map { border-radius: 12px; overflow: hidden; }
      
      .custom-marker {
        background: #135991;
        border: 3px solid #fff;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      
      .custom-marker::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #135991;
      }
      
      .pulse-effect {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #135991;
        cursor: pointer;
        box-shadow: 0 0 0 rgba(19, 89, 145, 0.4);
        animation: pulse 2s infinite;
        position: relative;
      }
      
      .saturn-icon {
        width: 20px;
        height: 20px;
        background: #ffff;
        border-radius: 50%;
        position: relative;
      }
      
      .saturn-icon::before {
        content: '';
        position: absolute;
        width: 30px;
        height: 8px;
        background: #3d6d93ff;
        border-radius: 4px;
        transform: rotate(15deg);
        top: 50%;
        left: 50%;
        margin-top: -4px;
        margin-left: -15px;
        box-shadow: 0 0 2px rgba(0,0,0,0.3);
      }
      
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(19, 89, 145, 0.4);
        }
        70% {
          box-shadow: 0 0 0 15px rgba(19, 89, 145, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(19, 89, 145, 0);
        }
      }
      
      @keyframes rotateSaturn {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .rotating-saturn {
        animation: rotateSaturn 10s linear infinite;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
      var map = L.map('map', { zoomControl: false, attributionControl: false })
        .setView([-24.49940278453548, -47.848294079713284], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      var customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="pulse-effect"><div class="saturn-icon rotating-saturn"></div></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      L.marker([-24.49940278453548, -47.848294079713284], {
        icon: customIcon
      })
        .addTo(map)
        .openPopup();
    </script>
  </body>
</html>`
  }}
  style={styles.mapaPreview}
  scrollEnabled={false}
  originWhitelist={["*"]}
/>
            </TouchableOpacity>
          </View>
        </>

      }
      renderItem={({ item }) => (
        <View style={styles.groupContainer}>
          <TouchableOpacity
            onPress={() => toggleGrupo(item.id)}
            style={[
              styles.groupItem,
              grupoSelecionado === item.id && styles.groupItemActive,
            ]}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icone || "people"} size={22} color="#0B3D91" />
            </View>
            <Text style={styles.groupName}>{item.nome}</Text>
            <Ionicons
              name={grupoSelecionado === item.id ? "chevron-up" : "chevron-down"}
              size={18}
              color="#0B3D91"
            />
          </TouchableOpacity>

          {grupoSelecionado === item.id && (
            <Animatable.View
              animation="fadeInDown"
              duration={400}
              style={styles.optionsContainer}
            >

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => navigation.navigate("Mapa", { orbitaId: item.id })}
              >
                <Ionicons name="map-outline" size={18} color="#0B3D91" />
                <Text style={styles.optionText}>Ver no Mapa</Text>
              </TouchableOpacity>

            </Animatable.View>
          )}
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
}

const { width, height } = Dimensions.get("window");

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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userTextContainer: {
    marginLeft: 16,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  welcome: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5757",
  },
  mainSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#0B3D91",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B3D91",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B93B8",
    marginBottom: 16,
    lineHeight: 20,
  },
  desaparecidosList: {
    paddingVertical: 8,
  },
  desaparecidoItem: {
    marginRight: 16,
    alignItems: "center",
    width: 120,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  desaparecidoPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: "#E6F0FA",
  },
  desaparecidoName: {
    fontSize: 14,
    textAlign: "center",
    color: "#0B3D91",
    fontWeight: "600",
    marginTop: 4,
  },
  desaparecidoAge: {
    fontSize: 12,
    color: "#6B93B8",
    marginTop: 2,
  },
  groupContainer: {
    marginBottom: 4,
    paddingHorizontal: 10
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAFD",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6F0FA",
  },
  groupItemActive: {
    backgroundColor: "#E6F0FA",
    borderColor: "#0B3D91",
  },
  iconContainer: {
    backgroundColor: "#FFFFFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  groupName: {
    fontSize: 16,
    color: "#0B3D91",
    flex: 1,
    fontWeight: "600",
  },
  optionsContainer: {
    backgroundColor: "#F7FAFD",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#0B3D91",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 15,
    color: "#0B3D91",
    marginLeft: 12,
    fontWeight: "500",
  },
  quickActions: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 30,
    borderRadius: 16,
    shadowColor: "#0B3D91",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    color: "#0B3D91",
    fontWeight: "500",
  },
  chaveiroContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#0B3D91',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginBottom: 20,
  },
  chaveiroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B3D91',
    marginBottom: 12,
  },
  mapaPreviewContainer: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapaPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },

});
