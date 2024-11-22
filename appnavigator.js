// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './TELAS/cadastro'; // Verifique o caminho do arquivo
import LoginScreen from './TELAS/login'; // Verifique o caminho do arquivo
import MapScreen from './TELAS/map'; // Adicionando o caminho do MapScreen
import PerfilCliente from './TELAS/perfilcliente'; // Caminho para o componente PerfilCliente
import OcorrenciaScreen from './TELAS/ocorrencia';
import mapPrestador from './TELAS/mapPrestador';
import perfilprestador from './TELAS/perfilprestador'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={MapScreen} /> 
        <Stack.Screen name="PerfilCliente" component={PerfilCliente} />
        <Stack.Screen name="Ocorrencia" component={OcorrenciaScreen} />
        <Stack.Screen name="mapPrestador" component={mapPrestador} />
        <Stack.Screen name="perfilprestador" component={perfilprestador} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
