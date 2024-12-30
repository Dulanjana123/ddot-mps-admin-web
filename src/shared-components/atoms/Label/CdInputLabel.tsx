import React from 'react';
import { Label, LabelProps } from 'reactstrap';

type CdLabelProps = LabelProps & {
  labelText: string;
};

const CdInputLabel: React.FC<CdLabelProps> = ({ required = false, labelText, ...props }) => {
  return (
    <Label {...props}>
      {required ? <span className="required-indicator">* </span> : null}
      {labelText}
    </Label>
  );
};
export default CdInputLabel;
