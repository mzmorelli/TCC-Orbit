import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

export default function MapaTodosDesaparecidos() {
  const webViewRef = useRef(null);
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://10.239.20.67/appTcc/listar-coordenadas.php")
      .then(res => res.json())
      .then(json => {
        if(json.success){

          const validos = json.dados.filter(d => 
            parseFloat(d.latitude) !== 0 && parseFloat(d.longitude) !== 0
          );
          setDesaparecidos(validos);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.Default.css" />
        <style>
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script src="https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js"></script>
        <script>
          var map = L.map('map').setView([-14.235, -51.9253], 4);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          var markers = L.markerClusterGroup();

          function addMarker(d){
            var lat = parseFloat(d.latitude);
            var lon = parseFloat(d.longitude);
            if(isNaN(lat) || isNaN(lon) || lat === 0 || lon === 0) return;

            var marker = L.marker([lat, lon]);
            var popup = '<b>' + d.nome + '</b><br>' + (d.localVisto || '');
            marker.bindPopup(popup);
            markers.addLayer(marker);
          }

          window.addEventListener('message', function(event){
            var data = JSON.parse(event.data);
            data.forEach(addMarker);
            map.addLayer(markers);
            if(markers.getLayers().length > 0){
              map.fitBounds(markers.getBounds(), {padding:[40,40], maxZoom:14});
            }
          });
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    if(webViewRef.current && desaparecidos.length){
      webViewRef.current.postMessage(JSON.stringify(desaparecidos));
    }
  }, [desaparecidos]);

  if(loading){
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0B3D91"/>
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
      <WebView
        ref={webViewRef}
        source={{html}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { flex:1, justifyContent:'center', alignItems:'center' }
});
