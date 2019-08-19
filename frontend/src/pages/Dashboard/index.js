import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdControlPoint, MdChevronRight } from 'react-icons/md';

import history from '~/services/history';
import { fetchUserMeetupsRequest } from '~/store/modules/meetup/actions';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const userMeetups = useSelector(state => state.meetup.userMeetups);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserMeetupsRequest());
  }, [dispatch]);

  function handleNewMeetup() {
    history.push('/create-meetup');
  }

  function handleMeetup(meetupId) {
    history.push(`/detail/${meetupId}`);
  }

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button" onClick={handleNewMeetup}>
          <MdControlPoint color="#FFF" size={18} />
          Novo meetup
        </button>
      </header>
      <ul>
        {userMeetups.map(meetup => (
          <Meetup key={meetup.id} onClick={() => handleMeetup(meetup.id)}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.dateFormatted}</span>
              <MdChevronRight color="#FFF" size={24} />
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
