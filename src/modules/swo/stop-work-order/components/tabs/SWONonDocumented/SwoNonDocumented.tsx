import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import CdCard from "@atoms/Card/CdCard";
import {
  CdAutocompleteTextInput,
  CdButton,
  CdInputLabel,
  CdTextInput,
} from "@atoms/index";
import CdTypography from "@atoms/Typography/CdTypography";
import {
  contractorDetails,
  contractorListData,
  getContractorIdByValue,
} from "@data/swo/contractor-data";
import { ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import { InputSizes } from "@enums/components/InputEnum";
import { ToastVariant } from "@enums/components/snackbar-enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { CdLoadingButton } from "@molecules/index";
import { setSWOData } from "@store/reducers/mps/swoWizardSlice";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormGroup } from "reactstrap";
import { z } from "zod";
import SWOLocation from "../SWOLocation/SWOLocation";

const useInitForm = () => {
  const violatorSchema = z.object({
    contractorName: z.string().min(1, "Contractor Name is required."),
    ownerFirstName: z.string().optional(),
    ownerLastName: z.string().optional(),
    contractorRegisteredNumber: z.string().optional(),
    contractorRegisteredAddress: z.string().optional(),
  });

  type ViolatorFormFields = z.infer<typeof violatorSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<ViolatorFormFields>({
    defaultValues: {
      contractorName: "",
      ownerFirstName: "",
      ownerLastName: "",
      contractorRegisteredNumber: "",
      contractorRegisteredAddress: "",
    },
    resolver: zodResolver(violatorSchema),
  });

  return { control, handleSubmit, errors, isSubmitting, setValue, reset };
};

const SWONonDocumented: React.FC = () => {
  const { swoData } = useAppSelector((state) => state.swoWizard);
  const dispatch = useAppDispatch();

  const { control, handleSubmit, isSubmitting, reset, setValue, errors } =
    useInitForm();

  useEffect(() => {
    reset({
      contractorName: swoData?.contractorName || "",
      ownerFirstName: swoData?.ownerFirstName || "",
      ownerLastName: swoData?.ownerLastName || "",
      contractorRegisteredNumber: swoData?.contractorRegisteredNumber || "",
      contractorRegisteredAddress: swoData?.contractorRegisteredAddress || "",
    });
  }, []);

  const handleContractorChange = (contractorValue: string) => {
    const contractorId = getContractorIdByValue(contractorValue);
    const details = contractorDetails[contractorId];
    if (details) {
      setValue("ownerFirstName", details.ownerFirstName);
      setValue("ownerLastName", details.ownerLastName);
      setValue(
        "contractorRegisteredNumber",
        details.contractorRegisteredNumber
      );
      setValue(
        "contractorRegisteredAddress",
        details.contractorRegisteredAddress
      );
    } else if (contractorValue.trim() === "") {
      reset();
    }
  };

  const handleViolatorDetailsSubmit = (violatorDetails: any) => {
    dispatch(
      setSWOData({
        ...swoData,
        // This data taken from dummy values and need to fetch from the DB after user management, Role module implemented
        contractorId: getContractorIdByValue(violatorDetails.contractorName),
        contractorName: violatorDetails.contractorName,
        contractorRegisteredAddress:
          violatorDetails.contractorRegisteredAddress,
        contractorRegisteredNumber: violatorDetails.contractorRegisteredNumber,
        ownerFirstName: violatorDetails.ownerFirstName,
        ownerLastName: violatorDetails.ownerLastName,
      })
    );
    enqueueSnackbar("Violator Details Entered Successfully.", {
      variant: ToastVariant.Success,
    });
  };

  return (
    <div className="sidebar-body m-10">
      <CdCard className="border border-primary p-3 mt-3">
        <form onSubmit={handleSubmit(handleViolatorDetailsSubmit)}>
          <CdTypography className="h5 mb-3 mt-">
            Enter Details of the Violator
          </CdTypography>
          <CdRow>
            <CdCol sm={12} md={4}>
              <Controller
                name="contractorName"
                control={control}
                render={({ field }) => (
                  <FormGroup className="form-group">
                    <CdInputLabel
                      labelText="Contractor Name"
                      size={InputSizes.sm}
                      id="name-lbl"
                    />

                    {/* This component should be modified to pass an object with key-pair values like id, name etc.
                        Currently expecting only and string array
                      */}
                    <CdAutocompleteTextInput
                      id="searchInput"
                      sx={{ width: "auto" }}
                      type="search"
                      freeSolo
                      value={field.value}
                      defaultValue={field.value}
                      disableClearable
                      options={contractorListData.map(
                        (item: any) => item.value
                      )}
                      onInputChange={(_event, newInputValue) => {
                        field.onChange(newInputValue);
                        handleContractorChange(newInputValue);
                      }}
                    />
                  </FormGroup>
                )}
              />
            </CdCol>
            <CdCol sm={12} md={4}>
              <Controller
                name="ownerFirstName"
                control={control}
                render={({ field }) => (
                  <CdTextInput
                    id="ownerFirstName"
                    label="Owner First Name"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    invalid={!!errors.ownerFirstName}
                    feedback={errors.ownerFirstName?.message}
                  />
                )}
              />
            </CdCol>
            <CdCol sm={12} md={4}>
              <Controller
                name="ownerLastName"
                control={control}
                render={({ field }) => (
                  <CdTextInput
                    id="ownerLastName"
                    label="Owner Last Name"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    invalid={!!errors.ownerLastName}
                    feedback={errors.ownerLastName?.message}
                  />
                )}
              />
            </CdCol>
            <CdCol sm={12} md={4}>
              <Controller
                name="contractorRegisteredNumber"
                control={control}
                render={({ field }) => (
                  <CdTextInput
                    id="contractorRegisteredNumber"
                    label="Contractor Registered Number"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    invalid={!!errors.contractorRegisteredNumber}
                    feedback={errors.contractorRegisteredNumber?.message}
                  />
                )}
              />
            </CdCol>
            <CdCol sm={12} md={8}>
              <Controller
                name="contractorRegisteredAddress"
                control={control}
                render={({ field }) => (
                  <CdTextInput
                    id="contractorRegisteredAddress"
                    label="Contractor Registered Address"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    invalid={!!errors.contractorRegisteredAddress}
                    feedback={errors.contractorRegisteredAddress?.message}
                  />
                )}
              />
            </CdCol>
            <CdCol xs={12} className="d-flex justify-content-end mt-2">
              <CdButton
                className="me-2"
                type={ButtonTypes.reset}
                onClick={() => {
                  reset();
                }}
              >
                Cancel
              </CdButton>
              <CdLoadingButton
                id="add-violator-btn"
                isLoading={isSubmitting}
                type={ButtonTypes.submit}
                text="Add"
                className="w-auto"
                color={Variant.primary}
              />
            </CdCol>
          </CdRow>
        </form>
      </CdCard>

      <SWOLocation disableResults />
    </div>
  );
};

export default SWONonDocumented;
