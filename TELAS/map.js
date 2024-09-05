import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Alert, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomSheet } from '@/components/PopUp';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [asideVisible, setAsideVisible] = useState(false);
  const [pins, setPins] = useState([]);
  const navigation = useNavigation();

  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  const handleFilterSelect = async (filter) => {
    try {
      const response = await axios.get('http://172.16.11.20:3005/pins', {
        params: { type: filter },
      });
      // Converter latitude e longitude para números
      const formattedPins = response.data.map(pin => ({
        ...pin,
        latitude: parseFloat(pin.latitude),
        longitude: parseFloat(pin.longitude),
      }));
      setPins(formattedPins);
    } catch (error) {
      console.error('Erro ao buscar pinos:', error.message);
      Alert.alert('Erro', 'Erro ao buscar pinos. Verifique a conexão e tente novamente.');
    }
  };

  useEffect(() => {
    handleFilterSelect(null); // Carrega todos os pinos inicialmente
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet onFilterSelect={handleFilterSelect} />
      <TouchableOpacity style={styles.menuButton} onPress={toggleAside}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {asideVisible && (
        <LinearGradient
          colors={['#003B6F', '#005AA6', '#007BFF']}
          style={styles.aside}
        >
          <TouchableOpacity style={styles.closeButton} onPress={toggleAside}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={styles.userSection}>
            <Ionicons name="person-circle-outline" size={80} color="#fff" />
            <Text style={styles.loginText}>Fazer Login</Text>
            <Text style={styles.registerText}>Cadastro</Text>
          </View>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PerfilClientes')}>
            <Ionicons name="person-outline" size={24} color="#fff" style={styles.optionIcon} />
            <Text style={styles.optionText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => alert('Histórico de chamadas')}>
            <Ionicons name="call-outline" size={24} color="#fff" style={styles.optionIcon} />
            <Text style={styles.optionText}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => alert('Convide amigos')}>
            <Ionicons name="people-outline" size={24} color="#fff" style={styles.optionIcon} />
            <Text style={styles.optionText}>Convide amigos</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633309,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {pins.map(pin => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            title={pin.name}
            description={pin.type}
          />
        ))}
      </MapView>
    </View>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
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
    width: width * 0.7,
    height: height,
    paddingTop: 60,
    paddingHorizontal: 20,
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
    backgroundColor: 'transparent',
    padding: 10,
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 80,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#005AA6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default App;
