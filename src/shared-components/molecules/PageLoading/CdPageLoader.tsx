import { CdContainer, CdSpinner } from '@atoms/index';
import { Variant } from '@enums/components/CommonEnum';
import { JustifyContent, AlignItems } from '@enums/components/Container';
import React from 'react';

const CdPageLoader: React.FC = () => {
  return (
    <CdContainer width="100%" height="100vh" flex justifyContent={JustifyContent.center} alignItems={AlignItems.center}>
      <CdSpinner color={Variant.primary} />
    </CdContainer>
  );
};

export default CdPageLoader;
