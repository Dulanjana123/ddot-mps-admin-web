import CdInputLabel from "@atoms/Label/CdInputLabel";
import SVG from "@common-elements/SVG";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { InputSizes } from "@enums/components/InputEnum";
import { Href } from "@utils/Constant";
import { Link } from "react-router-dom";
import { FormFeedback, FormGroup } from "reactstrap";
import { H6 } from "src/AbstractElements";

interface CdDropzoneProps {
  id: string;
  size?: InputSizes;
  files: ExtFile[];
  onChange: (files: ExtFile[]) => void;
  header?: boolean;
  footer?: boolean;
  minHeight?: string;
  accept?: string;
  note?: string;
  label?: string;
  feedback?: string;
  invalid?: boolean;
  required?: boolean;
  readonly?: boolean;
}

const CdDropzone: React.FC<CdDropzoneProps> = ({
  id,
  size = InputSizes.sm,
  files,
  onChange,
  header = false,
  footer = false,
  minHeight = "80px",
  note,
  label,
  feedback,
  required,
  invalid,
  readonly = false,
  ...props
}) => {
  const removeFile = (id: string | number | undefined) => {
    onChange(files.filter((x: ExtFile) => x.id !== id));
  };

  return (
    <FormGroup className="form-group">
      {label && (
        <CdInputLabel
          labelText={label}
          size={size}
          required={required}
          id={id}
        />
      )}
      <Dropzone
        className={`${invalid ? "is-invalid" : ""}`}
        onChange={onChange}
        value={files}
        header={header}
        footer={footer}
        minHeight={minHeight}
        name="fileName"
        readOnly={readonly}
        {...props}
      >
        {files.map((file: ExtFile) => (
          <FileMosaic
            key={file.id}
            {...file}
            onDelete={removeFile}
            info={true}
          />
        ))}
        {files?.length === 0 && (
          <div className="dz-message needsclick mt-5">
            <SVG iconId="file-upload1" />
            <H6>
              Drag your file here, or{" "}
              <Link className="txt-primary" to={Href}>
                browse
              </Link>
            </H6>
            <span className="note needsclick">{note}</span>
          </div>
        )}
      </Dropzone>
      {invalid && <FormFeedback className="d-block">{feedback}</FormFeedback>}
    </FormGroup>
  );
};

export default CdDropzone;
