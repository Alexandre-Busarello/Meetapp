import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 930px;
  margin: 0px auto;
  padding-bottom: 50px;

  form {
    padding-bottom: 50px;

    button {
      display: flex;
      align-items: center;
      align-content: center;
      float: right;

      margin: 5px 0 0;
      height: 44px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2;
      padding: 10px;

      svg {
        margin-right: 10px;
      }

      &:hover {
        background: ${darken(0.09, '#f94d6a')};
      }
    }
  }
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;
    width: 100%;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  textarea {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    margin: 0 0 10px;
    color: #fff;
    padding: 10px 15px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 0 20px;
  }
`;
