import React from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";

export default function perfilUser() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>
        Miguel Melo
      </Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerInfo: {
    backgroundColor: "#051094",
    borderRadius: 20,
    padding: 20,
    width: '80%',
    elevation: 5,
},
  label: {
    color: "#fff",
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 14,
  },
  inputText: {
    padding: 10,
    color: "#fff",
    borderRadius: 5,
    marginBottom: 20,
    
  },
  separateInputs: {
    flexDirection: 'row',
  },
});
