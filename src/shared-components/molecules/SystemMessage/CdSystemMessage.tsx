import React from 'react';
import { JustifyContent } from '@enums/components/Container';
import { Variant } from '@enums/components/CommonEnum';
import { SystemMessageTypes } from '@enums/components/SystemMessageEnum';
import { CdButton, CdContainer, CdModal } from '@atoms/index';

type SystemMessageProps = {
  type?: SystemMessageTypes;
  isOpen: boolean;
  toggle: () => void;
  description?: string;
  instruction?: string;
  onClose?: () => void;
};

const CdSystemMessage: React.FC<SystemMessageProps> = ({ type, isOpen, toggle, description, instruction, onClose }) => {
  const className = `system-msg-type-${type === SystemMessageTypes.Error ? 'error' : 'success'}`;

  return (
    <CdModal
      isOpen={isOpen}
      toggle={toggle}
      showFooter={false}
      className="text-center"
      onClose={onClose}
      id={'system-message-modal'}
      body={
        <>
          <span className={`${className} label`}>
            {type === SystemMessageTypes.Error ? 'Error' : type === SystemMessageTypes.Success ? 'Success!' : ''}
          </span>
          <p className={`${className} description`}>{description}</p>
          <p className="instruction">{instruction}</p>
          <CdContainer flex justifyContent={JustifyContent.center}>
            <CdButton
              onClick={toggle}
              outline
              color={Variant.tertiary}
              text={type === SystemMessageTypes.Error ? 'Dismiss' : type === SystemMessageTypes.Success ? 'OK' : ''}
              id="system-message-button"
            />
          </CdContainer>
        </>
      }
    ></CdModal>
  );
};

export default CdSystemMessage;
