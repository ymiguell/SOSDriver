// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UserProvider } from './UserContext';
import { ServiceRequestProvider } from './TELAS/ServiceRequestContext'; // Importa o provedor de solicitações
import AppNavigator from './appnavigator'; // Verifique o caminho do arquivo

export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
        <ServiceRequestProvider> 
          <AppNavigator />
        </ServiceRequestProvider>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
