// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './appnavigator'; // Verifique o caminho do arquivo

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
