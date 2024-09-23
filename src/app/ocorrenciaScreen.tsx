import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const OcorrenciaScreen = () => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com número de ocorrência e endereço */}
      <View style={styles.header}>
        <Text style={styles.ocorrenciaText}>numero de ocorrencia: xxxxxxx</Text>
        <Text style={styles.enderecoText}>
          Jardim Primavera, Mogi Mirim - SP, 02377-000
        </Text>
      </View>

      {/* Seção de descrição */}
      <ScrollView style={styles.descricaoContainer}>
        <Text style={styles.descricaoTitle}>descrição:</Text>
       
      </ScrollView>

      {/* Rodapé */}
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
