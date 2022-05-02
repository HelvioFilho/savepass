
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  userAlreadyExist: boolean;
  user: User;
  loading: boolean;
  getUser(): Promise<void>;
}

interface User {
  name: string;
  avatar_url: string;
}

const UserContext = createContext({} as UserContextData);

function UserProvider({ children }: UserProviderProps) {
  const [userAlreadyExist, setUserAlreadyExist] = useState(false);
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(true);

  const dataKey = '@savepass:user';

  async function getUser() {
    try {
      setLoading(true);
      const response = await AsyncStorage.getItem(dataKey);
      const userData: User = response ? JSON.parse(response) : {};
      setUser(userData);
    } catch {
      console.log("Não foi possível recuperar o usuário");
    } finally {
      setLoading(false);
    }
  }

  async function checkUser() {
    try {
      const userStored = await AsyncStorage.getItem(dataKey);
      if (userStored) {
        setUserAlreadyExist(true);
      }
    } catch {
      console.log("não foi possível recuperar as informações");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{
      userAlreadyExist,
      user,
      loading,
      getUser
    }}>
      {children}
    </UserContext.Provider>
  )
}

function userRoot() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, userRoot }