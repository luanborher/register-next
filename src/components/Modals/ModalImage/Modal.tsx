import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaX, FaFileImport } from 'react-icons/fa6';

import api, { baseURL } from '@/services/api';

import { BookOpenCheck } from 'lucide-react';
import { uploadPhoto } from '@/hooks/useImage';
import { Records } from '@/interfaces/Records';
import { handleError, handleSuccess } from '@/utils/message';
import {
  Image,
  ModalContainer,
  ThumbnailsWrapper,
  ImageWrapper,
  Thumbnails,
  CloseButton,
  UploadButton,
  ButtonsWrapper,
  ActionWrapper,
  Button,
  ImportWrapper,
} from './styles';

interface ModalProps {
  image: string;
  imageList: string[];
  client: Records;
  setImage: Dispatch<SetStateAction<string>>;
}

const ModalImage = ({ image, imageList, client, setImage }: ModalProps) => {
  const [file, setFile] = useState<File>();

  if (image === '') return;

  const normalizeUrl = (value: string) => {
    return value.includes('https') ? value : `${baseURL}files/${value}`;
  };

  const onClose = () => setImage('');

  // const onUpdateImage = async (url: string) => {
  //   try {
  //     await api.put(`/client/${client.id}`, {
  //       ...client,
  //       property: {
  //         ...client.property,
  //         second_document_url: url,
  //       },
  //     });

  //     handleSuccess('Imagem alterada com sucesso!');
  //     setFile(undefined);
  //     onClose();
  //   } catch (error: any) {
  //     handleError(error);
  //   }
  // };

  const handleUpload = async () => {
    if (file) {
      const register_id = client.property.id;
      const photo_name = file.name;
      const url = await uploadPhoto(file, register_id, photo_name);

      setImage(normalizeUrl(url));
      // onUpdateImage(url);
    }
  };

  return (
    <>
      <ModalContainer>
        <ImageWrapper>
          <ThumbnailsWrapper>
            <ThumbnailsWrapper>
              {imageList
                .filter(image => image && image !== '')
                .map(item => (
                  <Thumbnails
                    src={normalizeUrl(item)}
                    alt="images"
                    onClick={() => setImage(normalizeUrl(item))}
                  />
                ))}
            </ThumbnailsWrapper>
          </ThumbnailsWrapper>

          <Image src={image} />

          <ButtonsWrapper>
            <UploadButton>
              <FaFileImport />
              Alterar
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  setFile(e?.target?.files?.[0]);
                  e.target.value = '';
                }}
              />
            </UploadButton>

            <CloseButton onClick={onClose}>
              <FaX />
              Fechar
            </CloseButton>
          </ButtonsWrapper>
        </ImageWrapper>
      </ModalContainer>

      {file && (
        <ModalContainer>
          <ImportWrapper>
            <BookOpenCheck size={90} color="white" />

            <div>{file?.name || 'Arquivo selecionado'}</div>

            <ActionWrapper>
              <Button cancel onClick={() => setFile(undefined)}>
                Cancelar
              </Button>
              <Button onClick={handleUpload}>Alterar</Button>
            </ActionWrapper>
          </ImportWrapper>
        </ModalContainer>
      )}
    </>
  );
};

export default ModalImage;
