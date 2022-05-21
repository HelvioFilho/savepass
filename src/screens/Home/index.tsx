import React, { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform, Modal } from 'react-native';

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
import { InputModal } from '../../components/InputModal';

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

interface DataForm {
  name: string;
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
  const [visible, setVisible] = useState(false);

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
      await setUserUpdate({ name: user.name, avatar_url: result.uri });
    }
  }

  async function handleCloseModal() {
    setVisible(false);
  }

  async function handleChangeName(form: Partial<DataForm>) {
    setVisible(false);
    const userData = {
      name: form.name,
      avatar_url: user.avatar_url
    };
    await setUserUpdate(userData);
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
        changeInfo={() => setVisible(true)}
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
        <Modal
          animationType="fade"
          transparent
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <InputModal
            changeName={handleChangeName}
            closeModal={handleCloseModal}
          />
        </Modal>
      </Container>
    </>
  )
}