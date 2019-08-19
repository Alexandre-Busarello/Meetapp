import styled from 'styled-components';

export const Container = styled.div`
  label {
    cursor: pointer;
    display: flex;
    margin-bottom: 20px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    height: 250px;
    background-color: #18141d;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        margin-top: 10px !important;
        color: #5e5c62 !important;
        font-size: 18px;
      }
    }

    img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }

    input {
      display: none;
    }
  }
`;
