import React, { useRef, useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function Mapa({ route, navigation }) {
    const { orbitaId, orbitaNome } = route.params;
    const webViewRef = useRef(null);
    const [dadosOrbita, setDadosOrbita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [membrosCount, setMembrosCount] = useState(0);

    useEffect(() => {
        const fetchOrbita = async () => {
            try {
                const response = await axios.get(
                    `http://10.239.23.166/appTcc/listar-orbitas.php?id=${orbitaId}`
                );

                if (response.data.success) {
                    const orbitaLimpa = {
                        ...response.data.orbita,
                        membro: response.data.orbita.membro.map(membro => ({
                            ...membro,
                            foto: membro.foto ? membro.foto.replace(/\r\n/g, '').trim() : '',
                            latitude: parseFloat(membro.latitude) || 0,
                            longitude: parseFloat(membro.longitude) || 0
                        }))
                    };
                    setDadosOrbita(orbitaLimpa);
                    setMembrosCount(orbitaLimpa.membro.length);
                }
            } catch (error) {
                console.error("Erro ao buscar órbita:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrbita();
    }, [orbitaId]);

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

        .marker-container {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #3f92cb;
          box-shadow: 0 4px 15px rgba(19, 89, 145, 0.5);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .marker-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.05); /* Pequeno zoom para preencher melhor */
        }

        .custom-popup {
          text-align: center;
          padding: 15px;
          min-width: 180px;
          background: linear-gradient(135deg, #83bde3 0%, #3f92cb 100%);
          border-radius: 16px;
          color: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .custom-popup img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid white;
          margin: 8px 0;
          object-fit: cover;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }

        .custom-popup b {
          font-size: 16px;
          color: #fff;
          display: block;
          margin-bottom: 6px;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .custom-popup .coords {
          font-size: 12px;
          opacity: 0.95;
          margin-top: 8px;
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 8px;
          border-radius: 8px;
          backdrop-filter: blur(5px);
        }

        .leaflet-popup-content-wrapper {
          background: transparent;
          box-shadow: none;
        }

        .leaflet-popup-tip {
          background: #3f92cb;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        /* Melhorar a visualização do mapa */
        .leaflet-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        // Variável global para armazenar os marcadores
        var marcadores = [];
        var map = L.map('map').setView([-24.4979, -47.8439], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        // Função para limpar marcadores existentes
        function limparMarcadores() {
          marcadores.forEach(marker => map.removeLayer(marker));
          marcadores = [];
        }

        // Função para processar os dados recebidos
        function processarDadosOrbita(dados) {
          console.log('Dados recebidos:', dados);
          
          limparMarcadores();
          
          if (dados && dados.membro && dados.membro.length > 0) {
            var bounds = L.latLngBounds();
            var hasValidMarkers = false;
            var validMarkersCount = 0;
            
            dados.membro.forEach(membro => {
              var lat = parseFloat(membro.latitude);
              var lon = parseFloat(membro.longitude);
              
              console.log('Processando membro:', membro.nome, 'Lat:', lat, 'Lon:', lon);
              
              if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
                hasValidMarkers = true;
                validMarkersCount++;
                
                var customIcon = L.divIcon({
                    className: "custom-marker",
                    html: \`
                      <div class="marker-container">
                        <img src="http://10.239.23.166/appTcc/uploads/\${membro.foto}" 
                             class="marker-img"
                             onerror="this.src='https://ui-avatars.com/api/?name=\${encodeURIComponent(membro.nome)}&background=3f92cb&color=fff&size=70&bold=true&font-size=0.4'"
                             style="width: 100%; height: 100%; object-fit: cover;"/>
                      </div>
                    \`,
                    iconSize: [70, 70], 
                    iconAnchor: [35, 70], // Centro na parte inferior
                    popupAnchor: [0, -65] // Popup acima do marcador
                });

                var marker = L.marker([lat, lon], {icon: customIcon}).addTo(map);
                marcadores.push(marker);
                
                var popupContent = '<div class="custom-popup">';
                popupContent += '<b>' + membro.nome + '</b>';
                
                if (membro.foto && membro.foto !== '') {
                  popupContent += '<img src="http://10.239.23.166/appTcc/uploads/' + 
                                 membro.foto + 
                                 '" onerror="this.style.display=\\'none\\'"/>';
                } else {
                  popupContent += '<img src="https://ui-avatars.com/api/?name=' + 
                                 encodeURIComponent(membro.nome) + 
                                 '&background=3f92cb&color=fff&size=80&bold=true"/>';
                }
                
                popupContent += '<div class="coords">📍 Lat: ' + lat.toFixed(6) + '<br>🌎 Lon: ' + lon.toFixed(6) + '</div>';
                popupContent += '</div>';
                
                marker.bindPopup(popupContent, {
                  maxWidth: 250,
                  className: 'custom-popup-wrapper'
                });
                
                bounds.extend([lat, lon]);
                
                // Abrir popup automaticamente se for o primeiro marcador
                if (validMarkersCount === 1) {
                  setTimeout(() => {
                    marker.openPopup();
                  }, 500);
                }
              }
            });
            
            // Se temos marcadores válidos, ajustar a visualização
            if (bounds.isValid() && hasValidMarkers) {
              setTimeout(function() {
                map.fitBounds(bounds, { 
                  padding: [60, 60], 
                  maxZoom: 16,
                  animate: true
                });
              }, 400);
            }
          } else {
            console.log('Nenhum membro com coordenadas válidas encontrado');
            // Centralizar em uma posição padrão se não houver marcadores
            map.setView([-24.4979, -47.8439], 13);
          }
        }

        // Ouvir mensagens do React Native
        window.addEventListener("message", function(event) {
          try {
            console.log('Mensagem recebida via injectJavaScript');
            var data = JSON.parse(event.data);
            processarDadosOrbita(data);
          } catch (e) {
            console.error("Erro ao processar dados:", e);
          }
        });

        // Adicionar controles de zoom
        L.control.zoom({
          position: 'topright'
        }).addTo(map);
      </script>
    </body>
    </html>
  `;

    // Função para injectar dados no WebView
    const injectData = () => {
        if (webViewRef.current && dadosOrbita) {
            const script = `
        try {
          var data = ${JSON.stringify(dadosOrbita)};
          window.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(data) }));
          console.log('Dados injetados com sucesso');
        } catch (e) {
          console.error('Erro ao injetar dados:', e);
        }
        true;
      `;

            webViewRef.current.injectJavaScript(script);
        }
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://10.239.23.166/appTcc/listar-orbitas.php?id=${orbitaId}`
            );

            if (response.data.success) {
                const orbitaLimpa = {
                    ...response.data.orbita,
                    membro: response.data.orbita.membro.map(membro => ({
                        ...membro,
                        foto: membro.foto ? membro.foto.replace(/\r\n/g, '').trim() : '',
                        latitude: parseFloat(membro.latitude) || 0,
                        longitude: parseFloat(membro.longitude) || 0
                    }))
                };
                setDadosOrbita(orbitaLimpa);
                setMembrosCount(orbitaLimpa.membro.length);
                
                // Recarregar os marcadores
                injectData();
            }
        } catch (error) {
            console.error("Erro ao atualizar órbita:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !dadosOrbita) {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#135991" barStyle="light-content" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3f92cb" />
                    <Text style={styles.loadingText}>Carregando mapa...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#135991" barStyle="light-content" />
            
            {/* Cabeçalho compacto */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {orbitaNome || "Mapa da Órbita"}
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        {membrosCount} {membrosCount === 1 ? "membro" : "membros"} localizados
                    </Text>
                </View>
                
                <TouchableOpacity 
                    style={styles.refreshButton}
                    onPress={handleRefresh}
                >
                    <Ionicons name="refresh" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            
            <WebView
                ref={webViewRef}
                source={{ html }}
                style={styles.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoadEnd={() => {
                    setTimeout(() => {
                        injectData();
                    }, 1000);
                }}
                onMessage={(event) => {
                    console.log("Mensagem do WebView:", event.nativeEvent.data);
                }}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                }}
            />
            
            {/* Overlay de carregamento durante atualização */}
            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#3f92cb" />
                    <Text style={styles.overlayText}>Atualizando localizações...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fbff'
    },
    header: {
        backgroundColor: '#135991',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        paddingTop: 20,
        height: 70,
        borderBottomEndRadius: 7,
        borderBottomStartRadius: 7
    },
    backButton: {
        padding: 4,
        marginRight: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 18,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitleContainer: {
        flex: 1,
        marginLeft: 8,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        marginTop: 1,
    },
    refreshButton: {
        padding: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 18,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fbff'
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#3f92cb',
        fontWeight: '500'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(248, 251, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    overlayText: {
        marginTop: 12,
        fontSize: 14,
        color: '#3f92cb',
        fontWeight: '500'
    }
});