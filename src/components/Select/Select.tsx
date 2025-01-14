import ReactSelect, { Props as ReactSelectProps } from 'react-select';

import { Wrapper, Label } from './styles';

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends ReactSelectProps<
    Option,
    false,
    {
      options: Option[];
    }
  > {
  placeholder?: string;
  label?: string;
  id?: string;
  name?: string;
  height?: string;
  width?: string;
  options: Option[];
}

const Select = ({
  label,
  id,
  name,
  options,
  height,
  value,
  width,
  placeholder,
  isClearable = true,
  onChange,
  ...rest
}: SelectProps) => (
  <Wrapper style={{ width }}>
    {label && <Label htmlFor={id}>{label}</Label>}
    <ReactSelect
      id={id}
      name={name}
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isClearable={isClearable}
      noOptionsMessage={() => 'Nenhum resultado encontrado'}
      styles={{
        control: (prev, { isFocused }) => ({
          ...prev,
          borderRadius: '8px',
          borderWidth: '2px',
          borderColor: isFocused ? '#e4e4e4' : '#e4e4e4',
          padding: height ? '0 1rem' : '0.23rem 1rem',
          color: '#818181',
          height,
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
  </Wrapper>
);

export default Select;
