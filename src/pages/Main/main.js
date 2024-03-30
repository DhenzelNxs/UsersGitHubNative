import React, {Component} from 'react';
import {
  Keyboard,
  ActivityIndicator,
  Alert,
  View,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Reactotron from 'reactotron-react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButtom,
  ProfileButtomText,
  RemoveIcon,
  EmptyText,
} from './styles';
import api from '../../services/api';
import reactotron from 'reactotron-react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    filters: [],
    users: [],
    loading: false,
  };

  backAction = () => {
    Alert.alert('AVISO!', 'Tem certeza de que deseja sair do aplicativo ?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Sim', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({users: JSON.parse(users)});
    }

    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentDidUpdate(_, prevState) {
    const {users, newUser} = this.state;

    if (prevState.users !== this.state.users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleNavigate = async item => {
    const {navigation} = this.props;
    await AsyncStorage.setItem('UserAtual', item);
    navigation.navigate('User');
  };

  handleSearchUser = text => {
    this.setState({newUser: text});
    if (text.length > 0) {
      const {users, newUser} = this.state;
      const filteredUsers = users.filter(user =>
        user.login.toLowerCase().includes(newUser.toLowerCase()),
      );
      this.setState({filters: filteredUsers});
    } else {
      this.setState({filters: []}); // Limpar filtros se a caixa de pesquisa estiver vazia
    }
  };

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    try {
      this.setState({loading: true});

      const response = await api.get(`/users/${newUser}`);

      const duplicate = users.filter(
        user => user.login === response.data.login,
      );

      if (duplicate.length > 0) {
        throw new Error('Usuario já existe');
      }

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [data, ...users],
        newUser: '',
      });

      Keyboard.dismiss();
      Alert.alert('AVISO!', 'Usuário adicionado com sucesso!', [
        {
          text: 'conferir',
          onPress: () => {},
          style: 'default',
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Error ao adicionar usuário',
        `${error}`,
        [
          {
            text: 'Conferir',
            onPress: () => {},
            style: 'default',
          },
        ],
        {cancelable: false},
      );
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleRemoveUser = login => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.login !== login),
    }));
  };

  render() {
    const {users, newUser, loading, filters} = this.state;
    const displayedUsers = newUser ? filters : users; // Exibir usuários filtrados se houver um novo usuário pesquisado
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o nome do Usuário"
            value={newUser}
            onChangeText={text => this.handleSearchUser(text)}
            returnKeyType="search"
            onSubmitEditing={this.handleAddUser}
          />

          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="user-plus" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={displayedUsers}
          keyExtractor={user => user.login}
          ListEmptyComponent={
            <EmptyText>Não há Usuários Cadastrados</EmptyText>
          }
          renderItem={({item}) => (
            <User>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Avatar source={{uri: item.avatar}} />
                <RemoveIcon onPress={() => this.handleRemoveUser(item.login)}>
                  <Icon name="trash-alt" size={20} color="#F00" />
                </RemoveIcon>
              </View>
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButtom onPress={() => this.handleNavigate(item.login)}>
                <ProfileButtomText>Ver Perfil</ProfileButtomText>
              </ProfileButtom>
            </User>
          )}
        />
      </Container>
    );
  }
}
