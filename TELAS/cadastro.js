import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function App() {
  const [nome, setNome] = useState('');
  const [dt_nasc, setDtNasc] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmsenha, setConfirmsenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showsenha, setShowsenha] = useState(false);
  const [showConfirmsenha, setShowConfirmsenha] = useState(false);

  const handleRegister = async () => {
    // Verifica se todos os campos foram preenchidos
    if (!nome || !dt_nasc || !email || !username || !cpf || !senha || !confirmsenha) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmsenha) {
      alert('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://172.16.11.20:3000/register', {
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
          confirmsenha,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso');
        // Limpar os campos do formulário após o cadastro bem-sucedido
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
    alert('Ir para tela de login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p3/11186876-simbolo-de-foto-de-perfil-masculino-vetor.jpg' }}
          style={styles.profileImage} 
        />
      </View>
      <Text style={styles.title}>Cadastro</Text>
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
        <View style={styles.senhaContainer}>
          <TextInput
            style={styles.senhaInput}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showsenha}
            placeholder="Senha"
          />
          <Pressable onPress={() => setShowsenha(!showsenha)} style={styles.eyeIcon}>
            <Ionicons 
              name={showsenha ? 'eye-off' : 'eye'} 
              size={24} 
              color="#01355C" 
            />
          </Pressable>
        </View>
        <View style={styles.senhaContainer}>
          <TextInput
            style={styles.senhaInput}
            value={confirmsenha}
            onChangeText={setConfirmsenha}
            secureTextEntry={!showConfirmsenha}
            placeholder="Confirme a Senha"
          />
          <Pressable onPress={() => setShowConfirmsenha(!showConfirmsenha)} style={styles.eyeIcon}>
            <Ionicons 
              name={showConfirmsenha ? 'eye-off' : 'eye'} 
              size={24} 
              color="#01355C" 
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#01355C',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,  
    height: 100, 
    borderRadius: 50, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffff',
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
    marginBottom: 10,
    backgroundColor: 'white',
  },
  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senhaInput: {
    flex: 1,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    color: "fff"
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
