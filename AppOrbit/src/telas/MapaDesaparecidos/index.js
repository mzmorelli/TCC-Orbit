import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, StatusBar, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function MapaTodosDesaparecidos({ navigation }) {
  const webViewRef = useRef(null);
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    console.log("🔍 Buscando dados dos desaparecidos...");
    
    fetch("http://10.239.23.166/appTcc/listar-coordenadas.php")
      .then(res => res.text())
      .then(text => {
        try {
          const json = JSON.parse(text);
          console.log("📊 Dados completos recebidos:", json);
          
          if(json.success){
            console.log(`✅ ${json.dados.length} desaparecidos carregados`);
            
            // Verifica o primeiro item para ver todos os campos
            if (json.dados.length > 0) {
              console.log("📋 Campos do primeiro desaparecido:", Object.keys(json.dados[0]));
              console.log("🔍 Dados completos do primeiro:", json.dados[0]);
            }
            
            setDesaparecidos(json.dados);
          } else {
            Alert.alert("Erro", json.error || "Erro ao carregar dados");
          }
        } catch (e) {
          console.error("❌ Erro ao parsear JSON:", e);
          Alert.alert("Erro", "Dados inválidos do servidor");
        }
      })
      .catch(error => {
        console.error("🚨 Erro de conexão:", error);
        Alert.alert("Erro", "Não foi possível conectar ao servidor");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Função para navegar para a tela de informações
  const navigateToInfo = (desaparecido) => {
    console.log("📱 Navegando para informações do:", desaparecido.nome);
    console.log("📋 Dados que serão enviados:", desaparecido);
    
    // Verifica se todos os campos necessários estão presentes
    const camposRequeridos = ['idade', 'altura', 'sexo', 'descricao', 'telefoneContato', 'vezVisto', 'usuario_nome'];
    const camposFaltantes = camposRequeridos.filter(campo => !desaparecido[campo]);
    
    if (camposFaltantes.length > 0) {
      console.warn("⚠️ Campos faltantes:", camposFaltantes);
    }
    
    navigation.navigate("InfoDesaparecimento", { 
      desaparecido: desaparecido 
    });
  };

  // Envia dados quando mapa estiver pronto
  useEffect(() => {
    if (mapLoaded && desaparecidos.length > 0) {
      console.log("🚀 Enviando dados para o mapa:", desaparecidos.length, "registros");
      
      const dataString = JSON.stringify(desaparecidos);
      webViewRef.current.injectJavaScript(`
        try {
          var data = ${dataString};
          window.processMapData(data);
          true;
        } catch(error) {
          console.error("❌ Erro:", error);
          false;
        }
      `);
    }
  }, [mapLoaded, desaparecidos]);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body, html {
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          #map { 
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
          }
          
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
          
          .disappearance-marker {
            background-color: #FF6B6B;
            width: 32px;
            height: 32px;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            font-family: Arial, sans-serif;
          }
          
          .leaflet-popup-content-wrapper {
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            overflow: hidden;
          }
          
          .leaflet-popup-content {
            margin: 0;
            padding: 0;
            min-width: 250px;
          }
          
          .popup-content {
            padding: 16px;
          }
          
          .popup-title {
            font-size: 16px;
            font-weight: bold;
            color: #FF6B6B;
            margin-bottom: 8px;
          }
          
          .popup-location {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
          }
          
          .popup-button {
            background-color: #1B2CC1;
            padding: 10px 16px;
            border-radius: 8px;
            text-align: center;
            margin-top: 8px;
            cursor: pointer;
          }
          
          .popup-button-text {
            color: white;
            font-weight: 600;
            font-size: 14px;
          }
          
          .leaflet-popup-tip {
            box-shadow: none;
          }
          
          .marker-cluster-small {
            background-color: rgba(255, 107, 107, 0.6);
            border: 3px solid rgba(255, 255, 255, 0.8);
          }
          .marker-cluster-small div {
            background-color: rgba(255, 107, 107, 0.8);
            color: white;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script src="https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js"></script>
        
        <script>
          var map = L.map('map', {
            zoomControl: true,
            zoomControlPos: 'bottomright',
            dragging: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true
          }).setView([-14.235, -51.9253], 4);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);
          
          var markers = L.markerClusterGroup({
            chunkedLoading: true,
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
          });
          map.addLayer(markers);
          
          function createCustomIcon() {
            return L.divIcon({
              html: '<div class="disappearance-marker">!</div>',
              className: 'custom-marker',
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            });
          }
          
          // Armazena os dados globalmente
          window.allDesaparecidosData = [];
          
          window.processMapData = function(data) {
            console.log("📍 Processando " + data.length + " desaparecidos");
            
            // Salva os dados globalmente
            window.allDesaparecidosData = data;
            
            markers.clearLayers();
            
            var bounds = L.latLngBounds();
            var markersAdded = 0;
            
            data.forEach(function(item) {
              var lat = parseFloat(item.latitude);
              var lon = parseFloat(item.longitude);
              
              if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
                var marker = L.marker([lat, lon], { 
                  icon: createCustomIcon() 
                });
                
                var popupContent = 
                  '<div class="popup-content">' +
                  '<div class="popup-title">' + (item.nome || 'Desaparecido') + '</div>' +
                  '<div class="popup-location">' + (item.localVisto || 'Local não informado') + '</div>' +
                  '<div class="popup-button" onclick="window.ReactNativeWebView.postMessage(\\'NAVIGATE_TO_INFO_' + item.id + '\\')">' +
                  '<div class="popup-button-text">Ver mais informações</div>' +
                  '</div>' +
                  '</div>';
                
                marker.bindPopup(popupContent);
                markers.addLayer(marker);
                
                bounds.extend([lat, lon]);
                markersAdded++;
              }
            });
            
            console.log("✅ " + markersAdded + " marcadores adicionados");
            
            if (markersAdded > 0) {
              if (markersAdded === 1) {
                var center = bounds.getCenter();
                map.setView(center, 13);
              } else {
                map.fitBounds(bounds, { 
                  padding: [50, 50],
                  maxZoom: 12
                });
              }
            }
          };
          
          map.whenReady(function() {
            window.ReactNativeWebView.postMessage('MAP_LOADED');
          });
        </script>
      </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log("📨 Mensagem do WebView:", message);

    if (message === 'MAP_LOADED') {
      setMapLoaded(true);
    } else if (message.startsWith('NAVIGATE_TO_INFO_')) {
      const desaparecidoId = message.replace('NAVIGATE_TO_INFO_', '');
      console.log("🎯 Navegando para informações do ID:", desaparecidoId);
      
      const desaparecido = desaparecidos.find(d => d.id.toString() === desaparecidoId);
      if (desaparecido) {
        navigateToInfo(desaparecido);
      } else {
        console.error("❌ Desaparecido não encontrado com ID:", desaparecidoId);
        Alert.alert("Erro", "Não foi possível carregar as informações deste desaparecido");
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="transparent" 
        translucent 
        barStyle="dark-content" 
      />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1B2CC1" />
          <Text style={styles.loadingText}>Carregando desaparecidos...</Text>
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onMessage={handleWebViewMessage}
      />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mapa de Desaparecidos</Text>
          <Text style={styles.subtitle}>
            {desaparecidos.length} desaparecidos encontrados
          </Text>
        </View>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legenda do Mapa</Text>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendMarker, styles.markerIcon]}>
            <Text style={styles.markerText}>!</Text>
          </View>
          <Text style={styles.legendText}>Ponto de desaparecimento</Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendMarker, styles.clusterIcon]}>
            <Text style={styles.clusterText}>3</Text>
          </View>
          <Text style={styles.legendText}>Agrupamento de casos</Text>
        </View>
        
        <View style={styles.legendNote}>
          <Text style={styles.noteText}>
            Toque nos marcadores e clique em "Ver mais informações"
          </Text>
        </View>
      </View>
    </View>
  );
}

// ... (os styles permanecem os mesmos)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#1B2CC1',
    fontWeight: '600',
  },
  header: {
    position: "absolute",
    top: StatusBar.currentHeight + 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B2CC1",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
    marginRight: 12,
  },
  backText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
  },
  titleContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  legend: {
    position: "absolute",
    bottom: 25,
    left: 15,
    right: 15,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 16,
    borderRadius: 12,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 4,
  },
  markerIcon: {
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: 'white',
  },
  clusterIcon: {
    backgroundColor: 'rgba(255, 107, 107, 0.8)',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  clusterText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  legendNote: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  noteText: {
    fontSize: 12,
    color: "#666",
    fontStyle: 'italic',
    textAlign: 'center',
  },
});