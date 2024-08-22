import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [email, setEmail] = useState('joao.silva@example.com');
  const [phone, setPhone] = useState('123-456-7890');

  return (
    <LinearGradient
      colors={['#01355C', '#014B82', '#0262A9', '#0264AC', '#0270C2', '#013860']}
      style={styles.container}
    >
      <StatusBar style="auto" />
      
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p3/11186876-simbolo-de-foto-de-perfil-masculino-vetor.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Henrico</Text>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons key={index} name="star" size={24} color="#FFD700" />
          ))}
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Alterar telefone: </Text>
          <Text style={styles.optionInfo}>xxx****xxxx</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Alterar email: </Text>
          <Text style={styles.optionInfo}>x***@gmail.com</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Alterar senha: </Text>
          <Text style={styles.optionInfo}>**********</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    elevation: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  optionInfo: {
    fontSize: 16,
    color: '#999',
  },
});
