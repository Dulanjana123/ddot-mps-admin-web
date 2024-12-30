import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import CdTextInput from "@atoms/Input/Text/CdTextInput";
import { DateFormat } from "@enums/date-format-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DetailWorkRequestProps } from "@interfaces/components/ewr-props";
import { formatDate } from "@utils/helper/format-date";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const useInitForm = () => {
  const emergencyFormSchema = z.object({
    emergencyRequestNumber: z
      .string()
      .min(1, "Emergency Request Number is required"),
    lossOfVitalService: z.boolean(),
    typeOfEmergency: z.string().min(1, "Type of Emergency is required"),
    causeOfEmergency: z.string().min(1, "Cause of Emergency is required"),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    endDate: z
      .string()
      .min(1, "End date is required")
      .refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    ewrStatus: z.string().min(1, "EWR Status is required"),
    inspectionStatus: z.string().min(1, "Inspection Status is required"),
    internalUtilityTrackingNumber: z
      .string()
      .min(1, "Internal Utility Tracking Number is required"),
    trafficControlPlan: z.string().optional(),
    problemInDetail: z.string().optional(),
  });

  const defaultValues = {
    emergencyRequestNumber: "",
    lossOfVitalService: false,
    typeOfEmergency: "",
    causeOfEmergency: "",
    startDate: "",
    endDate: "",
    ewrStatus: "",
    inspectionStatus: "",
    internalUtilityTrackingNumber: "",
    trafficControlPlan: "",
    problemInDetail: "",
  };

  const { control, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(emergencyFormSchema),
  });

  return {
    control,
    setValue,
  };
};

const EmergencyWorkRequestInformation: React.FC<DetailWorkRequestProps> = ({
  data,
}) => {
  const { control, setValue } = useInitForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (data) {
      setValue("emergencyRequestNumber", data.requestNumber);
      setValue("lossOfVitalService", data?.isCondition ?? false);
      setValue("typeOfEmergency", data.emergencyType);
      setValue("causeOfEmergency", data.emergencyCause);
      setValue(
        "startDate",
        data.effectiveDate
          ? formatDate(data.effectiveDate, DateFormat.MM_DD_YYYY_HH_mm_ss)
          : ""
      );
      setValue(
        "endDate",
        data.expirationDate
          ? formatDate(data.expirationDate, DateFormat.MM_DD_YYYY_HH_mm_ss)
          : ""
      );
      setValue("ewrStatus", data.status);
      setValue("inspectionStatus", data.inspectionStatus);
      setValue(
        "internalUtilityTrackingNumber",
        data.internalUtilityTrackingNumber
      );
      setValue("trafficControlPlan", data.trafficControlPlan);
      setValue("problemInDetail", data.problemDetails);
    }
  };

  return (
    <>
      <form>
        <CdRow>
          <CdCol md="6">
            <Controller
              name="emergencyRequestNumber"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="emergencyRequestNumber"
                  label="Emergency Request Number"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />
            <Controller
              name="lossOfVitalService"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="lossOfVitalService"
                  label="Loss of Vital Service / Immediate Safety Hazard?"
                  value={field.value ? "Yes" : "No"}
                  onChange={(e) => field.onChange(e.target.checked)}
                  readonly={true}
                />
              )}
            />

            <Controller
              name="typeOfEmergency"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="typeOfEmergency"
                  label="Type of Emergency"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />

            <Controller
              name="causeOfEmergency"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="causeOfEmergency"
                  label="Cause of Emergency"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />

            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="startDate"
                  label="Start Date"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="endDate"
                  label="End Date"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />

            <Controller
              name="ewrStatus"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="ewrStatus"
                  label="EWR Status"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                  style={{ backgroundColor: "#f39c12" }}
                />
              )}
            />

            <Controller
              name="inspectionStatus"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="inspectionStatus"
                  label="Inspection Status"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />

            <Controller
              name="internalUtilityTrackingNumber"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="internalUtilityTrackingNumber"
                  label="Internal Utility Tracking Number"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />

            <Controller
              name="trafficControlPlan"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="trafficControlPlan"
                  label="Traffic Control Plan"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />

            <Controller
              name="problemInDetail"
              control={control}
              render={({ field }) => (
                <CdTextInput
                  id="problemInDetail"
                  label="Problem in Detail"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  readonly={true}
                />
              )}
            />
          </CdCol>
        </CdRow>
      </form>
    </>
  );
};

export default EmergencyWorkRequestInformation;
