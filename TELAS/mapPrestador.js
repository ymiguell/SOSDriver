import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [asideVisible, setAsideVisible] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);
  const [pins, setPins] = useState([]);
  const [filterType, setFilterType] = useState('cliente');
  const [nomeUser, setNomeUser] = useState(''); // Estado para armazenar o nome do usuário
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const navigation = useNavigation();

  // Função para alternar o menu lateral
  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  // Função para quando um marcador for pressionado
  const handleMarkerPress = (user) => {
    setRequestDetails(user);
  };

  // Função para atualizar o status da solicitação
  const atualizarStatus = async (status) => {
    if (!requestDetails) return; // Verificar se a solicitação existe

    try {
      const response = await axios.put(`http://172.16.11.18:3003/solicitacao/${requestDetails.id}`, {
        status: status, // Atualizando o status para 'aceito' ou 'recusado'
      });

      if (response.status === 200) {
        const statusMessage = status === 'aceito' ? 'aceitou' : 'recusou';
        Alert.alert('Solicitação Atualizada', `Você ${statusMessage} o serviço de ${requestDetails.nome}.`);
      } else {
        Alert.alert('Erro', `Erro ao atualizar a solicitação para ${status}. Tente novamente.`);
      }
    } catch (error) {
      console.error('Erro ao atualizar a solicitação:', error);
      Alert.alert('Erro', 'Erro ao atualizar a solicitação. Tente novamente.');
    }

    setRequestDetails(null); // Oculta a solicitação após aceitar ou recusar
  };

  // Função para aceitar a solicitação de serviço
  const acceptService = () => {
    atualizarStatus('aceito'); // Chama a função de atualização com status 'aceito'
  };

  // Função para recusar a solicitação de serviço
  const rejectService = () => {
    atualizarStatus('recusado'); // Chama a função de atualização com status 'recusado'
  };

  // Função para fechar a solicitação
  const closeRequest = () => {
    setRequestDetails(null); // Fecha a solicitação ao setar como null
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
  }, [filterType]);

  // Função para alterar o tipo de filtro
  const handleFilterSelect = (filter) => {
    setFilterType(filter); // Atualiza o tipo de filtro
  };

  // Efeito para buscar o nome do usuário do AsyncStorage
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const username = await AsyncStorage.getItem('nomeusuario');
        if (username) {
          setNomeUser(username); // Atualiza o nome do usuário
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o perfil.');
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchProfile(); // Chama a função para buscar o nome do usuário
  }, []);

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
            {loading ? (
              <Text style={styles.loginText}>Carregando...</Text>
            ) : (
              <Text style={styles.loginText}>{nomeUser ? `Olá, ${nomeUser}` : 'Nome não encontrado'}</Text>
            )}
          </View>

          {/* Outras opções no menu lateral */}
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('perfilprestador')}>
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
              {/* Botões para aceitar, recusar ou fechar o serviço */}
              <TouchableOpacity style={styles.button} onPress={acceptService}>
                <Text style={styles.buttonText}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={rejectService}>
                <Text style={styles.buttonText}>Recusar</Text>
              </TouchableOpacity>
              {/* Novo botão para fechar o container */}
              <TouchableOpacity style={styles.button} onPress={closeRequest}>
                <Text style={styles.buttonText}>Fechar</Text>
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
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  requestContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    zIndex: 4,
    borderRadius: 10,
    elevation: 5,
  },
  requestContent: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  requestTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  requestLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  requestValue: {
    color: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#005AA6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
