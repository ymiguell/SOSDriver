import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [nome, setNome] = useState('');
  const [dt_nasc, setDtNasc] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmsenha, setConfirmsenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nome || !dt_nasc || !email || !username || !cpf || !senha || !confirmsenha) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    if (senha !== confirmsenha) {
      alert('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://172.16.11.20:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          dt_nasc,
          email,
          username,
          cpf,
          senha,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso');
        setNome('');
        setDtNasc('');
        setEmail('');
        setUsername('');
        setCpf('');
        setSenha('');
        setConfirmsenha('');
      } else {
        alert(result.message || 'Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro ao enviar o cadastro:', error);
      alert('Erro ao realizar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#01355C', '#014B82', '#0262A9', '#0264AC', '#0270C2', '#013860']}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <View style={styles.imageContainer}>
        <Image
          source={require('../Images/logoSOS.png')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={dt_nasc}
          onChangeText={setDtNasc}
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
            value={senha}
            onChangeText={setSenha}
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
            value={confirmsenha}
            onChangeText={setConfirmsenha}
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
        <TouchableOpacity style={styles.footerButton} onPress={handleLogin}>
          <Text style={styles.footerButtonText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
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
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 15,
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
