# Meetapp

Desafio feito para o Bootcamp da Rocketseat. É uma aplicação para gestão de eventos e inscrições de usuários similar ao Meetup.
Para simplificar o envio, juntei todas as aplicações no repositório e separei por pastas (backend, frontend e mobile). Porem o ideal é fazer um repositório para a API (backend), outro para a pagina web (frontend) e outro para aplicação mobile.

<b>Backend</b>

O backend da aplicação foi feito em <b>Node.JS</b> e utiliza:

- Express (Servidor Web)
- JWT (autentição) 
- Sequelize (ORM) 
- Nodemailer (envio de e-mail) 
- BeeQueue (Controle de fila para envio de e-mail)
- Yup (Validação de Schema)
- Multer (Upload de imagem)
- Postgres
- Redis
- ESLint
- Prettier
- Nodemon
- Sucrase

Para rodar a aplicação (prompt precisa estar na pasta backend):

```
yarn
yarn run dev
```

<b>Frontend</b>

A pagina web da aplicação foi construida com <b>ReactJS</b> utilizando:

- Axios  (Lib para chamadas HTTP)
- Date-Fns (Lib de data)
- Redux (Compartilhamento de estados
- Redux Saga (Tratramento de side-effects para o Redux)
- Rocketseat/Unform (Lib de Form)
- Styled Components (Estilização de componentes)
- Immer
- Yup (Validação de Schema)
- React Router DOM (Roteamento)
- Reactotron (Ferramenta para auxiliar Debug)
- ESLint
- Prettier

Para rodar a aplicação (prompt precisa estar na pasta frontend):

```
yarn
yarn start
```

<b>Mobile</b>

A aplicação mobile foi construida com <b>React Native</b> utilizando:

- Axios  (Lib para chamadas HTTP)
- Date-Fns (Lib de data)
- Redux (Compartilhamento de estados
- Redux Saga (Tratramento de side-effects para o Redux)
- Styled Components (Estilização de componentes)
- Immer
- Yup (Validação de Schema)
- React Navigation (Navegação)
- Reactotron (Ferramento para auxiliar Debug)
- ESLint
- Prettier


Para rodar a aplicação (prompt precisa estar na pasta mobile):

<b>Android</b>
```
yarn
react-native link
react-native run-android
```

<b>IOS</b>
```
yarn
react-native link
react-native run-ios
```

Existe um arquivo <b>src/config/AppConfig.js</b> que contem o IP da maquina que está rodando a API. Precisa alterar esse arquivo para a aplicação rodar corretamente.


