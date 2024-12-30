import React, { useEffect, useState, useRef } from "react";
import { InterfaceUIDto } from "@interfaces/request/module-interface-permission-dto";

interface RolePermissionTableProps {
  interfaces: InterfaceUIDto[];
  onPermissionChange: (moduleInterfacePermissionIds: number[]) => void;
  initialPermissions: number[];
}

const RolePermissionTable: React.FC<RolePermissionTableProps> = ({
  interfaces: initialInterfaces,
  onPermissionChange,
  initialPermissions,
}) => {
  const [interfaces, setInterfaces] =
    useState<InterfaceUIDto[]>(initialInterfaces);
  const [selectedPermissions, setSelectedPermissions] =
    useState<number[]>(initialPermissions);

  useEffect(() => {
    setInterfaces(initialInterfaces);
  }, [initialInterfaces]);

  useEffect(() => {
    onPermissionChange(selectedPermissions);
  }, [selectedPermissions, onPermissionChange]);

  const addUniquePermissions = (
    currentPermissions: number[],
    newPermissions: number[]
  ) => {
    return Array.from(new Set([...currentPermissions, ...newPermissions]));
  };

  const removePermissions = (
    currentPermissions: number[],
    permissionsToRemove: number[]
  ) => {
    return currentPermissions.filter(
      (permId) => !permissionsToRemove.includes(permId)
    );
  };

  const handleCheckboxChange = (
    interfaceIndex: number,
    permissionId: number,
    moduleInterfacePermissionId: number
  ) => {
    const updatedInterfaces = interfaces.map((intf, iIndex) =>
      iIndex === interfaceIndex
        ? {
            ...intf,
            permissions: intf.permissions.map((perm) =>
              perm.permissionId === permissionId
                ? { ...perm, isActive: !perm.isActive }
                : perm
            ),
          }
        : intf
    );
    setInterfaces(updatedInterfaces);

    if (selectedPermissions.includes(moduleInterfacePermissionId)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== moduleInterfacePermissionId)
      );
    } else {
      setSelectedPermissions([
        ...selectedPermissions,
        moduleInterfacePermissionId,
      ]);
    }
  };

  const handleRowCheckboxChange = (interfaceIndex: number) => {
    const interfaceToToggle = interfaces[interfaceIndex];
    const selectedInterfacePermissions = interfaceToToggle.permissions.map(
      (perm) => perm.moduleInterfacePermissionId
    );

    const allChecked = selectedInterfacePermissions.every((permId) =>
      selectedPermissions.includes(permId)
    );

    const updatedPermissions = allChecked
      ? removePermissions(selectedPermissions, selectedInterfacePermissions)
      : addUniquePermissions(selectedPermissions, selectedInterfacePermissions);

    setSelectedPermissions(updatedPermissions);
  };

  const handleColumnCheckboxChange = (permissionId: number) => {
    const interfacesWithPermission = interfaces.filter((intf) =>
      intf.permissions.some((perm) => perm.permissionId === permissionId)
    );

    const selectedColumnPermissions = interfacesWithPermission.flatMap((intf) =>
      intf.permissions
        .filter((perm) => perm.permissionId === permissionId)
        .map((perm) => perm.moduleInterfacePermissionId)
    );

    const allChecked = selectedColumnPermissions.every((permId) =>
      selectedPermissions.includes(permId)
    );

    const updatedPermissions = allChecked
      ? removePermissions(selectedPermissions, selectedColumnPermissions)
      : addUniquePermissions(selectedPermissions, selectedColumnPermissions);

    setSelectedPermissions(updatedPermissions);
  };

  const handleSelectAllCheckboxChange = () => {
    const currentTabPermissions = interfaces.flatMap((intf) =>
      intf.permissions.map((perm) => perm.moduleInterfacePermissionId)
    );

    const allChecked = currentTabPermissions.every((permId) =>
      selectedPermissions.includes(permId)
    );

    const updatedPermissions = allChecked
      ? removePermissions(selectedPermissions, currentTabPermissions)
      : addUniquePermissions(selectedPermissions, currentTabPermissions);

    setSelectedPermissions(updatedPermissions);
  };

  const isColumnFullySelected = (permissionId: number) => {
    const interfacesWithPermission = interfaces.filter((intf) =>
      intf.permissions.some((perm) => perm.permissionId === permissionId)
    );

    return interfacesWithPermission.every((intf) =>
      intf.permissions
        .filter((perm) => perm.permissionId === permissionId)
        .every((perm) =>
          selectedPermissions.includes(perm.moduleInterfacePermissionId)
        )
    );
  };

  const isColumnPartiallySelected = (permissionId: number) => {
    const interfacesWithPermission = interfaces.filter((intf) =>
      intf.permissions.some((perm) => perm.permissionId === permissionId)
    );

    const selectedInColumn = interfacesWithPermission.flatMap((intf) =>
      intf.permissions.filter(
        (perm) =>
          perm.permissionId === permissionId &&
          selectedPermissions.includes(perm.moduleInterfacePermissionId)
      )
    );

    return (
      selectedInColumn.length > 0 &&
      selectedInColumn.length < interfacesWithPermission.length
    );
  };

  const isRowPartiallySelected = (interfaceIndex: number) => {
    const interfacePermissions = interfaces[interfaceIndex].permissions.map(
      (perm) => perm.moduleInterfacePermissionId
    );

    const selectedInRow = interfacePermissions.filter((permId) =>
      selectedPermissions.includes(permId)
    );

    return (
      selectedInRow.length > 0 &&
      selectedInRow.length < interfacePermissions.length
    );
  };

  const isAllSelected = () => {
    const allPermissions = interfaces.flatMap((intf) =>
      intf.permissions.map((perm) => perm.moduleInterfacePermissionId)
    );

    return allPermissions.every((permId) =>
      selectedPermissions.includes(permId)
    );
  };

  const isPartiallySelected = () => {
    const allPermissions = interfaces.flatMap((intf) =>
      intf.permissions.map((perm) => perm.moduleInterfacePermissionId)
    );

    const selectedCount = allPermissions.filter((permId) =>
      selectedPermissions.includes(permId)
    ).length;

    return selectedCount > 0 && selectedCount < allPermissions.length;
  };

  const permissionDetails = Array.from(
    new Map(
      interfaces
        .flatMap((intf) => intf.permissions)
        .map((p) => [
          p.permissionId,
          { id: p.permissionId, name: p.name, sortId: p.sortId },
        ])
    ).values()
  ).sort((a, b) => (a.sortId ?? 0) - (b.sortId ?? 0));

  if (
    interfaces.length === 0 ||
    interfaces.every((intf) => intf.permissions.length === 0)
  ) {
    return <div>No data available</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAllCheckboxChange}
                ref={(el) => {
                  if (el) {
                    el.indeterminate = isPartiallySelected();
                  }
                }}
                checked={isAllSelected()}
              />
              <label className="ms-2"> Interface</label>
            </th>
            {permissionDetails.map(({ id, name }) => (
              <th key={id} className="text-nowrap">
                <input
                  type="checkbox"
                  onChange={() => handleColumnCheckboxChange(id)}
                  ref={(el) => {
                    if (el) el.indeterminate = isColumnPartiallySelected(id);
                  }}
                  checked={isColumnFullySelected(id)}
                />
                <label className="ms-2"> {name}</label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {interfaces.map((intf, interfaceIndex) => (
            <tr key={intf.interfaceId}>
              <td className="text-nowrap">
                <input
                  type="checkbox"
                  onChange={() => handleRowCheckboxChange(interfaceIndex)}
                  ref={(el) => {
                    if (el)
                      el.indeterminate = isRowPartiallySelected(interfaceIndex);
                  }}
                  checked={intf.permissions.every((perm) =>
                    selectedPermissions.includes(
                      perm.moduleInterfacePermissionId
                    )
                  )}
                />
                <label className="ms-2"> {intf.name}</label>
              </td>
              {permissionDetails.map(({ id }) => {
                const permission = intf.permissions.find(
                  (p) => p.permissionId === id
                );
                return (
                  <td key={id} className="text-nowrap">
                    {permission ? (
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={selectedPermissions.includes(
                          permission.moduleInterfacePermissionId
                        )}
                        onChange={() =>
                          handleCheckboxChange(
                            interfaceIndex,
                            permission.permissionId,
                            permission.moduleInterfacePermissionId
                          )
                        }
                      />
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolePermissionTable;
