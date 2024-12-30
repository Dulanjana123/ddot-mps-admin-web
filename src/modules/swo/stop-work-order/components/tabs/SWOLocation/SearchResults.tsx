import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdCheckboxInput } from "@atoms/index";
import CdTypography from "@atoms/Typography/CdTypography";
import CdDataTable from "@organisms/Table/CdDataTable";
import React from "react";

// dummy data will be replace with actual data when the backend is ready
const TabelHeaders = [
  "Select",
  "Tacking Number",
  "Permit Number",
  "EWR Number",
  "Address",
  "Permittee Name",
  "Owner Name",
];

const checkBox = <CdCheckboxInput id={"row-select"} onChange={() => {}} />;

const TabelData = [
  [
    checkBox,
    "TN123456",
    "PN789101",
    "EWR001",
    "123 Main St, Cityville, CA",
    "John Doe",
    "Jane Smith",
  ],
  [
    checkBox,
    "TN234567",
    "PN890112",
    "EWR002",
    "456 Elm St, Townsville, TX",
    "Alice Johnson",
    "Bob Brown",
  ],
  [
    checkBox,
    "TN345678",
    "PN901123",
    "EWR003",
    "789 Pine St, Metropolis, NY",
    "Charlie Davis",
    "Emily White",
  ],
  [
    checkBox,
    "TN456789",
    "PN012134",
    "EWR004",
    "101 Maple St, Smalltown, FL",
    "Daniel Wilson",
    "Sarah Green",
  ],
  [
    checkBox,
    "TN567890",
    "PN123145",
    "EWR005",
    "202 Oak St, Riverside, WA",
    "Ella Moore",
    "George King",
  ],
];

const SearchResults: React.FC = () => {
  return (
    <>
      <CdRow className="mt-4">
        <CdCol xs={12}>
          <CdTypography className="h5">Search Results</CdTypography>
          <span className="mb-4">
            (When a location is selected on map, all active permits in that
            visinity will be populated here.)
          </span>
        </CdCol>
        <CdCol>
          <CdDataTable
            headers={TabelHeaders}
            data={TabelData}
            bordered
            responsive
            small
          />
        </CdCol>
      </CdRow>
      <hr className="mt-5 mb-3" />
    </>
  );
};

export default SearchResults;
