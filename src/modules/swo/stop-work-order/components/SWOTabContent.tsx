import CdCol from "@atoms/Base/CdCol";
import { CdTabContent } from "@atoms/Tab/CdTabContent";
import { CdTabPane } from "@atoms/Tab/CdTabPane";
import SWOTypeSelect from "./tabs/SWOType";
import ViolationDetails from "./tabs/ViolationDetails";
import SWOPreview from "./tabs/SWOPreview";
import { useAppSelector } from "@store/hooks";
import SWOLocation from "./tabs/SWOLocation/SWOLocation";
import { SWOType } from "@enums/components/swo";
import SWOPermit from "./tabs/SWOPermit/SwoPermit";
import SWONonDocumented from "./tabs/SWONonDocumented/SwoNonDocumented";

const SWOTabContent = () => {
  const { activeTab, swoData } = useAppSelector((state) => state.swoWizard);

  const SWOPermitSelect = () => {
    switch (swoData?.type) {
      case SWOType.ForLocation:
        return <SWOLocation />;
      case SWOType.ForPermit:
        return <SWOPermit />;
      case SWOType.ForNonDocumentedWOrk:
        return <SWONonDocumented />;
      default:
        return <></>;
    }
  };

  return (
    <CdCol xxl="9" xl="8" className="box-col-8 position-relative pe-lg-5">
      <CdTabContent activeTab={activeTab}>
        <CdTabPane tabId={1}>
          <SWOTypeSelect />
        </CdTabPane>
        <CdTabPane tabId={2}>{<SWOPermitSelect />}</CdTabPane>
        <CdTabPane tabId={3}>
          <ViolationDetails />
        </CdTabPane>
        <CdTabPane tabId={4}>
          <SWOPreview />
        </CdTabPane>
      </CdTabContent>
    </CdCol>
  );
};

export default SWOTabContent;
