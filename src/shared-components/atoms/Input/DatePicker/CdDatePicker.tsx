import CdFaIcon from "@atoms/FaIcon/CdFaIcon";
import CdInputLabel from "@atoms/Label/CdInputLabel";
import CdTypography from "@atoms/Typography/CdTypography";
import { InputSizes } from "@enums/components/InputEnum";
import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { FormGroup } from "reactstrap";

interface DatePickerProps extends ReactDatePickerProps {
  id: string;
  selected?: Date | null;
  onChange: (args: any) => void;
  placeholderText?: string;
  className?: string;
  showIcon?: boolean;
  label?: string;
  size?: InputSizes;
}

const CdDatePicker: React.FC<DatePickerProps> = ({
  id,
  selected,
  className,
  showIcon = true,
  onChange,
  label,
  size = InputSizes.sm,
  placeholderText = "",
  ...props
}) => {
  return (
    <FormGroup className="form-group d-flex flex-column">
      {label && <CdInputLabel labelText={label} size={size} id={id} />}
      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        placeholderText={placeholderText}
        className={`form-control ps-5 ${className}`}
        showIcon={showIcon}
        icon={
          <CdTypography className="mx-1">
            <CdFaIcon icon={["fas", "calendar-days"]} />
          </CdTypography>
        }
        {...props}
      />
    </FormGroup>
  );
};

export default CdDatePicker;
