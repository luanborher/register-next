import React from 'react';

import { baseURL } from '@/services/api';

import {
  Image,
  SignatureText,
  SignatureWrapper,
  NotSignatureText,
} from './styles';

interface ModalProps {
  image: string | undefined;
}

const Signature = ({ image }: ModalProps) => {
  const normalizeUrl = (value: string) => {
    return value.includes('https') ? value : `${baseURL}files/${value}`;
  };

  return image && image !== '' ? (
    <>
      <SignatureText>Assinatura</SignatureText>

      <SignatureWrapper>
        <Image src={normalizeUrl(image)} alt="image" />
      </SignatureWrapper>
    </>
  ) : (
    <NotSignatureText>Sem assinatura cadastrada</NotSignatureText>
  );
};

export default Signature;
