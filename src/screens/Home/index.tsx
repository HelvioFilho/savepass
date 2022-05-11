import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  Metadata,
  Title,
  TotalPassCount,
  LoginList,
} from './styles';
import { userRoot } from '../../hooks/auth';

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

interface ImageProps {
  uri: string;
  cancelled: boolean;
}

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchText, setSearchText] = useState('');
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);
  const { user, loading, getUser, setUserUpdate, awaitUser } = userRoot();

  async function loadData() {
    const dataKey = '@savepass:logins';
    // Get asyncStorage data, use setSearchListData and setData
    const response = await AsyncStorage.getItem(dataKey);
    const savedData = response ? JSON.parse(response) : [];
    if (savedData.length > 0) {
      setData(savedData);
      setSearchListData(savedData);
    }
  }

  function handleFilterLoginData() {
    // Filter results inside data, save with setSearchListData
    if (searchText !== '') {
      const result = searchListData.filter((item) => item.service_name.includes(searchText.trim()));
      setSearchListData(result);
    }
  }

  function handleChangeInputText(text: string) {
    // Update searchText value
    if (text === '') {
      setSearchListData(data);
      setSearchText('');
    } else {
      setSearchText(text);
    }
  }

  async function handleChangeImage() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Atenção', 'Permissão negada');
      } else {
        SaveImage();
      }
    }
  }

  async function SaveImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }) as ImageProps;

    if (!result.cancelled) {
      // setImage(result.uri);
      await setUserUpdate({ name: user.name, avatar_url: result.uri });
    }
  }

  async function handleChangeInfo() {
    const dataKey = '@savepass:user';
    await AsyncStorage.setItem(dataKey, '');
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  useEffect(() => {
    if (!loading) {
      if (!user.name) {
        getUser();
      }
    }
  }, [loading]);

  useEffect(() => {
    if (!awaitUser) {
      getUser();
    }

  }, [awaitUser])

  return (
    <>
      <Header
        user={user}
        changeImage={handleChangeImage}
        changeInfo={handleChangeInfo}
      />

      <Container>
        <SearchBar
          placeholder="Qual senha você procura?"
          onChangeText={handleChangeInputText}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleFilterLoginData}

          onSearchButtonPress={handleFilterLoginData}
        />

        <Metadata>
          <Title>Suas senhas</Title>
          <TotalPassCount>
            {searchListData.length
              ? `${`${searchListData.length}`.padStart(2, '0')} ao total`
              : 'Nada a ser exibido'
            }
          </TotalPassCount>
        </Metadata>

        <LoginList
          keyExtractor={(item) => item.id}
          data={searchListData}
          renderItem={({ item: loginData }) => {
            return <LoginDataItem
              service_name={loginData.service_name}
              email={loginData.email}
              password={loginData.password}
            />
          }}
        />
      </Container>
    </>
  )
}