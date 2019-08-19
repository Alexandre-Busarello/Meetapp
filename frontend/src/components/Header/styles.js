import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #000000;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 84px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 32px;
      width: 32px;

      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;

      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
  }

  button {
    width: 71px;
    background: #d44059;
    border: 0;
    border-radius: 4px;
    color: #fff;

    &:hover {
      background: ${darken(0.03, '#F94D6A')};
    }
  }
`;
