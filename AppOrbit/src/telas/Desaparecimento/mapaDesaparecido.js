import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

export default function MapaDesaparecido({ route }) {
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
      <WebView
        ref={webViewRef}
        source={{ html }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
});
