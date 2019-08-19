import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  LogoutButton,
  ErrorMessage,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    name: {},
    email: {},
    oldPassword: {},
    password: {},
    confirmPassword: {},
  });

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function validate(fieldName, value) {
    switch (fieldName) {
      case 'name': {
        if (!value) {
          setError({ ...error, name: { required: true } });
          return false;
        }
        setError({ ...error, name: {} });
        break;
      }
      case 'email': {
        if (!value) {
          setError({ ...error, email: { required: true } });
          return false;
        }
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!reg.test(value)) {
          setError({ ...error, email: { invalid: true } });
          return false;
        }
        setError({ ...error, email: {} });
        break;
      }
      case 'oldPassword': {
        if (!password && value) {
          setError({ ...error, password: { required: true } });
          return false;
        }
        setError({ ...error, password: {} });
        break;
      }
      case 'password': {
        if (value && !confirmPassword) {
          setError({ ...error, confirmPassword: { required: true } });
          return false;
        }
        setError({ ...error, confirmPassword: {} });
        break;
      }
      case 'confirmPassword': {
        if (password && password !== value) {
          setError({ ...error, confirmPassword: { notMatch: true } });
          return false;
        }
        setError({ ...error, confirmPassword: {} });
        break;
      }
      default:
    }
    return true;
  }

  function validateAllFields() {
    const valid =
      validate('name', name) &&
      validate('email', email) &&
      validate('oldPassword', oldPassword) &&
      validate('password', password) &&
      validate('confirmPassword', confirmPassword);
    if (valid) {
      setError({
        name: {},
        email: {},
        oldPassword: {},
        password: {},
        confirmPassword: {},
      });
    }
    return valid;
  }

  function handleSubmit() {
    if (!validateAllFields()) return;
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
            onBlur={() => validate('name', name)}
          />
          {error.name.required && (
            <ErrorMessage>O campo nome é obrigatório</ErrorMessage>
          )}

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            onBlur={() => validate('email', email)}
          />
          {error.email.required && (
            <ErrorMessage>O campo email é obrigatório</ErrorMessage>
          )}
          {error.email.invalid && (
            <ErrorMessage>O email informado é inválido</ErrorMessage>
          )}

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          {error.password.required && (
            <ErrorMessage>O campo nova senha é obrigatório</ErrorMessage>
          )}

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {error.confirmPassword.required && (
            <ErrorMessage>
              O campo de confirmação de senha é obrigatório
            </ErrorMessage>
          )}
          {error.confirmPassword.notMatch && (
            <ErrorMessage>
              Senha de confirmação diferente da nova senha digitada
            </ErrorMessage>
          )}

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Atualizar perfil
          </SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair da aplicação</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
