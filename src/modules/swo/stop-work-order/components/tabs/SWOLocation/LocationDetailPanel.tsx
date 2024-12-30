import React, { useEffect } from "react";
import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import {
  CdAutocompleteTextInput,
  CdInputLabel,
  CdTextInput,
} from "@atoms/index";
import { ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwoLocationDto } from "@interfaces/request/swo-location-dto";
import { CdLoadingButton } from "@molecules/index";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FormGroup } from "reactstrap";
import { InputSizes } from "@enums/components/InputEnum";
import CdCard from "@atoms/Card/CdCard";
import CdTypography from "@atoms/Typography/CdTypography";

const useSwoLocationInitForm = () => {
  const swoLocationSchema = z.object({
    location: z.string().max(50, "Maximum character length exceeds."),
    quadrant: z.string().max(100, "Maximum character length exceeds."),
    ward: z.string(),
    lot: z.string().max(100, "Maximum character length exceeds."),
    parcel: z.string().max(100, "Maximum character length exceeds."),
    square: z.string().max(100, "Maximum character length exceeds."),
  });

  type FormFields = z.infer<typeof swoLocationSchema>;

  const initialValues: FormFields = {
    location: "",
    quadrant: "",
    ward: "",
    lot: "",
    parcel: "",
    square: "",
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: initialValues,
    resolver: zodResolver(swoLocationSchema),
  });

  return {
    control,
    setValue,
    handleSubmit,
    getValues,
    errors,
    isSubmitting,
    reset,
  };
};

type LocationDetailProps = {
  locationData: SwoLocationDto | null;
  handleChangeLocation: (data: any) => void;
  setAddressSearchText: (text: string) => void;
  locationSuggestions: any[] | null;
  setLocationSuggestions: (data: any[]) => void;
};

const LocationDetailPanel: React.FC<LocationDetailProps> = ({
  locationData,
  handleChangeLocation,
  setAddressSearchText,
  locationSuggestions,
  setLocationSuggestions,
}) => {
  const { control, handleSubmit, setValue, isSubmitting, errors } =
    useSwoLocationInitForm();

  useEffect(() => {
    if (locationData) {
      setValue("location", locationData?.location ?? "");
      setValue("quadrant", locationData?.quadrant ?? "");
      setValue("ward", locationData?.ward ?? "");
      setValue("lot", locationData?.lot ?? "");
      setValue("parcel", locationData?.parcel ?? "");
      setValue("square", locationData?.square ?? "");
    }
  }, [locationData]);

  return (
    <CdCard className="border border-primary p-3 mt-4">
      <form onSubmit={handleSubmit(handleChangeLocation)}>
        <CdRow>
          <CdCol xs={12}>
            <CdTypography className="h5">Location Details</CdTypography>
            <span className="mb-4">
              (This information is auto-populated based on the selected map
              location or can be manually entered in the Address field. Click
              'Change Location' to update.)
            </span>
          </CdCol>
          <CdCol sm={12} md={6} lg={4}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <FormGroup className="form-group">
                  <CdInputLabel
                    labelText="Address (Location)"
                    size={InputSizes.sm}
                    id="address-lbl"
                  />
                  <CdAutocompleteTextInput
                    id="searchInput"
                    sx={{ width: "auto" }}
                    type="search"
                    freeSolo
                    value={field.value}
                    defaultValue={field.value}
                    disableClearable
                    options={
                      locationSuggestions?.map((item: any) => item) ?? []
                    }
                    onInputChange={(_event, newInputValue) => {
                      setAddressSearchText(newInputValue);
                      field.onChange(newInputValue);
                      if (newInputValue.length <= 1) {
                        setLocationSuggestions([]);
                        if (newInputValue.length == 0) {
                          setAddressSearchText("");
                        }
                      }
                    }}
                  />
                </FormGroup>
              )}
            />
          </CdCol>
          <CdCol sm={12} md={6} lg={4}>
            <Controller
              name="quadrant"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id={"quadrant"}
                  value={field.value}
                  label="Quadrant"
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly
                />
              )}
            />
          </CdCol>
          <CdCol sm={12} md={6} lg={4}>
            <Controller
              name="ward"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id={"ward"}
                  value={field.value}
                  label="Ward"
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly
                />
              )}
            />
          </CdCol>
          <CdCol sm={12} md={6} lg={4}>
            <Controller
              name="lot"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id={"lot"}
                  value={field.value}
                  label="Lot"
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly
                />
              )}
            />
          </CdCol>
          <CdCol sm={12} md={6} lg={4}>
            <Controller
              name="parcel"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id={"parcel"}
                  value={field.value}
                  label="Parcel"
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly
                />
              )}
            />
          </CdCol>
          <CdCol sm={12} md={6} lg={4}>
            <Controller
              name="square"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id={"square"}
                  value={field.value}
                  label="Square"
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly
                />
              )}
            />
          </CdCol>

          <CdCol xs={12} className="d-flex justify-content-center mt-2">
            <CdLoadingButton
              id={"change-location-btn"}
              isLoading={isSubmitting}
              type={ButtonTypes.submit}
              text={"Change Location"}
              className="w-auto"
              color={Variant.primary}
            />
          </CdCol>
        </CdRow>
      </form>
    </CdCard>
  );
};

export default LocationDetailPanel;
