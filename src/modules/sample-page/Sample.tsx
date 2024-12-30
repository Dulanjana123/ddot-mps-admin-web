import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import CdCard from "@atoms/Card/CdCard";
import {
  CdAutoCompleteInput,
  CdBadge,
  CdButton,
  CdContainer,
  CdDatePicker,
  CdFaIcon,
  CdModal,
  CdSelectInput,
  CdTextInput,
  CdTypography,
} from "@atoms/index";
import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import CardHeaderCommon from "@common-elements/CardHeaderCommon/CardHeaderCommon";
import { samplePageData } from "@data/other-page/other-page";
import { SoftVariant, Variant } from "@enums/components/CommonEnum";
import { HelperTextType } from "@enums/components/HelperText";
import { FormWizardNav } from "@interfaces/components/formWizard";
import {
  CdHelperText,
  CdIconButton,
  CdPopoverWithContent,
  CdSearchBox,
  InfoCardV2,
} from "@molecules/index";
import InfoCard from "@molecules/InfoCard/InfoCard";
import CdTimePicker from "@molecules/TimePicker/CdTimePicker";
import { CdBreadcrumbNav, CdFormWizard } from "@organisms/index";
import { Fragment, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import the trash icon
import { CardBody, Col, Row } from "reactstrap";
import { P } from "../../AbstractElements";
import { IconPlacement } from "@enums/components/ButtonEnum";

interface UserData {
  name: string;
  email: string;
  role: string;
}

const sampleInfoCardData: UserData[] = [
  {
    name: "Fitz Gerald",
    email: "fitz@codice.com",
    role: "Manager",
  },
  {
    name: "Joe Golberg",
    email: "joe@codice.com",
    role: "Director",
  },
  {
    name: "Clara Mackensy",
    email: "clara@codice.com",
    role: "Engineer",
  },
];

export default function SamplePage() {
  const [fromTime, setFromTime] = useState("12:00 AM");
  const [toTime, setToTime] = useState("12:00 PM");

  const [startDate, setStartDate] = useState<Date>();

  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [timeBlocks, setTimeBlocks] = useState<string[]>([
    "9:00 AM - 10:00 AM",
    "11:00 AM - 11:30 AM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:30 PM",
  ]);

  const addTimeBlock = () => {
    if (fromTime && toTime) {
      setTimeBlocks([...timeBlocks, `${fromTime} - ${toTime}`]);
    }
  };

  const removeTimeBlock = (index: number) => {
    const updatedTimeBlocks = timeBlocks.filter((_, i) => i !== index);
    setTimeBlocks(updatedTimeBlocks);
  };

  const addProductNav: FormWizardNav[] = [
    {
      id: 1,
      icon: ["fas", "user"],
      title: "Step 01",
      detail: "Select SWO Type",
      content: <h1>Step 1</h1>,
    },
    {
      id: 2,
      icon: ["fas", "user"],
      title: "Step 02",
      detail: "Add SWO Details",
      content: <h2>Step 2</h2>,
    },
  ];

  const infoContent1 = ({ name, email }: UserData) => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div>
          <CdTypography>{name}</CdTypography>
          <CdTypography>{email}</CdTypography>
        </div>
        <div className="d-flex gap-3">
          <CdButton outline onClick={() => alert(`Assign ${name}`)}>
            Assign
          </CdButton>
          <CdButton outline onClick={() => alert(`Delete ${name}`)}>
            <CdFaIcon icon={["fas", "trash-can"]} />
          </CdButton>
        </div>
      </div>
    );
  };

  const infoContent2 = ({ name, email, role }: UserData) => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div>
          <CdTypography>{name}</CdTypography>
          <CdTypography>{email}</CdTypography>
        </div>
        <div className="d-flex gap-4">
          <div className="text-end">
            <CdTypography>Role</CdTypography>
            <CdTypography>{role}</CdTypography>
          </div>
          <CdButton outline onClick={() => alert(`Remove ${name}`)}>
            Remove
          </CdButton>
        </div>
      </div>
    );
  };

  return (
    <div className="page-body">
      <Fragment>
        <Breadcrumbs mainTitle={"SamplePage"} parent={"Pages"} />
        <CdContainer fluid>
          <CdRow>
            <CdCol sm="12">
              <CdCard>
                <CardHeaderCommon title={"SampleCards"} span={samplePageData} />
                <CardBody>
                  <P>
                    Sample-page is a generic term used to refer to a basic,
                    placeholder, or example page that developers or designers
                    use as a starting point for building or testing a website or
                    application. It is not an official or standard term but
                    rather a descriptive name commonly used in web development
                    and design contexts. A sample page typically contains basic
                    elements like headings, paragraphs, images, buttons, and
                    links. It may also include placeholder text or images to
                    represent content that will be replaced with actual content
                    in the final version.
                  </P>
                  <div className="my-4 bg-white rounded-2 shadow-sm mt-4">
                    <div className="d-flex align-items-center gap-3 ">
                      <CdTimePicker
                        id="from-time"
                        value={fromTime}
                        onChange={setFromTime}
                      />
                      <span>to</span>
                      <CdTimePicker
                        id="to-time"
                        value={toTime}
                        onChange={setToTime}
                      />
                      <CdButton
                        type="submit"
                        text="Add Time"
                        id="save-button"
                        className="add-time-button btn btn-primary"
                        onClick={addTimeBlock}
                      >
                        Add Time
                      </CdButton>
                    </div>
                  </div>

                  <CdRow className="mt-3">
                    <CdCol>
                      <CdPopoverWithContent
                        popoverTitle="Popover Title"
                        popoverContent="Popover Content"
                        placement="bottom"
                      >
                        <CdHelperText
                          id={"helper-text"}
                          body="Hi there! You can display some information here."
                          type={HelperTextType.Info}
                        />
                      </CdPopoverWithContent>
                    </CdCol>
                  </CdRow>
                  <CdRow className="mt-3">
                    <CdCol>
                      <CdTextInput
                        id={"text-input"}
                        label="Text Input"
                        onChange={() => {}}
                        placeHolder="This is a placeholder"
                      />
                    </CdCol>
                  </CdRow>
                  <CdRow className="mt-3">
                    <CdCol>
                      <CdSelectInput
                        id={"select-input"}
                        label="Select Input"
                        onSelect={() => {}}
                        options={[
                          { key: "1", value: "Option 1" },
                          { key: "2", value: "Option 2" },
                          { key: "3", value: "Option 3" },
                        ]}
                      />
                    </CdCol>
                  </CdRow>
                  <CdRow className="mt-3">
                    <h2>Suggestive Search</h2>
                  </CdRow>
                  <CdRow className="mt-3">
                    <CdCol>
                      <CdAutoCompleteInput
                        options={[
                          { key: "1", value: "option1" },
                          { key: "2", value: "option2" },
                        ]}
                        label="Location"
                        placeholder="Search location"
                        inputValue={searchText}
                        onInputChange={(_event, newValue) =>
                          setSearchText(newValue)
                        }
                      />
                    </CdCol>
                  </CdRow>
                  <CdRow className="mt-3">
                    <h2>Breadcrumbs</h2>
                  </CdRow>
                  <CdRow className="mt-3">
                    <CdCol>
                      <CdBreadcrumbNav items={["Home", "Library", "Data"]} />
                    </CdCol>
                  </CdRow>
                  <CdRow className="mt-3">
                    <h2>Popup</h2>
                  </CdRow>
                  <CdRow className="mt-3">
                    <CdCol>
                      <CdButton
                        id={"modal-button-id"}
                        text="Open Modal"
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      />
                      <CdModal
                        id={"modal-id"}
                        title="Modal Title"
                        body="Modal Body"
                        isOpen={isModalOpen}
                        toggle={() => {
                          setIsModalOpen(false);
                        }}
                        // fullscreen
                        showFooter={false}
                      />
                    </CdCol>
                  </CdRow>
                  <CdRow className="mt-3">
                    <h2>Badges</h2>
                    <CdCol>
                      <CdBadge
                        id="badge"
                        text={"CdBadge"}
                        className="py-2 px-4"
                        color={Variant.danger}
                      />
                      <CdBadge
                        id="badge"
                        text={"CdBadge"}
                        className="py-2 px-4 ms-2"
                        color={SoftVariant.Info}
                      />
                      <CdBadge
                        id="badge"
                        text={"CdBadge"}
                        className="py-2 px-4 ms-2"
                        color={SoftVariant.Secondary}
                      />
                      <CdBadge
                        id="badge"
                        text={"CdBadge"}
                        className="py-2 px-4 ms-2"
                        color={SoftVariant.Success}
                      />
                      <CdBadge
                        id="badge"
                        text={"CdBadge"}
                        className="py-2 px-4 ms-2"
                        color={SoftVariant.Warning}
                      />
                    </CdCol>
                  </CdRow>
                  <CdRow className="mt-3">
                    <h2>Font Awesome Icon</h2>
                    <Col>
                      <CdFaIcon icon={["fas", "bell"]} />
                    </Col>
                  </CdRow>
                  <CdRow className="mt-3">
                    <h2>Button with Icon</h2>
                    <Col>
                      <CdIconButton
                        icon={["fas", "bell"]}
                        text={"Filter"}
                        iconSide={IconPlacement.Left}
                        color={Variant.danger}
                      />
                    </Col>
                  </CdRow>
                  <CdRow className="mt-3">
                    <h2>Search Box</h2>
                    <CdSearchBox
                      id="search-box"
                      onChange={() => {}}
                      label="Search Box"
                      placeHolder="Placeholder Text"
                    />
                  </CdRow>
                  <CdRow className="mt-3">
                    <h2>Date Picker</h2>
                    <CdDatePicker
                      id="date-picker"
                      placeholderText="From"
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                    />
                  </CdRow>
                  {/* Timeblock List */}
                  <div className="mt-4">
                    {timeBlocks.map((timeBlock, index) => (
                      <InfoCard
                        key={index}
                        indicatorColorWidth="30px"
                        indicatorColor="#d8e2f3"
                        onClick={() => removeTimeBlock(index)}
                        buttonContent={
                          <div className="d-flex align-items-center gap-2">
                            <FaTrash />
                          </div>
                        }
                      >
                        Time Block : {timeBlock}
                      </InfoCard>
                    ))}
                  </div>
                  <Row className="mt-4">
                    <Col>
                      <h2>Form Wizard</h2>
                      <CdFormWizard tabData={addProductNav} />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <CdContainer fluid>
                      <CdTypography className="h4">
                        Info Card Story 1
                      </CdTypography>
                      <CdRow>
                        <CdCol
                          xs={12}
                          md={6}
                          className="d-flex flex-column gap-2"
                        >
                          {sampleInfoCardData.map((data, index) => (
                            <InfoCardV2
                              key={index}
                              stripColor="#aed6f1"
                              content={infoContent1(data)}
                            />
                          ))}
                        </CdCol>
                      </CdRow>
                      <CdTypography className="h4 mt-3">
                        Info Card Story 2
                      </CdTypography>
                      <CdRow>
                        <CdCol
                          xs={12}
                          md={6}
                          className="d-flex flex-column gap-2"
                        >
                          {sampleInfoCardData.map((data, index) => (
                            <InfoCardV2
                              key={index}
                              stripColor="#3498db"
                              contentBgColor="#d6eaf8"
                              content={infoContent1(data)}
                            />
                          ))}
                        </CdCol>
                      </CdRow>
                      <CdTypography className="h4 mt-3">
                        Info Card Story 3
                      </CdTypography>
                      <CdRow>
                        <CdCol
                          xs={12}
                          md={6}
                          className="d-flex flex-column gap-2"
                        >
                          {sampleInfoCardData.map((data, index) => (
                            <InfoCardV2
                              key={index}
                              content={infoContent2(data)}
                            />
                          ))}
                        </CdCol>
                      </CdRow>
                    </CdContainer>
                  </Row>
                </CardBody>
              </CdCard>
            </CdCol>
          </CdRow>
        </CdContainer>
      </Fragment>
    </div>
  );
}
