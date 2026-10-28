<p align="center">
  <img src="./src/assets/UsersGitHubNative_logo.png" alt="UsersGitHubNative logo" width="140" />
</p>

<h1 align="center">UsersGitHubNative</h1>

<p align="center">
  Aplicativo mobile em React Native que permite buscar usuários do GitHub, salvar favoritos,
  visualizar detalhes do perfil e acessar repositórios estrelados direto de um WebView.
</p>

## Sobre o projeto

O app consome a API pública do GitHub para buscar um usuário pelo login, exibir seus dados
básicos (nome, bio e avatar) e manter uma lista de favoritos persistida no dispositivo. A partir
do perfil de um usuário favoritado é possível navegar pelos repositórios que ele deu estrela e
abrir qualquer um deles em um WebView interno, sem saltar para o navegador do sistema.

## Funcionalidades

- Buscar um usuário do GitHub pelo login, usando a API pública (`/users/:login`).
- Adicionar o usuário encontrado à lista de favoritos, com proteção contra duplicados.
- Filtrar a lista de favoritos em tempo real conforme o texto digitado na busca.
- Persistir a lista de favoritos localmente com AsyncStorage (sobrevive ao fechar o app).
- Remover um usuário da lista de favoritos.
- Visualizar os detalhes de um favorito: avatar, nome e bio.
- Listar os repositórios estrelados (`starred`) de um usuário.
- Abrir um repositório estrelado em um WebView interno, com indicador de carregamento.
- Diálogo de confirmação ao pressionar o botão físico de voltar no Android.

## Tecnologias

- [React Native](https://reactnative.dev) 0.72 (CLI, sem Expo)
- [React](https://react.dev) 18
- [React Navigation](https://reactnavigation.org) (native stack)
- [Axios](https://axios-http.com) para consumo da API do GitHub
- [styled-components](https://styled-components.com) para estilização
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage) para persistência local
- [react-native-webview](https://github.com/react-native-webview/react-native-webview) para abrir links de repositórios
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) (FontAwesome5)
- [Reactotron](https://github.com/infinitered/reactotron) para debug em desenvolvimento

## Como executar

Pré-requisito: ambiente de desenvolvimento React Native configurado (Node, JDK/Android Studio
para Android e/ou Xcode/CocoaPods para iOS), seguindo o [guia oficial de setup](https://reactnative.dev/docs/environment-setup).

1. Clone o repositório e instale as dependências:

   ```bash
   git clone https://github.com/DhenzelNxs/UsersGitHubNative.git
   cd UsersGitHubNative
   yarn install
   # ou: npm install
   ```

2. Apenas para iOS, instale os pods:

   ```bash
   cd ios && pod install && cd ..
   ```

3. Em um terminal, inicie o Metro Bundler:

   ```bash
   yarn start
   # ou: npm start
   ```

4. Em outro terminal, rode o app na plataforma desejada:

   ```bash
   # Android
   yarn android

   # iOS
   yarn ios
   ```

### Outros scripts disponíveis

```bash
yarn lint   # roda o ESLint
yarn test   # roda os testes com Jest
```

## Estrutura do projeto

```text
src/
├── pages/
│   ├── Main/     # busca e lista de usuários favoritados
│   ├── User/     # detalhes do usuário e repositórios estrelados
│   └── WebView/  # tela de WebView para abrir um repositório
├── services/
│   └── api.js    # instância do axios apontando para api.github.com
└── routes.js     # navegação entre as telas (React Navigation)
```
