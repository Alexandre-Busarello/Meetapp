import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 930px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;

    button {
      margin-right: 15px;

      svg {
        margin-right: 8px;
        margin-left: 6px;
      }

      border: 0;
      background: #f94d6a;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;

      display: flex;
      align-content: center;
      align-items: center;

      padding: 10px;
      padding-right: 20px;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
        cursor: pointer;
      }
    }

    strong {
      color: #fff;
      font-size: 34px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
    margin: 30px 15px 0;
  }
`;

export const Meetup = styled.li`
  display: flex;
  padding: 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;

  align-items: center;
  align-content: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;

    span {
      margin-right: 25px;
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;
