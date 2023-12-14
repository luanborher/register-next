import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { Filtered, RecordsFilter } from '@/interfaces/Records';
import Select from '../Select/Select';
import InputText from '../Input/Input';

import { Button, LabelButton } from './styles';

interface SearchProps {
  register: UseFormRegister<RecordsFilter>;
  onSubmit: () => void;
  filtered: Filtered;
  setValue: UseFormSetValue<RecordsFilter>;
}

const Search = ({ register, onSubmit, filtered, setValue }: SearchProps) => (
  <div className="flex flex-col w-full mt-8">
    <div className="w-full flex flex-row gap-2">
      <Select
        id="contract_id"
        placeholder="Contrato"
        onChange={e => {
          setValue('contract_id', e?.value || '');
        }}
        options={[
          { value: '', label: 'Selecione um contrato' },

          ...(filtered?.contracts?.map(contract => ({
            value: contract.id,
            label: contract.name,
          })) || []),
        ]}
      />

      <Select
        id="community_id"
        placeholder="Comunidade"
        onChange={e => {
          setValue('community_id', e?.value || '');
        }}
        options={[
          { value: '', label: 'Selecione um contrato' },

          ...(filtered?.communities?.map(contract => ({
            value: contract.id,
            label: contract.name,
          })) || []),
        ]}
      />

      <Select
        id="street_id"
        placeholder="Rua"
        onChange={e => {
          setValue('street_id', e?.value || '');
        }}
        options={[
          { value: '', label: 'Selecione um contrato' },

          ...(filtered?.streets?.map(contract => ({
            value: contract.id,
            label: contract.name,
          })) || []),
        ]}
      />

      <InputText placeholder="Número" />
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
      />

      <Select
        defaultValue={{ value: 'IN_REVIEW', label: 'Auditoria' }}
        options={[
          { value: 'IN_REVIEW', label: 'Auditoria' },
          { value: 'VALIDATED', label: 'Validado' },
          { value: 'REJEITED', label: 'Rejeitado' },
        ]}
        placeholder="Status"
      />

      <InputText placeholder="Buscar por nome" {...register('name')} />

      <Button onClick={onSubmit}>
        <LabelButton>Buscar</LabelButton>
      </Button>
    </div>
  </div>
);

export default Search;
