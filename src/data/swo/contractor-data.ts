// this value object is temporary added and will be removed later, after finalize the data to retrieve from DB

import { OptionType } from "@interfaces/components/select";

export const contractorListData: OptionType[] = [
  { key: "1", value: "ABC Contractors" },
  { key: "2", value: "XYZ Builders" },
  { key: "3", value: "LMN Developers" },
  { key: "4", value: "OPQ Enterprises" },
  { key: "5", value: "RST Constructions" },
];

export const getContractorIdByValue = (
  value: string
): string | number => {
  const itemKey = contractorListData.find((option) => option.value === value)?.key ?? "";
  return itemKey;
};

export const contractorDetails = {
  "1": {
    ownerFirstName: "John",
    ownerLastName: "Doe",
    contractorRegisteredNumber: "12345",
    contractorRegisteredAddress: "123 Elm Street",
  },
  "2": {
    ownerFirstName: "Jane",
    ownerLastName: "Smith",
    contractorRegisteredNumber: "67890",
    contractorRegisteredAddress: "456 Oak Avenue",
  },
  "3": {
    ownerFirstName: "Alice",
    ownerLastName: "Johnson",
    contractorRegisteredNumber: "11223",
    contractorRegisteredAddress: "789 Pine Road",
  },
  "4": {
    ownerFirstName: "Bob",
    ownerLastName: "Brown",
    contractorRegisteredNumber: "33445",
    contractorRegisteredAddress: "321 Maple Drive",
  },
  "5": {
    ownerFirstName: "Charlie",
    ownerLastName: "Williams",
    contractorRegisteredNumber: "55667",
    contractorRegisteredAddress: "654 Cedar Lane",
  },
};
