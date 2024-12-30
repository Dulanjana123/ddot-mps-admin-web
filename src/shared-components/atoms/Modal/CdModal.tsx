import CdButton from "@atoms/Button/CdButton";
import { Variant } from "@enums/components/CommonEnum";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "reactstrap";

interface CdModalProps extends ModalProps {
  toggle?: () => void;
  centered?: boolean;
  title?: string;
  body?: React.ReactNode;
  onSubmit?: () => void;
  showFooter?: boolean;
  cancelButtonColor?: Variant;
  submitButtonColor?: Variant;
  cancelButtonText?: string;
  submitButtonText?: string;
  clearDataOnCLose?: boolean;
  onClose?: () => void;
  width?: number;
}

const CdModal: React.FC<CdModalProps> = ({
  toggle,
  centered = true,
  onSubmit,
  showFooter = true,
  clearDataOnCLose = true,
  cancelButtonColor = Variant.primary,
  submitButtonColor = Variant.primary,
  cancelButtonText = "Cancel",
  submitButtonText = "Submit",
  onClose,
  width,
  ...props
}) => {
  return (
    <Modal
      {...props}
      toggle={toggle}
      centered={centered}
      unmountOnClose={clearDataOnCLose}
      onClosed={onClose}
      style={{ width: width ? `${width}rem` : "" }}
    >
      {props.title && (
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          {props.title}
        </ModalHeader>
      )}
      <ModalBody>{props.body}</ModalBody>
      {showFooter && (
        <ModalFooter className="d-flex justify-content-end">
          <CdButton
            id="modal-cancel-button"
            color={cancelButtonColor}
            onClick={toggle}
            className="me-2"
            outline
          >
            {cancelButtonText}
          </CdButton>
          <CdButton
            id="modal-submit-button"
            color={submitButtonColor}
            onClick={onSubmit}
          >
            {submitButtonText}
          </CdButton>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default CdModal;
