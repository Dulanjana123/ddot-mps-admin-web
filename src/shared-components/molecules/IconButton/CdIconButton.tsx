import CdButton, { CdButtonProps } from '@atoms/Button/CdButton';
import { CdContainer, CdFaIcon, CdTypography } from '@atoms/index';
import { IconPlacement } from '@enums/components/ButtonEnum';
import { AlignItems, JustifyContent } from '@enums/components/Container';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

interface CdIconButtonProps extends CdButtonProps {
  icon: [IconPrefix, IconName];
  text: string;
  iconSide?: IconPlacement;
}

const CdIconButton: React.FC<CdIconButtonProps> = ({ icon, text, iconSide = IconPlacement.Right, ...props }) => {
  const btnContent =
    iconSide == IconPlacement.Right ? (
      <CdContainer flex alignItems={AlignItems.center} justifyContent={JustifyContent.center} gap="0.5rem">
        <CdTypography>{text}</CdTypography>
        <CdFaIcon icon={icon} />
      </CdContainer>
    ) : (
      <CdContainer flex alignItems={AlignItems.center} gap="0.5rem">
        <CdFaIcon icon={icon} />
        <CdTypography>{text}</CdTypography>
      </CdContainer>
    );

  return <CdButton {...props}>{btnContent}</CdButton>;
};

export default CdIconButton;
