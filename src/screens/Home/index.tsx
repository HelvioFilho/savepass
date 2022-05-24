import React, { useState, useCallback, useEffect } from 'react';
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
import { WarningModal } from '../../components/WarningModal';

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
  const [deleteId, setDeleteId] = useState('');
  const [visible, setVisible] = useState(false);
  const [awaitUser, setAwaitUser] = useState(true);
  const [updateData, setUpdateData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);

  const { user, getUser, setUserUpdate } = userRoot();
  const dataKey = '@savepass:logins';

  async function loadData() {
    // Get asyncStorage data, use setSearchListData and setData
    const response = await AsyncStorage.getItem(dataKey);
    const savedData = response ? JSON.parse(response) : [];
    if (savedData.length > 0) {
      setData(savedData);
      setSearchListData(savedData);
    }
  }

  async function deleteLoginData() {
    if (!!deleteId) {
      const result = data.filter((item) => item.id !== deleteId);
      try {
        await AsyncStorage.setItem(dataKey, JSON.stringify(result));
      } catch (error) {
        Alert.alert("Não foi possível deletar!");
      } finally {
        setUpdateData(!updateData);
        setVisible(false);
        setDeleteData(false);
      }
    }
  }

  function handleDeleteLoginData(id: string) {
    setDeleteId(id);
    setDeleteData(true);
    setVisible(true);
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
    setAwaitUser(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }) as ImageProps;
    try {
      if (!result.cancelled) {
        await setUserUpdate({ name: user.name, avatar_url: result.uri });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAwaitUser(false);
    }
  }

  async function handleChangeName(form: Partial<DataForm>) {
    setVisible(false);
    setAwaitUser(true);
    const userData = {
      name: form.name.trim(),
      avatar_url: user.avatar_url
    };
    try {
      await setUserUpdate(userData);
    } catch (err) {
      console.log(err);
    } finally {
      setAwaitUser(false);
    }

  }

  function getUserRook() {
    getUser().then();
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [updateData]));

  useEffect(() => {
    getUserRook();
  }, []);

  useEffect(() => {
    if (!awaitUser) {
      getUserRook();
    }
  }, [awaitUser]);

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
              id={loginData.id}
              password={loginData.password}
              deleteLoginData={handleDeleteLoginData}
            />
          }}
        />
        <Modal
          animationType="fade"
          transparent
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          {
            deleteData ?
              <WarningModal
                message={`Tem certeza que deseja apagar a senha?${'\n'} Essa ação não pode ser desfeita!`}
                button={[
                  {
                    title: "Cancelar",
                    color: "#32936F",
                    close: true,
                  },
                  {
                    title: "Apagar",
                    color: "#DB2727",
                    close: false,
                  },
                ]}
                closeModal={() => { setVisible(false); setDeleteData(false) }}
                primaryFunction={deleteLoginData}
              />
              :
              <InputModal
                changeName={handleChangeName}
                closeModal={() => setVisible(false)}
              />
          }
        </Modal>
      </Container>
    </>
  )
}