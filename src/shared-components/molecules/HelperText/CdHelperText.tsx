import CdIcon from "@atoms/Icon/CdIcon";
import CdTypography from "@atoms/Typography/CdTypography";
import { HelperTextType } from "@enums/components/HelperText";
import { Col, Row } from "reactstrap";

interface CdHelperTextProps {
  type: HelperTextType;
  id: string;
  body: string;
}

const CdHelperText: React.FC<CdHelperTextProps> = ({ type, id, body }) => {
  return (
    <>
      <Row>
        <Col xs="auto">
          <div id={id}>
            <div className="helper-text">
              <CdTypography className="p">{body}</CdTypography>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CdHelperText;
