import React from 'react';
import { InputGroup } from 'reactstrap';

interface InputGroupProps {
  inputComponent: React.ReactNode;
  selectComponent: React.ReactNode;
}

const CdInputGroup: React.FC<InputGroupProps> = ({ inputComponent, selectComponent }) => {
  return (
    <InputGroup>
      {inputComponent}
      {selectComponent}
    </InputGroup>
  );
};

export default CdInputGroup;
