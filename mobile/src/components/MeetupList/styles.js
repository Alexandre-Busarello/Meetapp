import styled from 'styled-components/native';

export const MeetupFlatList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const MeetupsNotFound = styled.View`
  margin: 0 30px;
`;

export const NotFoundText = styled.Text`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;
