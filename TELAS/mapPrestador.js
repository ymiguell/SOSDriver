import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const App = () => {
  const [asideVisible, setAsideVisible] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);
  const [pins, setPins] = useState([]);
  const [filterType, setFilterType] = useState('cliente');  // Estado para armazenar o filtro
  const router = useRouter();

  // Função para alternar o menu lateral
  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  // Função para quando um marcador for pressionado
  const handleMarkerPress = (user) => {
    setRequestDetails(user);
  };

  // Função para aceitar a solicitação de serviço
  const acceptService = async () => {
    console.log(`Tentando aceitar o serviço com ID: ${requestDetails.id}`);
    
    try {
      const response = await axios.put(`http://172.16.11.18:3003/solicitacao/${requestDetails.id}`, {
        status: 'aceito',
      });
  
      if (response.status === 200) {
        Alert.alert('Serviço Aceito', `Você aceitou o serviço de ${requestDetails.nome}.`);
      } else {
        Alert.alert('Erro', 'Erro ao aceitar a solicitação. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao aceitar a solicitação:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', error.response ? error.response.data.message : 'Erro ao aceitar a solicitação. Tente novamente.');
    }
  
    setRequestDetails(null); // Oculta a solicitação após aceitação
  };
  
  const rejectService = async () => {
    try {
      const response = await axios.put(`http://172.16.11.18:3003/solicitacao/${requestDetails.id}`, {
        status: 'recusado', // Atualizando o status para 'recusado'
      });
  
      if (response.status === 200) {
        Alert.alert('Serviço Recusado', `Você recusou o serviço de ${requestDetails.nome}.`);
      } else {
        Alert.alert('Erro', 'Erro ao recusar a solicitação. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao recusar a solicitação:', error);
      Alert.alert('Erro', 'Erro ao recusar a solicitação. Tente novamente.');
    }
  
    setRequestDetails(null); // Oculta a solicitação após rejeição
  };

  // Função para buscar usuários filtrados
  const fetchUsers = async (filter) => {
    try {
      const response = await axios.get('http://172.16.11.18:3003/usuario/cliente', {
        params: { tipo: filter }, // Passando o tipo de filtro
      });
      const data = response.data;
      const formattedPins = data.map(pin => ({
        ...pin,
        latitude: parseFloat(pin.latitude),
        longitude: parseFloat(pin.longitude),
      }));
      setPins(formattedPins); // Atualiza o estado com os pinos filtrados
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', error.response ? error.response.data.message : 'Erro ao buscar usuários. Tente novamente.');
    }
  };

  // Efeito para buscar usuários assim que o componente for montado ou o filtro mudar
  useEffect(() => {
    fetchUsers(filterType);
  }, [filterType]);  // Quando o filtro mudar, refaz a requisição

  // Função para alterar o tipo de filtro
  const handleFilterSelect = (filter) => {
    setFilterType(filter); // Atualiza o tipo de filtro
  };

  return (
    <View style={styles.container}>
      {/* Menu Lateral */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleAside}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Menu Lateral Visível */}
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

          {/* Opções de filtro */}
          <View style={styles.filterSection}>
            <Text style={styles.filterText}>Filtro</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleFilterSelect('cliente')}
            >
              <Text style={styles.optionText}>Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleFilterSelect('prestador')}
            >
              <Text style={styles.optionText}>Prestadores</Text>
            </TouchableOpacity>
          </View>

          {/* Outras opções no menu lateral */}
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

      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.4333,
          longitude: -46.9575,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Exibindo os marcadores dos usuários do tipo filtrado */}
        {pins.map(pin => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            onPress={() => handleMarkerPress(pin)}
          >
            <Ionicons name="person" size={30} color="blue" />
          </Marker>
        ))}
      </MapView>

      {/* Exibindo os detalhes da solicitação se houver */}
      {requestDetails && (
        <View style={styles.requestContainer}>
          <LinearGradient colors={['#003B6F', '#005AA6', '#007BFF']} style={styles.requestContent}>
            <Text style={styles.requestTitle}>Solicitação de Serviço</Text>
            <Text style={styles.requestLabel}>Nome: <Text style={styles.requestValue}>{requestDetails.nome}</Text></Text>
            <Text style={styles.requestLabel}>Endereço: <Text style={styles.requestValue}>{requestDetails.endereco}</Text></Text>
            <Text style={styles.requestLabel}>Telefone: <Text style={styles.requestValue}>{requestDetails.telefone}</Text></Text>

            <View style={styles.buttonContainer}>
              {/* Botões para aceitar ou recusar o serviço */}
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
  filterSection: {
    marginTop: 20,
  },
  filterText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
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
