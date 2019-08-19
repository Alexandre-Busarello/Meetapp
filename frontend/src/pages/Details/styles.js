import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 930px;
  margin: 50px auto;
  padding-bottom: 50px;

  header {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
    }

    strong {
      color: #fff;
      font-size: 28px;
      margin: 0 15px;
    }
  }
`;

export const Content = styled.div`
  p {
    color: #fff;
    font-size: 16px;
    margin: 0 15px;
  }

  div {
    display: flex;
    flex-direction: row;
    margin-top: 25px;

    svg {
      margin-right: 5px;
    }

    span {
      display: flex;
      align-content: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
      margin: 0 15px;
    }
  }
`;

export const CustomButton = styled.button`
  display: flex;
  align-content: center;
  align-items: center;

  margin-right: 15px;

  svg {
    margin-right: 8px;
    margin-left: 6px;
  }

  border: 0;
  background: ${props => (props.blue ? '#4dbaf9' : '#f94d6a')};
  border-radius: 4px;
  color: #fff;
  font-size: 16px;

  padding: 10px;
  padding-right: 20px;

  &:hover {
    background: ${props => darken(0.04, props.blue ? '#4dbaf9' : '#f94d6a')};
    cursor: pointer;
  }
`;

export const Banner = styled.div`
  height: 250px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin: 40px 15px 15px 15px;
  background-color: #18141d;

  img {
    border-radius: 4px;
    width: 100%;
    height: 100%;
  }

  span {
    color: #5e5c62;
    font-size: 18px;
  }
`;
