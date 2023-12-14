import ReactSelect from 'react-select';
import { Control, UseControllerProps, useController } from 'react-hook-form';

import { Wrapper, Label } from './styles';

interface Option {
  value: string | boolean;
  label: string;
}

interface SelectProps extends UseControllerProps<any> {
  placeholder?: string;
  label?: string;
  id?: string;
  name: string;
  options: Option[];
  control: Control<any>;
  defaultValue?: any;
}

const Dropdown = ({
  label,
  id,
  name,
  options,
  placeholder,
  control,
  defaultValue,
  ...rest
}: SelectProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control: control as Control<any>,
    name,
    defaultValue,
  });
  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <ReactSelect
        id={id}
        name={name}
        options={options}
        placeholder={placeholder}
        value={options.find(option => option.value === value)}
        onChange={onChange}
        isClearable
        noOptionsMessage={() => 'Nenhum resultado encontrado'}
        styles={{
          control: (prev, { isFocused }) => ({
            ...prev,
            borderRadius: '8px',
            borderWidth: '2px',
            borderColor: isFocused ? '#e4e4e4' : '#e4e4e4',
            padding: '0.23rem 1rem',
            color: '#818181',
          }),
          indicatorSeparator: prev => ({
            ...prev,
            display: 'none',
          }),
          placeholder: prev => ({
            ...prev,
            color: '#BBBBBB',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }),
          menuList: prev => ({
            ...prev,
            overflowX: 'hidden',
          }),
          menu: prev => ({
            ...prev,
            border: '2px solid #e4e4e4',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            color: '#818181',
          }),
          option: (prev, { isSelected }) => ({
            ...prev,
            backgroundColor: isSelected ? 'transparent' : 'transparent',
            color: '#818181',
          }),
          singleValue: prev => ({
            ...prev,
          }),
          noOptionsMessage: prev => ({
            ...prev,
            fontSize: '0.875rem',
          }),
          valueContainer: prev => ({
            ...prev,
            padding: '0',
            whiteSpace: 'nowrap',
            overflow: 'ellipsis',
          }),
          input: prev => ({
            ...prev,
          }),
        }}
        {...rest}
      />
      <span>{error?.message}</span>
    </Wrapper>
  );
};

export default Dropdown;
