import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Cria o contexto
const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    nome:'',
    email: '', 
    telefone:'' 
  });

  const [token, setToken] = useState('');

  // Função para fazer login
  const login = async (username, senha) => {
    try {
      const response = await axios.post('http://10.0.2.2:3002/api/login', {
        username,
        senha
      });

      const { token } = response.data;

      // Armazena o token
      setToken(token);

      // Decodifica o token para obter informações do usuário
      const decoded = jwt_decode(token);
      console.log('Decoded token:', decoded);
      // Atualiza o estado do usuário com base no token
      setUser({
        nome: decoded.nome || '',  
        email: decoded.email || '',
        telefone: decoded.telefone || '',
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  // Função para buscar perfil do usuário
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://10.0.2.2:3002/api/perfil', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      setToken('');
      setUser({ nome: '', email: '', telefone: '' });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar o contexto
export const useUser = () => useContext(UserContext);
