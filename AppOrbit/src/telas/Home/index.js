import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import 'react-native-get-random-values';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../config/index.json';

const CustomMarker = ({ name, color }) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <View style={styles.markerWrapper}>
      <View style={[styles.markerBubble, { backgroundColor: color }]}>
        <Text style={styles.markerText}>{initial}</Text>
      </View>
      <View style={styles.markerTail} />
    </View>
  );
};

export default function MapaScreen({ navigation }) {
  const mapRef = useRef(null);
  const [expandido, setExpandido] = useState(false);

  const initialRegion = {
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markers = [
    {
      id: 1,
      name: "João",
      coordinate: { latitude: -23.5505, longitude: -46.6333 },
      color: '#4B0082',
    },
    {
      id: 2,
      name: "Nina",
      coordinate: { latitude: -23.5530, longitude: -46.6340 },
      color: '#FFD700',
    },
    {
      id: 3,
      name: "Carlos",
      coordinate: { latitude: -23.5520, longitude: -46.6315 },
      color: '#1C1C8C',
    },
    {
      id: 4,
      name: "Sara",
      coordinate: { latitude: -23.5510, longitude: -46.6300 },
      color: '#D23B2F',
    },
  ];

  return (
    <LinearGradient
      colors={['#1B2CC1', '#0D155B']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Mapa</Text>
        <TouchableOpacity
          style={styles.locationIcon}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => setExpandido(!expandido)}
        >
          <MaterialIcons name="map" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Barra de busca com lupa */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Buscar local..."
          onPress={(data, details = null) => {
            if (details) {
              const location = details.geometry.location;
              mapRef.current?.animateToRegion({
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
            }
          }}
          fetchDetails={true}
          query={{
            key: config.googleApi,
            language: 'pt-BR',
          }}
          styles={{
            container: { flex: 1 },
            textInput: {
              height: 44,
              backgroundColor: '#FFF',
              borderRadius: 10,
              paddingHorizontal: 10,
              fontSize: 16,
            },
          }}
        />
        <Ionicons name="search" size={24} color="#FFFFFF" style={styles.searchIcon} />
      </View>


      <View
        style={[
          styles.mapContainer,
          expandido ? styles.mapExpanded : styles.mapDefault,
        ]}
      >
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          {markers.map((marker) => (
            <Marker key={marker.id} coordinate={marker.coordinate}>
              <CustomMarker name={marker.name} color={marker.color} />
            </Marker>
          ))}
        </MapView>
      </View>
    </LinearGradient>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  locationIcon: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  searchIcon: {
    marginLeft: 10,
  },
  mapContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
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
  markerWrapper: {
    alignItems: 'center',
  },
  markerBubble: {
    width: 33,
    height: 33,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFF',
    borderWidth: 3,
  },
  markerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  markerTail: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: '#4B0082',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    marginTop: -2,
  },
});
