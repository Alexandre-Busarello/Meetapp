import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import logo from '~/assets/logo-small.png';

import { Wrapper, Container, LogoContainer } from './styles';

export default function Header({ navigation }) {
  const handleNavigate = (page, params) => {
    if (params) navigation.navigate(page, { params });
    else navigation.navigate(page);
  };

  return (
    <Wrapper>
      <Container>
        <LogoContainer onPress={() => handleNavigate('Dashboard')}>
          <Image source={logo} />
        </LogoContainer>
      </Container>
    </Wrapper>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
