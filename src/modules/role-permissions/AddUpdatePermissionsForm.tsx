import {
  CdCheckboxInput,
  CdContainer,
  CdInputLabel,
  CdSelectInput,
  CdTextInput,
} from "@atoms/index";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import translatedFormValidation from "@hooks/useTranslatedFormValidation";
import CdAccordion from "@molecules/Accordion/CdAccordion";
import { CdLoadingButton } from "@molecules/index";
import CdTabs from "@molecules/Tabs/CdTabs/CdTabsV2";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { z } from "zod";
import OtherPermissionsForm from "./OtherPermissionsForm";
import { rolePermissionsService } from "@services/api/role-permissions-service";
import { UserGroupDto } from "@interfaces/request/user-role-dto";
import RolePermissionTable from "./PermissionsTable";
import {
  ModuleUIDto,
  RoleDetailsWithPermissionsDto,
} from "@interfaces/request/module-interface-permission-dto";

type ReviewerAgencyFormProps = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  buttonText?: string;
};

const initForm = () => {
  const permissionsSchema = z.object({
    moduleId: z.string(),
    code: z.string(),
    name: z.string(),
    description: z.string(),
    sortId: z.string(),
    isActive: z.string(),
  });
  const createRolePermissionsSchema = z.object({
    code: z.string(),
    description: z
      .string()
      .min(1, "Role description is required")
      .max(30, "Maximum character length exceeded"),
    userGroupId: z.string().min(1, "Permission group is required"),
    isActive: z.boolean(),
    permissions: z.array(permissionsSchema),
  });

  type FormFields = z.infer<typeof createRolePermissionsSchema>;

  const initialValues = {
    code: "",
    description: "",
    userGroupId: "",
    isActive: true,
    permissions: [],
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormFields>({
    defaultValues: initialValues,
    resolver: zodResolver(createRolePermissionsSchema),
  });

  return { control, handleSubmit, errors, isSubmitting, setValue };
};

const AddUpdatePermissionsForm: React.FC<ReviewerAgencyFormProps> = ({
  onSubmit,
  isLoading,
  buttonText,
}) => {
  const { control, handleSubmit, isSubmitting, errors, setValue } = initForm();
  const [userGroups, setUserGroups] = useState<UserGroupDto[] | []>([]);
  const [code, setCode] = useState("");
  const [modulePermissions, setModulePermissions] = useState<ModuleUIDto[]>([]);
  const tablePermissionsStateRef = useRef<{ [key: number]: number[] }>({});
  const otherPermissionsStateRef = useRef<{ [key: number]: number[] }>({});

  const handleTablePermissionChange = (
    moduleId: number,
    selectedPermissions: number[]
  ) => {
    tablePermissionsStateRef.current[moduleId] = selectedPermissions;
    console.log(
      `Updated Table permissions for module ${moduleId}:`,
      selectedPermissions
    );
  };

  const handleOtherPermissionChange = (
    moduleId: number,
    selectedPermissions: number[]
  ) => {
    otherPermissionsStateRef.current[moduleId] = selectedPermissions;
    console.log(
      `Updated Other (non-CRUD) permissions for module ${moduleId}:`,
      selectedPermissions
    );
  };

  const handleFormSubmit = async (data: any) => {
    isLoading = true;
    try {
      const allTablePermissions = Object.values(
        tablePermissionsStateRef.current
      ).flat();
      const allOtherPermissions = Object.values(
        otherPermissionsStateRef.current
      ).flat();

      const allSelectedPermissions = Array.from(
        new Set([...allTablePermissions, ...allOtherPermissions])
      );

      const request: RoleDetailsWithPermissionsDto = {
        ...data,
        permissions: allSelectedPermissions,
      };

      const response = await rolePermissionsService.createRolePermissions(
        request
      );

      if (response.success) {
        isLoading = false;
        retrieveNextRoleCode();
        tablePermissionsStateRef.current = {};
        otherPermissionsStateRef.current = {};
      }
    } catch (error) {
      isLoading = false;
      //add toaster error message
    } finally {
      isLoading = false;
    }
  };

  const retrieveUserGroups = async () => {
    const userGroupsRes = await rolePermissionsService.getUserGroups();
    if (userGroupsRes.success) setUserGroups(userGroupsRes.data);
  };
  const retrieveNextRoleCode = async () => {
    const roleCodeRes = await rolePermissionsService.getNextRoleCode();
    if (roleCodeRes.success) {
      setCode(roleCodeRes.data);
    }
  };
  const retrieveModulePermissions = async () => {
    const modulePermissionsRes =
      await rolePermissionsService.getModulePermissions();
    if (modulePermissionsRes.success)
      setModulePermissions(modulePermissionsRes.data ?? []);
  };

  useEffect(() => {
    retrieveUserGroups();
    retrieveNextRoleCode();
    retrieveModulePermissions();
  }, []);

  useEffect(() => {
    if (code) {
      setValue("code", code);
    }
  }, [code, setValue]);

  const [activeTab, setActiveTab] = useState(1);
  const changeActiveTab = (tab: number) => {
    setActiveTab(tab);
  };

  const accordionList = [
    {
      id: "1",
      icon: true,
      accordionHeaderClass: "bg-light-primary",
      accordionHeading: "Shared Permissions",
      spanClass: "txt-primary",
      body: (
        <RolePermissionTable
          interfaces={
            modulePermissions
              .find((mo) => mo.moduleId === activeTab)
              ?.interfaces.filter(
                (intf) =>
                  intf.permissions.filter((perm) => perm.isCrud === true)
                    .length > 0
              )
              .map((intf) => ({
                ...intf,
                permissions: intf.permissions.filter(
                  (perm) => perm.isCrud === true
                ),
              })) ?? []
          }
          onPermissionChange={(selectedPermissions) =>
            handleTablePermissionChange(
              modulePermissions.find((mo) => mo.moduleId === activeTab)
                ?.moduleId || 0,
              selectedPermissions
            )
          }
          initialPermissions={
            tablePermissionsStateRef.current[
              modulePermissions.find((mo) => mo.moduleId === activeTab)
                ?.moduleId || 0
            ] || []
          }
        />
      ),
    },
    {
      id: "2",
      icon: true,
      accordionHeaderClass: "bg-light-primary",
      accordionHeading: "Other Permissions",
      spanClass: "txt-primary",
      body: (
        <OtherPermissionsForm
          interfaces={
            modulePermissions
              .find((mo) => mo.moduleId === activeTab)
              ?.interfaces.filter((intf) =>
                intf.permissions.some((perm) => !perm.isCrud)
              )
              .map((intf) => ({
                ...intf,
                permissions: intf.permissions.filter((perm) => !perm.isCrud),
              })) ?? []
          }
          onPermissionChange={(selectedPermissions) =>
            handleOtherPermissionChange(
              modulePermissions.find((mo) => mo.moduleId === activeTab)
                ?.moduleId || 0,
              selectedPermissions
            )
          }
          initialPermissions={
            tablePermissionsStateRef.current[
              modulePermissions.find((mo) => mo.moduleId === activeTab)
                ?.moduleId || 0
            ] || []
          }
        />
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Row className="d-flex align-items-baseline">
        <Col xs={12} md={6}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <CdTextInput
                id="code"
                label="User Role ID"
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.code}
                feedback={translatedFormValidation(errors.code?.message)}
                disabled
                value={code}
              />
            )}
          />
        </Col>
        <Col xs={12} md={6}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CdTextInput
                id="description"
                label="User Role Description"
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.description}
                feedback={translatedFormValidation(errors.description?.message)}
              />
            )}
          />
        </Col>
        <Col xs={12} md={6}>
          <Controller
            name="userGroupId"
            control={control}
            render={({ field }) => (
              <CdSelectInput
                options={userGroups.map((ug: UserGroupDto) => ({
                  key: ug.userGroupId.toString(),
                  value: ug.name,
                }))}
                onSelect={(e) => field.onChange(e.target.value)}
                label="User Group"
                invalid={!!errors.userGroupId}
                feedback={errors.userGroupId?.message}
                required
                id={"userGroupId"}
                placeHolder={""}
              />
            )}
          />
        </Col>
        <Col xs={12} md={6}>
          <CdContainer
            className="p-0"
            flex
            justifyContent={JustifyContent.start}
            flexDirection={FlexDirection.row}
          >
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <CdCheckboxInput
                  id="inactive"
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <CdInputLabel
              style={{ marginLeft: "5px" }}
              id="isActive"
              labelText="Active"
            />
          </CdContainer>
        </Col>
      </Row>

      <Row>
        <CdTabs
          content={
            <Row>
              <CdAccordion accordionList={accordionList} />
            </Row>
          }
          tabs={modulePermissions?.map((mo) => ({
            key: mo.moduleId,
            code: mo.code,
            title: mo.name,
          }))}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        />
      </Row>

      {buttonText && (
        <CdContainer
          flex
          alignItems={AlignItems.baseline}
          justifyContent={JustifyContent.end}
          flexDirection={FlexDirection.row}
        >
          <CdLoadingButton
            isLoading={isSubmitting || isLoading}
            text={buttonText}
            size={ButtonSizes.md}
            type={ButtonTypes.submit}
            disabled={isSubmitting || isLoading}
            id={"save-button"}
          />
        </CdContainer>
      )}
    </form>
  );
};

export default AddUpdatePermissionsForm;
