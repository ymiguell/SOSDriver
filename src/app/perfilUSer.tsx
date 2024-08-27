import React from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";

export default function perfilUser() {
  return (
    <View style={styles.container} >
      <Text style={styles.titleStyle} >
        Miguel Melo
      </Text>

      <View style={styles.containerInfo}>
        <View style={styles.separateInputs}>
          <TextInput style={styles.inputText}>
            Alterar Telefone:

          </TextInput>
        </View>
        <TextInput style={styles.inputText}>
          Alterar email:
        </TextInput>
        <TextInput style={styles.inputText}>
          Alterar senha:
        </TextInput>
      </View>

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: 30,
    color: '#fffs',
    fontWeight: 'bold',

  },

  containerInfo: {
    backgroundColor: "#000",
    borderRadius: 20,
  },
  inputText: {
    padding: 10,
    color: "#FFFF",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separateInputs: {
    borderWidth: 1,
    borderBottomColor: '#fff',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  } 
});