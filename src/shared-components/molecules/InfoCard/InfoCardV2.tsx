import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdContainer } from "@atoms/index";

interface InfoCardV2Props {
  stripColor?: string;
  contentBgColor?: string;
  content: React.ReactNode;
  className?: string;
}

const InfoCardV2: React.FC<InfoCardV2Props> = ({
  stripColor,
  contentBgColor = "white",
  content,
  className,
}) => {
  return (
    <>
      <CdContainer
        backgroundColor={stripColor}
        height="auto"
        className={`info-card-container ${className}`}
      >
        <CdRow
          className={`${
            stripColor && "ms-3"
          } d-flex py-1 info-card-container-row`}
          style={{
            backgroundColor: contentBgColor,
            borderRadius: `${stripColor ? "0 8px 8px 0" : "8px"}`,
          }}
        >
          <CdCol className="d-flex flex-column justify-content-center info-card-container-col">
            {content}
          </CdCol>
        </CdRow>
      </CdContainer>
    </>
  );
};

export default InfoCardV2;
