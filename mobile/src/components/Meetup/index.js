import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AppConfig from '~/config/AppConfig';

import {
  Container,
  Header,
  Banner,
  Content,
  Title,
  DateView,
  DateText,
  Owner,
  OwnerText,
  Location,
  LocationText,
  SubscriptionButton,
} from './styles';

export default function Meetup({ data, onSubscription, onCancel }) {
  const isSubscribing = useSelector(store => store.meetup.isSubscribing);

  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM, 'às' HH'h'", {
      locale: pt,
    });
  }, [data.date]);

  return (
    <Container>
      <Header>
        <Banner
          source={{
            uri: data.banner.url.replace('localhost', AppConfig.address),
          }}
        />
      </Header>
      <Content>
        <Title>{data.title}</Title>
        <DateView>
          <Icon name="date-range" size={14} color="#999" />
          <DateText>{dateParsed}</DateText>
        </DateView>
        <Location>
          <Icon name="place" size={14} color="#999" />
          <LocationText>{data.location}</LocationText>
        </Location>
        <Owner>
          <Icon name="person" size={14} color="#999" />
          <OwnerText>{`Organizador: ${data.owner.name}`}</OwnerText>
        </Owner>

        {!data.subscribed && onSubscription && (
          <SubscriptionButton loading={isSubscribing} onPress={onSubscription}>
            Realizar inscrição
          </SubscriptionButton>
        )}

        {data.subscribed && onCancel && (
          <SubscriptionButton loading={isSubscribing} onPress={onCancel}>
            Cancelar inscrição
          </SubscriptionButton>
        )}
      </Content>
    </Container>
  );
}
