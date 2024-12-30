type CdDividerProps = {
  className?: string;
};

const CdDivider: React.FC<CdDividerProps> = ({ className }) => {
  return <hr className={`divider txt-white ${className}`} />;
};

export default CdDivider;
