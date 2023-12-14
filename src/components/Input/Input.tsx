/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';

import { Input, Label, Wrapper } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
}

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...rest }, ref) => (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}

      <Input id={id} {...rest} ref={ref} />
    </Wrapper>
  ),
);

export default InputText;
