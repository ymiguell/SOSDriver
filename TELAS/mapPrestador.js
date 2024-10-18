import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [asideVisible, setAsideVisible] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  const handleMarkerPress = (user) => {
    // Configura os detalhes da solicitação ao pressionar o marcador
    setRequestDetails(user);
  };

  const acceptService = () => {
    Alert.alert('Serviço Aceito', `Você aceitou o serviço de ${requestDetails.nome}.`);
    setRequestDetails(null); // Oculta a solicitação após aceitação
  };

  const rejectService = () => {
    Alert.alert('Serviço Recusado', `Você recusou o serviço de ${requestDetails.nome}.`);
    setRequestDetails(null); // Oculta a solicitação após rejeição
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://172.16.11.18:3005/usuario'); // Substitua pela URL do seu endpoint
      const data = await response.json();
      setUsers(data.filter(user => user.tipo === 'cliente')); // Filtra os usuários do tipo 'cliente'
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Chama a função para buscar usuários ao montar o componente
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleAside}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {asideVisible && (
        <LinearGradient colors={['#003B6F', '#005AA6', '#007BFF']} style={styles.aside}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleAside}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={styles.userSection}>
            <Ionicons name="person-circle-outline" size={80} color="#fff" />
            <Text style={styles.loginText}>Fazer Login</Text>
            <Text style={styles.registerText}>Cadastro</Text>
          </View>

          <TouchableOpacity style={styles.option} onPress={() => router.push('/perfilUSer')}>
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
          latitude: -22.4333,
          longitude: -46.9575,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {users.map(user => (
          <Marker 
            key={user.id}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            onPress={() => handleMarkerPress(user)}
          >
            <Ionicons name="person" size={30} color="blue" />
          </Marker>
        ))}
      </MapView>

      {requestDetails && (
        <View style={styles.requestContainer}>
          <LinearGradient colors={['#003B6F', '#005AA6', '#007BFF']} style={styles.requestContent}>
            <Text style={styles.requestTitle}>Solicitação de Serviço</Text>
            <Text style={styles.requestLabel}>Nome: <Text style={styles.requestValue}>{requestDetails.nome}</Text></Text>
            <Text style={styles.requestLabel}>Endereço: <Text style={styles.requestValue}>{requestDetails.endereco}</Text></Text>
            <Text style={styles.requestLabel}>Telefone: <Text style={styles.requestValue}>{requestDetails.telefone}</Text></Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={acceptService}>
                <Text style={styles.buttonText}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={rejectService}>
                <Text style={styles.buttonText}>Recusar</Text>
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
  requestContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    zIndex: 5,
  },
  requestContent: {
    padding: 10,
    borderRadius: 10,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  requestLabel: {
    color: 'white',
    marginVertical: 2,
  },
  requestValue: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#005AA6',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
