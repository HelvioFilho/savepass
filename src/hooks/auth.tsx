
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  avatar_url: string;
}
interface UserContextData {
  userAlreadyExist: boolean;
  user: User;
  loading: boolean;
  awaitUser: boolean;
  getUser(): Promise<void>;
  setUserUpdate(userData: User): Promise<void>;
}

const UserContext = createContext({} as UserContextData);

function UserProvider({ children }: UserProviderProps) {
  const [userAlreadyExist, setUserAlreadyExist] = useState(false);
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(true);
  const [awaitUser, setAwaitUser] = useState(true);

  const dataKey = '@savepass:user';

  async function getUser() {
    try {
      setAwaitUser(true);
      const response = await AsyncStorage.getItem(dataKey);
      const userData: User = response ? JSON.parse(response) : {};
      setUser(userData);
    } catch {
      console.log("Não foi possível recuperar as informações do usuário!");
    } finally {
      setAwaitUser(false);
    }
  }

  async function setUserUpdate(userData: User) {
    try {
      setAwaitUser(true);
      await AsyncStorage.setItem(dataKey, JSON.stringify(userData));
    } catch {
      console.log("Não foi possível atualizar as informações do usuário!");
    } finally {
      setAwaitUser(false);
    }
  }

  async function checkUser() {
    try {
      setLoading(true);
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
      awaitUser,
      getUser,
      setUserUpdate
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