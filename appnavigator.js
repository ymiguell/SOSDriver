// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './TELAS/cadastro'; // Verifique o caminho do arquivo
import LoginScreen from './TELAS/login'; // Verifique o caminho do arquivo
import MapScreen from './TELAS/map'; // Adicionando o caminho do MapScreen
import PerfilCliente from './TELAS/perfilcliente'; // Caminho para o componente PerfilCliente


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={MapScreen} /> 
        <Stack.Screen name="PerfilCliente" component={PerfilCliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
