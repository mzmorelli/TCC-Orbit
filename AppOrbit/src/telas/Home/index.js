import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function MapaScreen({ route }) {
  const endereco = route?.params?.endereco || null;
  const [expandido, setExpandido] = useState(false);
  const [query, setQuery] = useState("");
  const webViewRef = useRef(null);

  useEffect(() => {
  if (endereco && webViewRef.current) {
    const jsCode = `
      fetch("https://nominatim.openstreetmap.org/search?format=json&q=${endereco}")
        .then(res => res.json())
        .then(results => {
          if(results && results.length > 0){
            var place = results[0];
            map.setView([place.lat, place.lon], 15);
            L.marker([place.lat, place.lon]).addTo(map)
              .bindPopup(place.display_name).openPopup();
          }
        });
      true;
    `;
    webViewRef.current.injectJavaScript(jsCode);
  }
}, [endereco]);


  // HTML com Leaflet + Nominatim search
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
    <style>
      #map { height: 100vh; width: 100vw; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
      // Cria mapa centralizado em SP
      var map = L.map('map').setView([-23.55052, -46.633308], 13);

      // Tile layer OSM
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Função de busca usando Nominatim
      function searchPlace(query) {
        if (!query) return;
        fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${query}\`)
          .then(res => res.json())
          .then(results => {
            if (results && results.length > 0) {
              var place = results[0];
              var lat = parseFloat(place.lat);
              var lon = parseFloat(place.lon);

              // Move o mapa
              map.setView([lat, lon], 15);

              // Marca no local
              L.marker([lat, lon]).addTo(map).bindPopup(place.display_name).openPopup();
            } else {
              alert("Local não encontrado");
            }
          });
      }

      // Ouve mensagens do React Native
      document.addEventListener("message", function(event) {
        var query = event.data;
        searchPlace(query);
      });
    </script>
  </body>
  </html>
  `;

  // Enviar busca para dentro do WebView
  const handleSearch = () => {
    if (webViewRef.current && query.trim() !== "") {
      webViewRef.current.postMessage(query);
    }
  };

  return (
    <LinearGradient
      colors={["#1B2CC1", "#0D155B"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mapa</Text>
        <TouchableOpacity
          style={styles.locationIcon}
          onPress={() => setExpandido(!expandido)}
        >
          <MaterialIcons name="map" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Barra de busca real */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar local..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="arrow-forward" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Container do mapa */}
      <View
        style={[
          styles.mapContainer,
          expandido ? styles.mapExpanded : styles.mapDefault,
        ]}
      >
        <WebView
          ref={webViewRef}
          source={{ html }}
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </LinearGradient>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  locationIcon: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  mapContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
  },
  mapDefault: {
    height: height * 0.7,
    width: width * 0.9,
  },
  mapExpanded: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 5,
    borderRadius: 0,
    width: width,
  },
});
