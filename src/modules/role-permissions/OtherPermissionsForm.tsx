import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import {
  InterfaceUIDto,
  PermissionUIDto,
} from "@interfaces/request/module-interface-permission-dto";

interface OtherPermissionsFormProps {
  interfaces: InterfaceUIDto[];
  onPermissionChange: (moduleInterfacePermissionIds: number[]) => void;
  initialPermissions: number[];
}

const OtherPermissionsForm: React.FC<OtherPermissionsFormProps> = ({
  interfaces: initialInterfaces,
  initialPermissions,
  onPermissionChange,
}) => {
  const [selectedInterface, setSelectedInterface] = useState<number | null>(
    null
  );
  const [permissions, setPermissions] = useState<PermissionUIDto[]>([]);
  const [selectedPermissions, setSelectedPermissions] =
    useState<number[]>(initialPermissions);
  const [interfaces, setInterfaces] =
    useState<InterfaceUIDto[]>(initialInterfaces);
  useEffect(() => {
    onPermissionChange(selectedPermissions);
  }, [selectedPermissions, onPermissionChange]);

  useEffect(() => {
    if (selectedInterface !== null) {
      const selectedIntf = initialInterfaces.find(
        (intf) => intf.interfaceId === selectedInterface
      );
      setPermissions(selectedIntf ? selectedIntf.permissions : []);
    }
  }, [selectedInterface, initialInterfaces]);
  useEffect(() => {
    setInterfaces(initialInterfaces);
  }, [initialInterfaces]);
  const handleCheckboxChange = (permissionId: number) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permissionId)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  const handleInterfaceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedInterface(selectedId);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <label htmlFor="interfaceDropdown" className="me-3">
            User Interface
          </label>
          <select
            id="interfaceDropdown"
            className="form-select"
            onChange={handleInterfaceSelect}
            value={selectedInterface || ""}
          >
            <option value="" disabled>
              Select
            </option>
            {initialInterfaces.map((intf) => (
              <option key={intf.interfaceId} value={intf.interfaceId}>
                {intf.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      {selectedInterface !== null && (
        <Container fluid>
          <Row className="mt-3">
            {permissions.length > 0 ? (
              permissions.map((permission) => (
                <Col
                  xs={6}
                  key={permission.moduleInterfacePermissionId}
                  className="mb-3"
                >
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(
                      permission.moduleInterfacePermissionId
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        permission.moduleInterfacePermissionId
                      )
                    }
                  />
                  <label
                    htmlFor={`checkbox-${permission.moduleInterfacePermissionId}`}
                    className="ms-2"
                  >
                    {permission.name || "Unnamed Permission"}
                  </label>
                </Col>
              ))
            ) : (
              <Container xs={12}>
                <div>No permissions available</div>
              </Container>
            )}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default OtherPermissionsForm;
