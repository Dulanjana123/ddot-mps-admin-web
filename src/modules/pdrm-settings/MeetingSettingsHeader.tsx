import CdRow from "@atoms/Base/CdRow";
import { CdContainer } from "@atoms/index";
import CdTypography from "@atoms/Typography/CdTypography";


const MeetingSettingsHeader: React.FC = () => {
    return (
        <CdContainer>
            <CdRow>
                <CdTypography className="h6">
                    Meeting Settings
                </CdTypography>
                <CdTypography className="p">
                    Define meeting times and teams
                </CdTypography>
            </CdRow>
        </CdContainer>
    );
};

export default MeetingSettingsHeader;
