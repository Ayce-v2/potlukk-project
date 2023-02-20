import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container1 = styled.div`
  background-color: #F5DEB3;
  height: 200px;
  width: 100%;
`;

const Container2 = styled.div`
  background-color: #ADD8E6;
  height: 200px;
  width: 100%;
`;

const Container3 = styled.div`
  background-color: #87CEFA;
  height: 200px;
  width: 100%;
`;

const ColumnContainers = () => {
  return (
    <Container>
      <Container1 />
      <Container2 />
      <Container3 />
    </Container>
  );
};

export default ColumnContainers;
