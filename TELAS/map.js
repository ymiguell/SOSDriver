import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Alert, Text, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomSheet } from '@/components/PopUp';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const App = () => {
  const [asideVisible, setAsideVisible] = useState(false);
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [nomeUser, setNomeUser] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const username = await AsyncStorage.getItem('nomeusuario');
        setNomeUser(username);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o perfil.');
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  const handleFilterSelect = async (filter) => {
    try {
      const response = await axios.get('http://192.168.56.1:3005/usuario', {
        params: { type: filter },
      });
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
    handleFilterSelect(null);
  }, []);

  const handleCall = (telefone) => {
    Linking.openURL(`tel:${telefone}`);
  };

  const handleMessage = (telefone) => {
    Linking.openURL(`sms:${telefone}`);
  };

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
            {loading ? (
              <Text style={styles.loginText}>Carregando...</Text>
            ) : (
              <Text style={styles.loginText}>{nomeUser || "Usuário Desconhecido"}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PerfilCliente')}>
            <Ionicons name="person-outline" size={24} color="#fff" style={styles.optionIcon} />
            <Text style={styles.optionText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Ocorrencia')}>
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
          latitude: -22.4333,
          longitude: -46.9575,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {pins.map(pin => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            title={pin.nome}
            onPress={() => setSelectedPin(pin)} // Armazenar o pin selecionado
          />
        ))}
      </MapView>

      {selectedPin && (
        <View style={styles.calloutContainer}>
          <LinearGradient
            colors={['#003B6F', '#005AA6', '#007BFF']}
            style={styles.calloutContent}
          >
            <Text style={styles.calloutTitle}>{selectedPin.nome}</Text>
            <Text style={styles.calloutAddress}>Telefone: {selectedPin.telefone}</Text>
            <Text style={styles.calloutAddress}>Endereço: {selectedPin.endereco}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleCall(selectedPin.telefone)}
              >
                <Ionicons name="call" size={20} color="#fff" />
                <Text style={styles.buttonText}>Ligar</Text>
              </TouchableOpacity>

              {/* Botão de Fechar com estilo vermelho */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedPin(null)} // Para fechar o callout
              >
                <Text style={styles.closeText}>Fechar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleMessage(selectedPin.telefone)}
              >
                <Ionicons name="chatbubble" size={20} color="#fff" />
                <Text style={styles.buttonText}>SMS</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}
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
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  calloutContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 5,
  },
  calloutContent: {
    padding: 10,
    borderRadius: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  calloutAddress: {
    color: 'white',
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#005AA6',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    width: 90,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  closeButton: {
    backgroundColor: 'red', // Cor vermelha para o botão fechar
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // Ajusta a margem para os botões
    width: 90,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;