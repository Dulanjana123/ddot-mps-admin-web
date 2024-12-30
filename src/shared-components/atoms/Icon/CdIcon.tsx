import { IconImage } from "@enums/IconType";

interface CdIconProps {
  name: IconImage | string;
  className?: string;
  alt?: string;
}

const CdIcon: React.FC<CdIconProps> = ({ name, className, alt }) => {
  return (
    <img
      alt={alt ?? name}
      src={`/public/assets/images/svg/icons/${name}.svg`}
      className={`${className} bi bi-info-circle`}
    />
  );
};

export default CdIcon;
