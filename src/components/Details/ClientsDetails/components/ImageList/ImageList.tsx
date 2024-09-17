import React, { Dispatch, SetStateAction } from 'react';

import { baseURL } from '@/services/api';

import { Image } from './styles';

interface ModalProps {
  imageList: { image: string; type: string }[];
  setImage: Dispatch<
    SetStateAction<{ image: string; type: string } | undefined>
  >;
}

const ImageList = ({ imageList, setImage }: ModalProps) => {
  const normalizeUrl = (value: string) => {
    return value.includes('https') ? value : `${baseURL}files/${value}`;
  };

  const openImage = (url: string, type: string) => {
    setImage({ image: normalizeUrl(url), type });
  };

  return imageList
    .filter(image => image.image && image.image !== '')
    .map(image => (
      <Image
        src={normalizeUrl(image.image)}
        alt="image"
        onClick={() => openImage(image.image, image.type)}
      />
    ));
};

export default ImageList;
