import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OcorrenciaScreen = () => {
  // Exemplo de dados fictícios de ocorrências
  const [ocorrencias, setOcorrencias] = useState([
    {
      numero: '01',
      localizacao: 'Jardim Primavera, Mogi Mirim - SP, 02377-000',
      descricao: 'Incidente de queda de árvore na via pública, obstruindo a passagem.',
      status: 'pendente', // Adicionando o status
    },
    {
      numero: '02',
      localizacao: 'Centro, Mogi Guaçu - SP, 13730-000',
      descricao: 'Acidente de trânsito entre dois veículos, com danos materiais.',
      status: 'pendente',
    },
    {
      numero: '03',
      localizacao: 'Vila São João, Campinas - SP, 13030-000',
      descricao: 'Alagamento na rua devido a fortes chuvas, causando transtornos no trânsito.',
      status: 'pendente',
    },
    {
      numero: '04',
      localizacao: 'Jardim das Flores, São Paulo - SP, 02358-000',
      descricao: 'Falta de iluminação pública em diversos pontos da rua.',
      status: 'pendente',
    },
    {
      numero: '05',
      localizacao: 'Vila Nova, Indaiatuba - SP, 13330-000',
      descricao: 'Lixo acumulado nas ruas causando mau cheiro e risco à saúde pública.',
      status: 'pendente',
    },
  ]);

  // Função para finalizar a ocorrência
  const finalizarOcorrencia = (index) => {
    const updatedOcorrencias = [...ocorrencias];
    updatedOcorrencias[index].status = 'finalizada'; // Atualiza o status da ocorrência
    setOcorrencias(updatedOcorrencias); // Atualiza o estado
  };

  return (
    <LinearGradient
      colors={['#003B6F', '#005AA6', '#007BFF']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        {ocorrencias.map((ocorrencia, index) => (
          <View key={index} style={styles.ocorrenciaContainer}>
            <View style={styles.header}>
              <Text style={styles.ocorrenciaText}>
                Número de Ocorrência: {ocorrencia.numero}
              </Text>
              <Text style={styles.enderecoText}>Localização: {ocorrencia.localizacao}</Text>
            </View>
            <View style={styles.descricaoContainer}>
              <Text style={styles.descricaoTitle}>Descrição:</Text>
              <Text style={styles.descricaoText}>{ocorrencia.descricao}</Text>
            </View>
            
            {/* Botão customizado */}
            {ocorrencia.status === 'pendente' ? (
              <TouchableOpacity
                style={styles.finalizarButton}
                onPress={() => finalizarOcorrencia(index)}
              >
                <Text style={styles.finalizarButtonText}>Finalizar Ocorrência</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.finalizadoText}>Ocorrência Finalizada</Text>
            )}
          </View>
        ))}
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
  ocorrenciaContainer: {
    marginBottom: 20,
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
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  descricaoContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco semi-transparente
    borderRadius: 10,
    marginHorizontal: 10,
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
  finalizadoText: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
  },
  // Estilos para o botão
  finalizarButton: {
    backgroundColor: '#003B6F', // Cor do gradiente
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OcorrenciaScreen;
