import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function MapaDesaparecido({ route, navigation }) {
  const endereco = route?.params?.endereco || "";
  const webViewRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (endereco && webViewRef.current && mapLoaded) {
      const jsCode = `
        fetch("https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}")
          .then(res => res.json())
          .then(results => {
            if(results && results.length > 0){
              var place = results[0];
              var lat = parseFloat(place.lat);
              var lon = parseFloat(place.lon);

              // Limpar marcadores existentes
              map.eachLayer(function(layer) {
                if (layer instanceof L.Marker || layer instanceof L.Circle) {
                  map.removeLayer(layer);
                }
              });

              // Criar ícone personalizado para desaparecimento
              var markerIcon = L.divIcon({
                html: '<div style="background-color: #FF6B6B; width: 32px; height: 32px; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 10px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; font-family: Arial, sans-serif;">!</div>',
                className: 'custom-disappearance-marker',
                iconSize: [32, 32],
                iconAnchor: [16, 16]
              });

              // Marker com popup informativo
              var marker = L.marker([lat, lon], { icon: markerIcon })
                .addTo(map)
                .bindPopup('<div style="padding: 12px; text-align: center; min-width: 200px;"><strong style="color: #FF6B6B; font-size: 16px;">Última Localização</strong><br><span style="color: #666; margin-top: 8px; display: block;">${endereco.replace(/'/g, "\\'")}</span></div>');

              // Círculo de incerteza com estilo melhorado
              L.circle([lat, lon], {
                color: '#FF6B6B',
                fillColor: '#FF6B6B',
                fillOpacity: 0.1,
                weight: 2,
                dashArray: '8, 8',
                radius: 150
              }).addTo(map);

              // Centraliza o mapa com zoom adequado
              map.setView([lat, lon], 15);

              // Abrir popup automaticamente
              setTimeout(() => {
                marker.openPopup();
              }, 1500);
            }
          })
          .catch(error => {
            console.error('Erro ao buscar localização:', error);
          });
        true;
      `;
      webViewRef.current.injectJavaScript(jsCode);
    }
  }, [endereco, mapLoaded]);

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
          }
          #map { 
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
          }
          .custom-tooltip {
            background: rgba(255, 107, 107, 0.95);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            padding: 8px 12px;
            font-size: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          }
          .leaflet-tooltip-top:before {
            border-top-color: rgba(255, 107, 107, 0.95);
          }
          .custom-disappearance-marker {
            background: transparent !important;
            border: none !important;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
          .leaflet-popup-tip {
            box-shadow: none;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
          var map = L.map('map', {
            zoomControl: true,
            zoomControlPos: 'bottomright',
            dragging: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true
          }).setView([-23.55052, -46.633308], 13);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          // Sinalizar que o mapa carregou
          map.whenReady(function() {
            window.ReactNativeWebView.postMessage('MAP_LOADED');
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="transparent" 
        translucent 
        barStyle="dark-content" 
      />
      
      <WebView
        ref={webViewRef}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onMessage={(event) => {
          if (event.nativeEvent.data === 'MAP_LOADED') {
            setMapLoaded(true);
          }
        }}
        onLoadEnd={() => setMapLoaded(true)}
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
          <Text style={styles.title}>Localização</Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {endereco || "Última localização conhecida"}
          </Text>
        </View>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legenda</Text>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendMarker, styles.markerIcon]}>
            <Text style={styles.markerText}>!</Text>
          </View>
          <Text style={styles.legendText}>Ponto de desaparecimento</Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendMarker, styles.circleArea]} />
          <Text style={styles.legendText}>Área de busca aproximada</Text>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight || 0;

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
  header: {
    position: "absolute",
    top: statusBarHeight + 10,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerIcon: {
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: 'white',
  },
  circleArea: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderStyle: 'dashed',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
});