import { CdInputGroup, CdTextInput } from "@atoms/index";
import { TextInputProps } from "@atoms/Input/Text/CdTextInput";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

interface CdTextboxAndSelectGroupProps {
    textInputProps: TextInputProps;
    selectInputProps: Omit<SelectInputProps, 'label'>;
};

const CdTextboxAndSelectGroup: React.FC<CdTextboxAndSelectGroupProps> = ({ textInputProps, selectInputProps }) => {

    return (
        <div className="text-box-and-select-group">
            <CdInputGroup
                inputComponent={
                    <div className="input-component">
                        <CdTextInput
                            {...textInputProps}
                        />
                    </div>
                }
                selectComponent={
                    <div className="select-component">
                        {/* Need to complete */}
                        {/* <CdSelectInput
                            {...selectInputProps}
                        /> */}
                    </div>
                }
            />
        </div>
    );

};

export default CdTextboxAndSelectGroup;
