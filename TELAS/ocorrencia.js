import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OcorrenciaScreen = () => {
  // Exemplo de dados
  const ocorrencia = {
    numero: 'xxxxxxx',
    localizacao: 'Jardim Primavera, Mogi Mirim - SP, 02377-000',
    descricao: 'Descrição detalhada da ocorrência.',
  };

  return (
    <LinearGradient
      colors={['#003B6F', '#005AA6', '#007BFF']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.ocorrenciaText}>Número de Ocorrência: {ocorrencia.numero}</Text>
          <Text style={styles.enderecoText}>Localização: {ocorrencia.localizacao}</Text>
        </View>
        <View style={styles.descricaoContainer}>
          <Text style={styles.descricaoTitle}>Descrição:</Text>
          <Text style={styles.descricaoText}>{ocorrencia.descricao}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}></View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  ocorrenciaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  enderecoText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  },
  descricaoContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco semi-transparente
    borderRadius: 10,
    margin: 10,
  },
  descricaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003B6F',
  },
  descricaoText: {
    fontSize: 16,
    color: '#000',
  },
  footer: {
    height: 50,
    backgroundColor: '#003366',
  },
});

export default OcorrenciaScreen;
