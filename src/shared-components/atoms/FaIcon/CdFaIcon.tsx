import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface CdFaIconProps extends FontAwesomeIconProps {
  icon: [IconPrefix, IconName];
}

const CdFaIcon: React.FC<CdFaIconProps> = ({ icon, ...props }) => {
  return <FontAwesomeIcon icon={icon} {...props} />;
};

export default CdFaIcon;
