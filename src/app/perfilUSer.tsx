import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons';


export default function PerfilUser() {
  return (
    <LinearGradient
      colors={['#01355C', '#014B82', '#0262A9', '#0264AC', '#0270C2', '#013860']}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/map')} // Navega para a tela de login
      >
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
        <View style={styles.containerUser}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} 
            style={styles.profileImage}
          />
          <View style={styles.containerStar}>
            <Text style={styles.titleStyle}>
              Miguel Melo
            </Text>
            <View style={styles.starsContainer}>
              <Text style={styles.formatStars}>★</Text>
              <Text style={styles.formatStars}>★</Text>
              <Text style={styles.formatStars}>★</Text>
              <Text style={styles.formatStars}>★</Text>
              <Text style={styles.formatStars}>★</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerInfo}>
          <View style={styles.separateInputs}>
            <Text style={styles.label}>Alterar Telefone:</Text>
            <TextInput placeholder="999" placeholderTextColor="#ccc" style={styles.inputText} />
          </View>

          <View style={styles.separateInputs}>
            <Text style={styles.label}>Alterar email:</Text>
            <TextInput placeholder="seuemail@exemplo.com" placeholderTextColor="#ccc" style={styles.inputText} />
          </View>

          <View style={styles.separateInputs}>
            <Text style={styles.label}>Alterar senha:</Text>
            <TextInput placeholder="********" placeholderTextColor="#ccc" secureTextEntry={true} style={styles.inputText} />
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
  },
  containerUser: {
    flexDirection: 'row',
    padding: 20,
    width: '80%'
  },
  containerStar: {
    flexDirection: 'column',
    marginTop: 1,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
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
    alignItems: 'center'
  },
  formatStars: {
    color: '#FFFF00',
    fontSize: 24,
    marginHorizontal: 2,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});
