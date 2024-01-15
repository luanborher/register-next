/* eslint-disable operator-linebreak */
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import { Filtered, RecordsFilter } from '@/interfaces/Records';

import Select from '../Select/Select';
import InputText from '../Input/Input';
import InputDate from '../InputDate/Input';

import { Button, LabelButton } from './styles';

interface SearchProps {
  register: UseFormRegister<RecordsFilter>;
  onSubmit: () => void;
  filtered: Filtered;
  setValue: UseFormSetValue<RecordsFilter>;
  watch: UseFormWatch<RecordsFilter>;
}

const Search = ({
  register,
  onSubmit,
  filtered,
  setValue,
  watch,
}: SearchProps) => (
  <div className="flex flex-col w-full mt-8">
    <div className="w-full flex flex-row gap-4">
      <Select
        id="contract_id"
        placeholder="Contrato"
        onChange={e => {
          setValue('contract_id', e?.value || '');
          setValue('community_id', '');
          setValue('street_id', '');
        }}
        options={[
          ...(filtered?.contracts?.map(contract => ({
            value: contract.id,
            label: contract.name,
          })) || []),
        ]}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />

      <Select
        id="community_id"
        placeholder="Comunidade"
        value={{
          value: watch('community_id') || '',
          label:
            filtered?.communities?.find(
              item => item.id === watch('community_id'),
            )?.name || 'Selecione uma comunidade',
        }}
        isDisabled={
          watch('contract_id') === '' || watch('contract_id') === undefined
        }
        onChange={e => {
          setValue('community_id', e?.value || '');
          setValue('street_id', '');
        }}
        options={[
          ...((watch('contract_id') &&
            filtered?.communities
              ?.filter(item => item.contract_id === watch('contract_id'))
              .map(contract => ({
                value: contract.id,
                label: contract.name,
              }))) ||
            []),
        ]}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />

      <Select
        id="street_id"
        placeholder="Rua"
        value={{
          value: watch('street_id') || '',
          label:
            filtered?.streets?.find(item => item.id === watch('street_id'))
              ?.name || 'Selecione uma rua',
        }}
        isDisabled={
          watch('community_id') === '' ||
          watch('contract_id') === '' ||
          watch('community_id') === undefined ||
          watch('contract_id') === undefined
        }
        onChange={e => {
          setValue('street_id', e?.value || '');
        }}
        options={[
          ...((watch('community_id') &&
            filtered?.streets
              ?.filter(item => item.community_id === watch('community_id'))
              .map(contract => ({
                value: contract.id,
                label: contract.name,
              }))) ||
            []),
        ]}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />

      <InputText
        placeholder="Número"
        {...register('number')}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />
    </div>

    <div className="flex flex-row gap-4 w-full mt-4 mb-4">
      <Select
        id="situation"
        placeholder="Situação"
        onChange={e => {
          setValue('situation', e?.value || '');
        }}
        defaultValue={{ value: 'NORMAL', label: 'Normal' }}
        options={[
          { value: 'AUSENTE', label: 'Ausente' },
          { value: 'VAGO', label: 'Vago' },
          { value: 'NORMAL', label: 'Normal' },
        ]}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />

      <Select
        id="status"
        placeholder="Status"
        onChange={e => {
          setValue('status', e?.value || '');
        }}
        defaultValue={{ value: 'IN_REVIEW', label: 'Auditoria' }}
        options={[
          { value: 'IN_REVIEW', label: 'Auditoria' },
          { value: 'VALIDATED', label: 'Validado' },
          { value: 'REJECTED', label: 'Rejeitado' },
        ]}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />

      <InputText
        placeholder="Buscar por nome"
        {...register('name')}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />

      <InputDate
        placeholder="Data de cadastro"
        {...register('date')}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />

      <Button onClick={onSubmit}>
        <LabelButton>Buscar</LabelButton>
      </Button>
    </div>
  </div>
);

export default Search;
