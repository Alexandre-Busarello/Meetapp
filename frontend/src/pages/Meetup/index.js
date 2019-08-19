import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdControlPoint } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import BannerPhotoInput from './BannerPhotoInput';
import DatePicker from '~/components/DatePicker';

import {
  updateMeetupRequest,
  addMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, FormFields } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo do meetup é obrigatório'),
  description: Yup.string().required('A descrição do meetup é obrigatória'),
  location: Yup.string().required('A localização do meetup é obrigatória'),
  date: Yup.date().required('A data do meetup é obrigatória'),
  banner_id: Yup.string(),
});

export default function Meetup({ match }) {
  const dispatch = useDispatch();
  const { meetupId } = match.params;
  const meetup = useSelector(state =>
    state.meetup.userMeetups.find(m => String(m.id) === meetupId)
  );

  async function handleSubmit(data) {
    try {
      if (meetup) {
        dispatch(updateMeetupRequest(meetup.id, data));
      } else {
        dispatch(addMeetupRequest(data));
      }
    } catch (err) {
      toast.error(
        `Erro ao ${
          meetup ? 'atualizar' : 'criar'
        } o meetup, confira seus dados!`
      );
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <FormFields>
          <BannerPhotoInput name="banner_id" />
          <Input name="title" type="text" placeholder="Título do Meetup" />
          <Textarea
            name="description"
            rows={6}
            placeholder="Descrição completa do evento"
          />
          <DatePicker name="date" placeholderText="Data do Meetup" />
          <Input name="location" type="text" placeholder="Localização" />
        </FormFields>

        <button type="submit">
          <MdControlPoint color="#FFF" size={18} />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      meetupId: PropTypes.number,
    }),
  }).isRequired,
};
