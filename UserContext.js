import React, { createContext, useState, useContext, useEffect } from 'react'; 
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 

// Cria o contexto
const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '', 
    email: '' 
  });

  const [token, setToken] = useState('');

  // Função para fazer login
  const login = async (username, senha) => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        senha
      });

      const { token } = response.data;

      // Armazena o token
      setToken(token);

      // Decodifica o token para obter o nome de usuário (opcional)
      const decoded = jwt_decode(token);

      // Atualiza o estado do token e do usuário
      setToken(token);

      // Buscar perfil do usuário após login
      fetchUserProfile(token);

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  // Função para buscar perfil do usuário
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:3002/api/perfil', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      // Limpar o token e o usuário se houver um erro
      setToken('');
      setUser({ name: '', email: '' });
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
