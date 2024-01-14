/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';

import { Input, Label, Wrapper } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
}

const InputDate = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...rest }, ref) => (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}

      <Input type="date" id={id} {...rest} ref={ref} />
    </Wrapper>
  ),
);

export default InputDate;
