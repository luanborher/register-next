import React from 'react';
import ReactLoading from 'react-loading';
import { ModalContainer } from './styles';

const Loading = () => (
  <ModalContainer>
    <ReactLoading type="spin" color="#8CD630" height="20px" width="20px" />
  </ModalContainer>
);

export default Loading;
