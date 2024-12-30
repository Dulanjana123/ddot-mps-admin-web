import CdInputLabel from '@atoms/Label/CdInputLabel';
import CdSpinner from '@atoms/Spinner/CdSpinner';
import { Variant } from '@enums/components/CommonEnum';
import { SpinnerSizes } from '@enums/components/SpinnerEnum';
import { KeyValue } from '@interfaces/shared/common.interface';
import Autocomplete from '@mui/joy/Autocomplete';
import { AutocompleteProps } from '@mui/joy/Autocomplete/AutocompleteProps';
import FormControl from '@mui/material/FormControl/FormControl';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';

interface AutocompleteInputProps
  extends Omit<AutocompleteProps<KeyValue<number | string, string> | string, false, false, true>, 'options'> {
  options: KeyValue<number | string, string>[];
  loading?: boolean;
  label?: string;
  invalid?: boolean;
  feedback?: string;
}

const CdAutoCompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  loading,
  label,
  invalid = false,
  feedback,
  ...props
}) => {
  return (
    <>
      <FormControl className="form-group" error={invalid}>
        {label && <CdInputLabel id='' labelText={label} />}
        <Autocomplete
          options={options}
          freeSolo
          error={invalid}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.value)}
          endDecorator={loading && <CdSpinner color={Variant.primary} size={SpinnerSizes.sm} />}
          {...props}
        />
        {invalid && <FormHelperText>{feedback}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default CdAutoCompleteInput;
