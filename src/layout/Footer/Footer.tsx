import { Col, Container, Row } from "reactstrap";
import { P, SVG } from "../../AbstractElements";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="6" className="p-0 footer-copyright">
            <P className="mb-0">Copyright 2024 © CODICE</P>
          </Col>
          <Col md="6" className="p-0">
            <P className="mb-0 heart">MPS v. 1.0.0_build-1</P>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
