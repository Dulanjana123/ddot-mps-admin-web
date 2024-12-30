import React from 'react';
import { AlignItems } from '@enums/components/Container';
import { CdContainer, CdErrorIcon } from '@atoms/index';

type ErrSuggestProps = {
  isFulfilled?: boolean;
  text: string;
};

const CdErrorSuggest: React.FC<ErrSuggestProps> = ({ isFulfilled = false, text }) => {
  return (
    <CdContainer flex alignItems={AlignItems.center}>
      <CdErrorIcon isFulfilled={isFulfilled} size={15} />
      <span
        style={{
          fontSize: '90%',
          textWrap: 'pretty',
        }}
      >
        {text}
      </span>
    </CdContainer>
  );
};

export default CdErrorSuggest;
