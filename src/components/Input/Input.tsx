/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';

import { Input, Label, Wrapper } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  width?: number;
}

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, width, ...rest }, ref) => (
    <Wrapper style={{ width }}>
      {label && <Label htmlFor={id}>{label}</Label>}

      <Input id={id} {...rest} ref={ref} />
    </Wrapper>
  ),
);

export default InputText;
