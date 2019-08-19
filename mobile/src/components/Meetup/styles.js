import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  border-radius: 4px;
  background: #fff;
  margin: 10px 15px;
`;

export const Header = styled.View``;

export const Banner = styled.Image`
  height: 170px;
`;

export const Content = styled.View`
  padding: 20px 15px;
`;

export const Title = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 18px;
`;

export const DateView = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;

  margin: 10px 5px;
`;

export const DateText = styled.Text`
  color: #999;
  font-size: 14px;
  margin: 0 5px;
`;

export const Owner = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;

  margin: 10px 5px;
`;

export const OwnerText = styled.Text`
  color: #999;
  font-size: 14px;
  margin: 0 5px;
`;

export const Location = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;

  margin: 0 5px;
`;

export const LocationText = styled.Text`
  color: #999;
  font-size: 14px;
  margin: 0 5px;
`;

export const SubscriptionButton = styled(Button)`
  margin-top: 5px;
`;
