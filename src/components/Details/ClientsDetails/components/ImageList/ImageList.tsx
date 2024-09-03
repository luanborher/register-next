import React, { Dispatch, SetStateAction } from 'react';

import { baseURL } from '@/services/api';

import { Image } from './styles';

interface ModalProps {
  imageList: string[];
  setImage: Dispatch<SetStateAction<string>>;
}

const ImageList = ({ imageList, setImage }: ModalProps) => {
  const normalizeUrl = (value: string) => {
    return value.includes('https') ? value : `${baseURL}files/${value}`;
  };

  const openImage = (url: string) => {
    setImage(normalizeUrl(url));
  };

  return imageList
    .filter(image => image && image !== '')
    .map(image => (
      <Image
        src={normalizeUrl(image)}
        alt="image"
        onClick={() => openImage(image)}
      />
    ));
};

export default ImageList;
