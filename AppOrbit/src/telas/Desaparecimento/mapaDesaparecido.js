import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function MapaDesaparecido({ route, navigation }) {
  const endereco = route?.params?.endereco || "";
  const webViewRef = useRef(null);

  useEffect(() => {
    if (endereco && webViewRef.current) {
      const jsCode = `
        fetch("https://nominatim.openstreetmap.org/search?format=json&q=${endereco}")
          .then(res => res.json())
          .then(results => {
            if(results && results.length > 0){
              var place = results[0];
              var lat = parseFloat(place.lat);
              var lon = parseFloat(place.lon);

              // Ponto central (marker)
              var markerIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              });
              L.marker([lat, lon], { icon: markerIcon }).addTo(map);

              // Círculo de incerteza
              L.circle([lat, lon], {
                color: 'red',
                fillColor: 'red',
                fillOpacity: 0.2,
                radius: 100
              }).addTo(map);

              // Centraliza o mapa
              map.setView([lat, lon], 16);
            }
          });
        true;
      `;
      webViewRef.current.injectJavaScript(jsCode);
    }
  }, [endereco]);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <style>#map { height: 100vh; width: 100vw; }</style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([-23.55052, -46.633308], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* WebView ocupa toda a tela */}
      <WebView
        ref={webViewRef}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 15,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B2CC1", // azul combinando com o app
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 8,
  },
  backText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
  },
});
