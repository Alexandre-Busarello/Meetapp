import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdControlPoint } from 'react-icons/md';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('dadsadsa'),
  email: Yup.string(),
  oldPassword: Yup.string().min(6, 'O campo precisa ter no mínimo 6 digitos'),
  password: Yup.string()
    .min(6)
    .when('oldPassword', (oldPassword, field) =>
      oldPassword
        ? field
            .min(6, 'O campo precisa ter no mínimo 6 digitos')
            .required('O campo de nova senha é obrigatório')
        : field
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .min(6, 'O campo precisa ter no mínimo 6 digitos')
          .required('A confirmação da senha é obrigatória')
          .oneOf(
            [Yup.ref('password')],
            'A confirmação da senha precisa ser igual a senha digitada'
          )
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <div>
          <Input name="name" type="text" placeholder="Nome completo" />
          <Input
            name="email"
            type="email"
            placeholder="Seu endereço de e-mail"
          />

          <hr />

          <Input
            name="oldPassword"
            type="password"
            placeholder="Sua senha atual"
          />
          <Input name="password" type="password" placeholder="Nova senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirmação da nova senha"
          />
        </div>

        <button type="submit">
          <MdControlPoint color="#FFF" size={18} />
          Salvar perfil
        </button>
      </Form>
    </Container>
  );
}
