import React, { useEffect } from "react";
import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import CdBaseMap from "@atoms/Map/CdBaseMap";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CdTextInput } from "@atoms/index";
import { DetailWorkRequestProps } from "@interfaces/components/ewr-props";
import { Coordinate } from "@interfaces/components/map-data";

const useInitForm = () => {
  const locationFormSchema = z.object({
    addressType: z.string(),
    locationCategory: z.string(),
    location: z.string(),
    quadrant: z.string(),
    ward: z.string(),
    lot: z.string(),
    square: z.string(),
    rushHourRestrictions: z.string(),
    isPSNeed: z.string(),
  });

  const defaultValues = {
    addressType: "",
    locationCategory: "",
    location: "",
    quadrant: "",
    ward: "",
    lot: "",
    square: "",
    rushHourRestrictions: "",
    isPSNeed: "",
  };

  const { control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(locationFormSchema),
  });

  return {
    control,
    setValue,
  };
};

const LocationInformation: React.FC<DetailWorkRequestProps> = ({ data }) => {
  const { control, setValue } = useInitForm();

  const setFormValues = () => {
    setValue("addressType", data?.addressType?.toString() ?? "");
    setValue("locationCategory", data?.locationCategory?.toString() ?? "");
    setValue("location", data?.location ?? "");
    setValue("quadrant", data?.quadrant ?? "");
    setValue("ward", data?.ward ?? "");
    setValue("lot", data?.lot ?? "");
    setValue("square", data?.square ?? "");
    setValue(
      "rushHourRestrictions",
      data?.hasRushHourRestriction ? "Yes" : "No"
    );
    setValue("isPSNeed", data?.isPsAddConstructionWork ? "Yes" : "No");
  };

  useEffect(() => {
    setFormValues();
  }, []);

  const mapCoordinates: Coordinate[] =
    data?.xCoord && data?.yCoord
      ? [
          {
            x: Number(data.xCoord),
            y: Number(data.yCoord),
          },
        ]
      : [];

  return (
    <>
      <CdRow className="justify-content-center">
        <CdCol xs={12} md={10}>
          <CdBaseMap coordinates={mapCoordinates} />
        </CdCol>
      </CdRow>
      <CdRow className="mt-4 justify-content-center">
        <CdCol md={10}>
          <form>
            <CdRow>
              <CdCol md={6}>
                <Controller
                  name="addressType"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="addressType"
                      label="Address Type"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
                <Controller
                  name="locationCategory"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="locationCategory"
                      label="Location Category"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="location"
                      label="Location"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
                <Controller
                  name="quadrant"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="quadrant"
                      label="Quadrant"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
                <Controller
                  name="ward"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="ward"
                      label="Ward"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
                <Controller
                  name="lot"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="lot"
                      label="Lot"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
                <Controller
                  name="square"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="square"
                      label="Square"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
                <Controller
                  name="rushHourRestrictions"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="rushHourRestrictions"
                      label="Rush hour restrictions?"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
                <Controller
                  name="isPSNeed"
                  control={control}
                  render={({ field }) => (
                    <CdTextInput
                      id="isPSNeed"
                      label="Is PS need to add construction work?"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      readonly={true}
                    />
                  )}
                />
              </CdCol>
            </CdRow>
          </form>
        </CdCol>
      </CdRow>
    </>
  );
};

export default LocationInformation;
