import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import axios from 'axios';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient'; // Importar LinearGradient
import { Ionicons } from '@expo/vector-icons'; // Importar ícones

// Definindo o tipo para coordenadas
interface Coordinate {
  latitude: number;
  longitude: number;
}

const MAP_API_KEY = 'YOUR_ARCGIS_API_KEY'; // Substitua pelo seu API Key
const ROUTE_API_URL = 'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve';

const App: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const [origin, setOrigin] = useState<Coordinate>({ latitude: 37.7749, longitude: -122.4194 }); // Exemplo: São Francisco
  const [destination, setDestination] = useState<Coordinate>({ latitude: 34.0522, longitude: -118.2437 }); // Exemplo: Los Angeles
  const [asideVisible, setAsideVisible] = useState<boolean>(false);

  useEffect(() => {
    // Abrir o Bottom Sheet automaticamente ao iniciar
    bottomSheetRef.current?.expand();
  }, []);

  const calculateRoute = async () => {
    try {
      const response = await axios.get(ROUTE_API_URL, {
        params: {
          f: 'json',
          token: MAP_API_KEY,
          stops: `${origin.latitude},${origin.longitude};${destination.latitude},${destination.longitude}`,
          returnRoutes: true,
          returnDirections: true
        }
      });

      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        const routeGeometry = route.geometry;

        const coordinates: Coordinate[] = routeGeometry.paths[0].map(([longitude, latitude]: [number, number]) => ({
          latitude,
          longitude
        }));

        setRouteCoordinates(coordinates);
      } else {
        Alert.alert('Erro', 'Nenhuma rota encontrada.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível calcular a rota.');
      console.error(error);
    }
  };

  const centerRegion: Region = {
    latitude: (origin.latitude + destination.latitude) / 2,
    longitude: (origin.longitude + destination.longitude) / 2,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleAside}>
          <Ionicons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        {asideVisible && (
          <View style={styles.aside}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleAside}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <LinearGradient
              colors={['#003B6F', '#005AA6', '#007BFF', '#005AA6', '#003B6F']}
              style={styles.gradientBackground}
            >
              <View style={styles.asideContent}>
                <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Escolha', 'Perfil')}>
                  <Text style={styles.optionText}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Escolha', 'Histórico')}>
                  <Text style={styles.optionText}>Histórico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Escolha', 'Configurações')}>
                  <Text style={styles.optionText}>Configurações</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
        <MapView
          style={styles.map}
          initialRegion={centerRegion}
        >
          <Marker coordinate={origin} title="Início" />
          <Marker coordinate={destination} title="Destino" />
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#FF6347" // Tomate
              strokeWidth={4}
            />
          )}
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          index={1} // Começa expandido
          snapPoints={['30%', '50%']}
          style={styles.bottomSheet}
        >
          <LinearGradient
            colors={['#003B6F', '#005AA6', '#007BFF', '#005AA6', '#003B6F']}
            style={styles.gradientBackground}
          >
            <View style={styles.bottomSheetContent}>
              <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Escolha', 'Mecânico')}>
                <Text style={styles.optionText}>Mecânico</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Escolha', 'Eletricista')}>
                <Text style={styles.optionText}>Eletricista</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Escolha', 'Borracheiro')}>
                <Text style={styles.optionText}>Borracheiro</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 2,
    backgroundColor: '#005AA6',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  aside: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: height,
    zIndex: 3,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 4,
    backgroundColor: '#005AA6',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  gradientBackground: {
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 16,
  },
  asideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    backgroundColor: '#005AA6',
    padding: 15,
    width: '80%',
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#003B6F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default App;
