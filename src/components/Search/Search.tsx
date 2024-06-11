import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { UseFormWatch } from 'react-hook-form';
import { Filtered, RecordsFilter } from '@/interfaces/Records';
import Select from '../Select/Select';
import InputText from '../Input/Input';
import { SearchContainer, SearchContent } from './styles';

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
  <SearchContainer>
    <SearchContent>
      <Select
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
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />

      <Select
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
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />

      <Select
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
        onChange={e => setValue('street_id', e?.value || '')}
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
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />

      <InputText
        placeholder="Número"
        {...register('number')}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />
    </SearchContent>

    <SearchContent>
      <Select
        placeholder="Situação"
        onChange={e => setValue('situation', e?.value || '')}
        options={[
          { value: 'AUSENTE', label: 'Ausente' },
          { value: 'VAGO', label: 'Vago' },
          { value: 'NORMAL', label: 'Normal' },
        ]}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />

      <Select
        placeholder="Status"
        onChange={e => setValue('status', e?.value || '')}
        defaultValue={{ value: 'IN_REVIEW', label: 'Auditoria' }}
        options={[
          { value: 'IN_REVIEW', label: 'Auditoria' },
          { value: 'VALIDATED', label: 'Validado' },
          { value: 'REJECTED', label: 'Rejeitado' },
        ]}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />

      <Select
        placeholder="Filtrar por campo"
        onChange={e => setValue('field', e?.value || '')}
        options={[
          { value: 'FORNECIMENTO_PDE', label: 'Com PDE e fornecimento' },
          { value: 'WITH_HIDRO', label: 'Com hidrômetro' },
          { value: 'WITH_PDE', label: 'Com PDE' },
          { value: 'WITH_FORNECIMENTO', label: 'Com fornecimento' },
        ]}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />

      <InputText
        type="date"
        placeholder="Data de cadastro"
        {...register('date')}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />
    </SearchContent>
  </SearchContainer>
);

export default Search;
