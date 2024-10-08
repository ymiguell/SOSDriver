import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilUser() {
  const [user, setUser] = useState({ nome: '', email: '', telefone: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Recupera o token armazenado
        const token = await AsyncStorage.getItem('authToken');
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');

        if (!token) {
          Alert.alert('Erro', 'Você não está logado.');
          return;
        }

        const response = await fetch('http://192.168.56.1:3002/api/perfil', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username,
              senha: password,  // Enviar 'senha' ao invés de 'password'
          }),
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
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.containerInfo}>
            <View style={styles.containerUser}>
              <View style={styles.containerStar}>
                <Text style={styles.titleStyle}>{user.nome}</Text>
                <View style={styles.starsContainer}>
                  {[...Array(5)].map((_, index) => (
                    <Text key={index} style={styles.formatStars}>★</Text>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.separateInputs}>
              <Text style={styles.label}>Telefone:</Text>
              <TextInput
                value={user.telefone}
                style={styles.inputText}
                editable={false}
              />
            </View>

            <View style={styles.separateInputs}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                value={user.email}
                style={styles.inputText}
                editable={false}
              />
            </View>
          </View>
        )}
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  containerInfo: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 50,
    width: '80%',
    elevation: 5,
  },
  label: {
    color: "#000",
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 14,
  },
  inputText: {
    padding: 10,
    color: "#000",
    borderRadius: 5,
    marginBottom: 20,
  },
  separateInputs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  containerUser: {
    flexDirection: 'row',
    padding: 20,
    width: '80%',
  },
  containerStar: {
    flexDirection: 'column',
    marginTop: 1,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formatStars: {
    color: '#ffb300',
    fontSize: 24,
    marginHorizontal: 2,
  },
});
