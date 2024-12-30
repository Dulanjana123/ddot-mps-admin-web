import React from 'react';
import { FormGroup, Label, Input, InputProps } from 'reactstrap';

interface CdToggleSwitchProps extends InputProps  {
    label?: string;
    disabled?: boolean;
};

const CdToggleSwitch: React.FC<CdToggleSwitchProps> = ({ label, disabled=false, ...props }) => {
    return (
        <div className="cd-toggle-switch" style={{ display: 'flex', alignItems: 'center' }}>
            <FormGroup switch>
                <Input type="switch" {...props} disabled={disabled} />
                {label && <Label check style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>{label}</Label>}
            </FormGroup>
        </div>
    );
};

export default CdToggleSwitch;
