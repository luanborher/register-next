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
  image: { image: string; type: string } | undefined;
  imageList: { image: string; type: string }[];
  client: Records;
  setImage: Dispatch<
    SetStateAction<{ image: string; type: string } | undefined>
  >;
}

const ModalImage = ({ image, imageList, client, setImage }: ModalProps) => {
  const [file, setFile] = useState<File>();

  if (!image || image?.image === '') return;

  const normalizeUrl = (value: string) => {
    return value.includes('https') ? value : `${baseURL}files/${value}`;
  };

  const onClose = () => setImage({ image: '', type: '' });

  const onUpdateImage = async (url: string, type: string) => {
    try {
      await api.put(`/client/${client.id}`, {
        ...client,
        property: {
          ...client.property,
          ...(type === 'first' && { first_document_url: url }),
          ...(type === 'second' && { second_document_url: url }),
          ...(type === 'facade' && { facade_url: url }),
          ...(type === 'additional' && { additional_url: url }),
        },
      });

      handleSuccess('Imagem alterada com sucesso!');
      setFile(undefined);
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const register_id = client.property.id;
      const photo_name = file.name;
      const url = await uploadPhoto(file, register_id, photo_name);

      setImage({ image: normalizeUrl(url), type: image.type });
      onUpdateImage(url, image.type);
    }
  };

  return (
    <>
      <ModalContainer>
        <ImageWrapper>
          <ThumbnailsWrapper>
            <ThumbnailsWrapper>
              {imageList
                .filter(image => image.image && image.image !== '')
                .map(item => (
                  <Thumbnails
                    src={normalizeUrl(item.image)}
                    alt={item.type}
                    onClick={() =>
                      setImage({
                        image: normalizeUrl(item.image),
                        type: item.type,
                      })
                    }
                  />
                ))}
            </ThumbnailsWrapper>
          </ThumbnailsWrapper>

          <Image src={image.image} alt={image.type} />

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
