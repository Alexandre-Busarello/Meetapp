import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const LoadingContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  padding: 30px 0;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const PreviousDay = styled.TouchableOpacity`
  border: 0;
`;

export const DateText = styled.Text`
  color: #fff;
  font-size: 24px;
  margin: 0 15px;
  font-weight: bold;
`;

export const NextDay = styled.TouchableOpacity`
  border: 0;
`;
