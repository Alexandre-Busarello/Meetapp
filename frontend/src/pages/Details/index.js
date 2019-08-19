import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, isBefore } from 'date-fns';
import { toast } from 'react-toastify';
import { FaPen, FaTrash } from 'react-icons/fa';
import { IoIosPin, IoMdCalendar } from 'react-icons/io';
import PropTypes from 'prop-types';

import history from '~/services/history';
import { cancelMeetupRequest } from '~/store/modules/meetup/actions';
import { Container, CustomButton, Banner, Content } from './styles';

export default function Details({ match }) {
  const dispatch = useDispatch();

  const { meetupId } = match.params;
  const meetup = useSelector(state =>
    state.meetup.userMeetups.find(m => String(m.id) === meetupId)
  );

  if (!meetup) {
    history.push('/dashboard');
    return <Container />;
  }

  function isValidDate(date) {
    const checkDate = parseISO(date);
    const actualDate = new Date();

    if (date && isBefore(checkDate, actualDate)) {
      toast.warn(
        'Não é possível alterar ou excluir um meetup que já aconteceu'
      );
      return false;
    }
    return true;
  }

  function handleCancel({ id, date }) {
    if (!isValidDate(date)) {
      return;
    }
    dispatch(cancelMeetupRequest(id));
  }

  function handleEdit({ id, date }) {
    if (!isValidDate(date)) {
      return;
    }
    history.push(`/meetup/${id}`);
  }

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <CustomButton blue type="button" onClick={() => handleEdit(meetup)}>
            <FaPen color="#FFF" size={18} />
            Editar
          </CustomButton>
          <CustomButton type="button" onClick={() => handleCancel(meetup)}>
            <FaTrash color="#FFF" size={18} />
            Cancelar
          </CustomButton>
        </div>
      </header>
      <Content>
        <Banner>
          {meetup.banner ? (
            <img src={meetup.banner.url} alt="Banner do Meetup" />
          ) : (
            <span>IMAGEM NÃO ENCONTRADA</span>
          )}
        </Banner>
        <p>{meetup.description}</p>
        <div>
          <span>
            <IoMdCalendar color="#FFF" size={12} />
            {meetup.dateFormatted}
          </span>
          <span>
            <IoIosPin color="#FFF" size={12} />
            {meetup.location}
          </span>
        </div>
      </Content>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      meetupId: PropTypes.string,
    }),
  }).isRequired,
};
