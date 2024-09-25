import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [nome, setNome] = useState('');
  const [dt_nasc, setDtNasc] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmsenha, setConfirmsenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [type, setType] = useState('cliente'); // Default value
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  const handleCepChange = async (cepValue) => {
    setCep(cepValue);
    if (cepValue.length === 8) { // Check if CEP is complete
      try {
        // Fetch address data from ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json();
        
        if (data.erro) {
          alert('CEP não encontrado.');
          return;
        }

        setEndereco(data.logradouro + ', ' + data.bairro + ', ' + data.localidade + ' - ' + data.uf);

        // Fetch coordinates from OpenStreetMap
        const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${data.logradouro}, ${data.localidade}, ${data.uf}`);
        const geocodeData = await geocodeResponse.json();
        
        if (geocodeData.length > 0) {
          setLatitude(geocodeData[0].lat);
          setLongitude(geocodeData[0].lon);
        } else {
          alert('Coordenadas não encontradas.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do CEP:', error);
        alert('Erro ao buscar dados do CEP.');
      }
    }
  };

  const handleRegister = async () => {
    if (!nome || !dt_nasc || !email || !username || !cpf || !senha || !confirmsenha || !telefone || !cep || !numero || !type || !latitude || !longitude) {
      alert('Todos os campos são obrigatórios, incluindo latitude e longitude.');
      return;
    }
  
    if (senha !== confirmsenha) {
      alert('As senhas não coincidem.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('http://172.16.11.20:3000/usuario', {
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
          telefone,
          cep,
          numero,
          endereco,
          latitude,
          longitude,
          type,
        }),
      });
  
      const responseText = await response.text(); // Usar text para capturar resposta
      let result;
  
      try {
        result = JSON.parse(responseText); // Tentar analisar JSON
      } catch (e) {
        console.error('Erro ao analisar JSON:', e);
        alert('Resposta inesperada do servidor.');
        return;
      }
  
      if (response.ok) {
        alert('Cadastro realizado com sucesso.');
        // Aqui você pode adicionar a lógica para adicionar marcadores ao mapa, se necessário.
        // Resetar estados após o sucesso
        setNome('');
        setDtNasc('');
        setEmail('');
        setUsername('');
        setCpf('');
        setSenha('');
        setConfirmsenha('');
        setTelefone('');
        setCep('');
        setNumero('');
        setEndereco('');
        setLatitude('');
        setLongitude('');
        setType('cliente'); // Reset to default value
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
      <ScrollView contentContainerStyle={styles.scrollView}>
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
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Telefone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={cep}
            onChangeText={handleCepChange}
            placeholder="CEP"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder="Número"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Endereço"
            editable={false} // Prevent manual editing
          />
          {/* Latitude and Longitude fields removed */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={type}
              style={styles.picker}
              onValueChange={(itemValue) => setType(itemValue)}
            >
              <Picker.Item label="Mecânico" value="mecanico" />
              <Picker.Item label="Borracheiro" value="borracheiro" />
              <Picker.Item label="Eletricista" value="eletricista" />
              <Picker.Item label="Cliente" value="cliente" />
            </Picker>
          </View>
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
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
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
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
  },
});
