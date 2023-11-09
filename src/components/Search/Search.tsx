import { UseFormRegister } from 'react-hook-form';

import Select from '../Select/Select';
import InputText from '../Input/Input';

import { RecordsFilter } from '@/interfaces/Records';

import { LabelButton } from './styles';

interface SearchProps {
  register: UseFormRegister<RecordsFilter>;
  onSubmit: () => void;
}

const Search = ({ register, onSubmit }: SearchProps) => {
  return (
    <div className="flex flex-col w-full mt-8">
      <div className="w-full flex flex-row gap-2">
        <Select options={[{value: '', label: 'Selecione um contrato'}]} placeholder='Contrato' />
        
        <Select options={[{value: '', label: 'Selecione um contrato'}]} placeholder='Comunidade' />

        <Select options={[{value: '', label: 'Selecione um contrato'}]} placeholder='Rua' />

        <InputText placeholder='Número' />
      </div>

      <div className="flex flex-row gap-4 w-full mt-4 mb-4">
        <Select 
        options={[
          {value: 'IN_REVIEW', label: 'Em revisão'},
          {value: 'VALIDATED', label: 'Validado'},
          {value: 'REJEITED', label: 'Rejeitado'},
        ]}
         placeholder='Status'
          />

        <InputText placeholder='Buscar por nome' {...register('name')} />       

        <button 
          className="flex items-center justify-center w-[350px] h-[45px] px-2 gap-2 py-2 text-white bg-primary rounded-md hover:bg-opacity-80"
          onClick={onSubmit}
        >
          <LabelButton>
            Buscar
          </LabelButton>
        </button>
      </div>
    </div>
  );
};

export default Search;
