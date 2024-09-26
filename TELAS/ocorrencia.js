import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const OcorrenciaScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.ocorrenciaText}>Número de ocorrência: xxxxxxx</Text>
        <Text style={styles.enderecoText}>Jardim Primavera, Mogi Mirim - SP, 02377-000</Text>
      </View>
      <ScrollView style={styles.descricaoContainer}>
        <Text style={styles.descricaoTitle}>Descrição:</Text>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#003366',
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
    flex: 1,
    padding: 20,
  },
  descricaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    height: 50,
    backgroundColor: '#003366',
  },
});

export default OcorrenciaScreen;
