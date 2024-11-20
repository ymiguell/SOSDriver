import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>⬅</Text>
        </TouchableOpacity>
        <View style={styles.profileSection}>
          <View style={styles.profilePicture}>
            <Text style={styles.profileInitial}>👤</Text>
          </View>
          <Text style={styles.profileName}>Robervaldo</Text>
          <Text style={styles.address}>Jardim Primavera, Mogi Mirim - SP, 02377-000</Text>
        </View>
      </View>

      {/* Oficina Info */}
      <View style={styles.shopSection}>
        <Text style={styles.shopName}>Oficina Mecânica do Valdo</Text>
        <View style={styles.stars}>
          {Array(5).fill(null).map((_, index) => (
            <Text key={index} style={styles.star}>⭐</Text>
          ))}
        </View>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -23.53288,
            longitude: -46.57421,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: -23.53288, longitude: -46.57421 }}
            title="Oficina Mecânica do Valdo"
          />
        </MapView>
      </View>

      {/* Últimos Atendimentos */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Últimos atendimentos:</Text>
        {[
          { service: 'Pane elétrica', location: 'Rua Fernando Belmonte' },
          { service: 'Caixa de câmbio', location: 'Avenida da Saudade' },
          { service: 'Vazamento de óleo', location: 'Travessa Águas Frias' },
        ].map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.service}>{item.service}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <View style={styles.stars}>
              {Array(5).fill(null).map((_, i) => (
                <Text key={i} style={styles.star}>⭐</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A74DA' },
  header: { padding: 20, alignItems: 'center', backgroundColor: '#0A74DA' },
  backButton: { position: 'absolute', top: 20, left: 20 },
  backText: { color: '#FFF', fontSize: 20 },
  profileSection: { alignItems: 'center' },
  profilePicture: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center',
  },
  profileInitial: { fontSize: 40, color: '#0A74DA' },
  profileName: { marginTop: 10, fontSize: 20, color: '#FFF', fontWeight: 'bold' },
  address: { fontSize: 14, color: '#FFF', textAlign: 'center' },
  shopSection: { padding: 20, alignItems: 'center', backgroundColor: '#FFF', borderRadius: 10, margin: 20 },
  shopName: { fontSize: 18, fontWeight: 'bold', color: '#0A74DA' },
  stars: { flexDirection: 'row', marginTop: 10 },
  star: { fontSize: 18, color: '#FFD700', marginHorizontal: 2 },
  mapContainer: { margin: 20, borderRadius: 10, overflow: 'hidden' },
  map: { width: '100%', height: 200 },
  historySection: { padding: 20 },
  historyTitle: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
  historyItem: { marginTop: 20, padding: 15, backgroundColor: '#FFF', borderRadius: 10 },
  service: { fontSize: 16, fontWeight: 'bold', color: '#0A74DA' },
  location: { fontSize: 14, color: '#555' },
});

export default App;
