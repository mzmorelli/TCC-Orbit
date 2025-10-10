import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function MapaChaveiro({ navigation }) {
  const html = `
    <!DOCTYPE html>
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
</html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#135991" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localização do Chaveiro</Text>
      </View>
      <WebView source={{ html }} style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fbff" },
  header: {
    backgroundColor: "#135991",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 20,
    height: 70,
  },
  backButton: {
    marginRight: 10,
    padding: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});