import { SoftVariant, Variant } from '@enums/components/CommonEnum';
import { Button, ButtonProps } from 'reactstrap';

export interface CdButtonProps extends ButtonProps {
  children?: React.ReactNode;
  borderRadius?: number;
  color?: Variant | SoftVariant | string;
}

const CdButton: React.FC<CdButtonProps> = ({ children, borderRadius = 5, color = Variant.primary, ...props }) => {
  return (
    <Button color={color} style={{ ...props.style, borderRadius: `${borderRadius}px` }} {...props}>
      {children ?? props.text}
    </Button>
  );
};

export default CdButton;
