import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../UserContext'; // Ajuste o caminho conforme necessário

export default function PerfilUser() {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const { token } = useUser(); // Assumindo que você está passando o token do contexto

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/perfil', { // Para emuladores Android, use 10.0.2.2
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao carregar perfil');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o perfil.');
      console.error('Erro ao buscar perfil:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#01355C', '#014B82', '#0262A9', '#0264AC', '#0270C2', '#013860']}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <View style={styles.containerUser}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} 
            style={styles.profileImage}
          />
          <View style={styles.containerStar}>
            <Text style={styles.titleStyle}>{user.name}</Text>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, index) => (
                <Text key={index} style={styles.formatStars}>★</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.containerInfo}>
          <View style={styles.separateInputs}>
            <Text style={styles.label}>Telefone:</Text>
            <TextInput 
              value={user.phone} 
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

          <View style={styles.separateInputs}>
            <Text style={styles.label}>Alterar senha:</Text>
            <TextInput 
              placeholder="********" 
              placeholderTextColor="#ccc" 
              secureTextEntry 
              style={styles.inputText} 
            />
          </View>
        </View>
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
    color: '#fff',
    fontWeight: 'bold',
  },
  containerInfo: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
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
    color: '#FFFF00',
    fontSize: 24,
    marginHorizontal: 2,
  },
});
