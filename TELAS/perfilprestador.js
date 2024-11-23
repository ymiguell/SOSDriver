import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilUser() {
  const [user, setUser] = useState({ nome: '', email: '', telefone: '', latitude: '', longitude: '', endereco: '', });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching profile...');
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('authToken');
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        console.log('Token:', token, 'Username:', username);
  
        if (!token) {
          Alert.alert('Erro', 'Você não está logado.');
          return;
        }
  
        const response = await fetch('http://192.168.56.1:3002/api/perfil', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, senha: password }),
        });
  
        if (!response.ok) {
          throw new Error('Falha ao carregar perfil');
        }
  
        const data = await response.json();
        setUser(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o perfil.');
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);

  return (
    <LinearGradient
      colors={['#01355C', '#014B82', '#0262A9', '#0264AC', '#0270C2', '#013860']}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.containerInfo}>
            {/* Header */}
            <View style={styles.profileSection}>
              <View style={styles.profilePicture}>
                <Text style={styles.profileInitial}>👤</Text>
              </View>
              <Text style={styles.profileName}>{user.nome}</Text>
              <Text style={styles.profileTelefone}>Número de Contato: {user.telefone}</Text>
              <Text style={styles.address}> {user.endereco}</Text>
            </View>

            {/* Informações do Usuário */}
            <View style={styles.shopSection}>
              <Text style={styles.shopName}>{user.nome}</Text>
              <View style={styles.stars}>
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <Text key={index} style={styles.star}>⭐</Text>
                  ))}
              </View>
            </View>

            <View style={styles.mapContainer}>
  <MapView
    style={styles.map}
    initialRegion={{
      latitude: user.latitude || -22.4333, // Usando valores default se não houver latitude
      longitude: user.longitude || -46.9575,
      latitudeDelta: 0.05, // Ajuste a quantidade de zoom desejada
      longitudeDelta: 0.05, // Ajuste a quantidade de zoom desejada
    }}
  >
    {user.latitude && user.longitude && (
      <Marker
        coordinate={{ latitude: user.latitude, longitude: user.longitude }}
        title="Localização"
        description={user.endereco}
      />
    )}
  </MapView>
</View>

            {/* Últimos Atendimentos */}
            <View style={styles.historySection}>
              <Text style={styles.historyTitle}>Últimos atendimentos:</Text>
              {[ 
                { service: 'Pane elétrica', location: 'Rua Fernando Belmonte' },
                { service: 'Caixa de câmbio', location: 'Avenida da Saudade' },
                { service: 'Vazamento de óleo', location: 'Travessa Águas Frias' }
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
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    width: 400,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 40,
    color: '#0A74DA',
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  profileTelefone:{
    color: '#FFF',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  shopSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0262A9',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 10,
  },
  star: {
    fontSize: 18,
    color: '#FFD700',
    marginHorizontal: 2,
  },
  mapContainer: {
    
       borderRadius: 10,
        overflow: 'hidden',
         marginBottom: 20
         
  },
  map: {
    width: '100%',
    height: 200,
  },
  historySection: {
    padding: 20,
  },
  historyTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  service: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0262A9',
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
});
