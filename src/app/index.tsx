import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Importa o LinearGradient
import { Link } from 'expo-router';

export default function App() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Cadastro realizado com sucesso');
    }, 2000);
  };

  const handleLogin = () => {
    // alert('Ir para tela de login');
  };

  return (
    <LinearGradient
      colors={['#01355C', '#014B82', '#0262A9', '#0264AC', '#0270C2', '#013860']} // Cores do gradiente
      style={styles.container} // Aplica o gradiente ao container
    >
      <StatusBar style="auto" />
      <View style={styles.imageContainer}>
        <Image
          source={require('@/Images/logoSOS.png')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder="Data de Nascimento (dd/mm/aaaa)"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Usuário"
        />
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          placeholder="CPF"
          keyboardType="numeric"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Senha"
            placeholderTextColor="#FFF"
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#fff"
            />
          </Pressable>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholder="Confirme a Senha"
            placeholderTextColor="#FFF"
          />
          <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.footerButton} onPress={handleLogin}>
            <Text style={styles.footerButtonText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  passwordInput: {
    color: '#FFF',
    flex: 1,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    padding: 10,
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#CACACA',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});