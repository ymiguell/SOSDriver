import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importar LinearGradient
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  const router = useRouter(); // Obtém a instância do roteador

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => {/* ação para o menu */}}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      <LinearGradient
        colors={['#003B6F', '#005AA6', '#007BFF']}
        style={styles.aside}
      >
        <View style={styles.userSection}>
          <Ionicons name="person-circle-outline" size={80} color="#fff" />
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

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633309,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: -23.55052, longitude: -46.633309 }} />
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
