import styled from 'styled-components/native';

export const MeetupFlatList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const SubsNotFound = styled.View`
  flex: 1;
  margin: 0 30px;
  justify-content: center;
`;

export const NotFoundText = styled.Text`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;
