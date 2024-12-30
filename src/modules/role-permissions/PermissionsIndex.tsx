import { CdActionPopover, CdButton, CdTextInput } from "@atoms/index";
import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import CdDataGrid from "@organisms/DataGrid/CdDataGrid";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { GridColDef, GridInitialState } from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { rolePermissionsService } from "@services/api/role-permissions-service";
import { roleDataGridActions } from "@data/datagrid-data/action-data";
import { Link } from "react-router-dom";

const initialState: GridInitialState = {
    pagination: { paginationModel: { pageSize: 5 } },
};

const columns: GridColDef<any>[] = [
    {
        field: 'userRoleId',
        headerName: 'User Role ID',
        flex: 1,
        editable: false,
    },
    {
        field: 'userRoleDescription',
        headerName: 'User Role Description',
        flex: 1,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        editable: false,
        filterable: false,
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 100,
        filterable: false,
        editable: false,
        renderCell: (params) => {
            return (
                <CdActionPopover
                    itemId={params.row.id}
                    actions={roleDataGridActions}
                />
            );
        }
    },
];

const PermissionsIndex = () => {

    const [rows, setRows] = useState<any[]>([]);
    const [rowCount, setRowCount] = useState(0);

    const [paginationParams, setPaginationParams] = useState({
        page: 0,
        pageSize: 10,
    });
    const [filters, setFilters] = useState<{
        userRoleCode: string | null,
        userRoleDescription: string | null,
    }>({
        userRoleCode: null,
        userRoleDescription: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            const request: any = {
                pagingAndSortingInfo: {
                    paging: {
                        pageNo: paginationParams.page + 1,
                        pageSize: paginationParams.pageSize,
                    },
                },
                filters: {
                    userRoleId: filters.userRoleCode,
                    userRoleDescription: filters.userRoleDescription,
                },
            }

            await rolePermissionsService.getRolePermissionsPaginated(request)
                .then((response: any) => {
                    const roleList: any = response?.data?.entities || [];
                    setRowCount(response?.data?.pagination?.length || 0);
                    setRows(roleList.map((role: any) => {
                        return {
                            id: role.roleId,
                            userRoleId: role.code,
                            userRoleDescription: role.description,
                            status: role.isActive ? 'Active' : 'Inactive',
                            action: 'Action',
                        };
                    }));
                });
        }

        fetchData();

    }, [paginationParams, filters]);

    const onFilterChange = (filterOptions: any) => {
        let userRoleCodeTxt = '';
        let userRoleDescriptionTxt = '';

        filterOptions.items.forEach((item: any) => {
            if (item.field === 'userRoleId') userRoleCodeTxt = item.value;
            if (item.field === 'userRoleDescription') userRoleDescriptionTxt = item.value;
        })

        setFilters({
            userRoleCode: userRoleCodeTxt,
            userRoleDescription: userRoleDescriptionTxt,
        });
    };

    return (
        <div className="page-body">
            <Breadcrumbs
                mainTitle={
                    "Permission Role Index"
                }
                parent="Permissions"
            />
            <Container fluid>
                <Card>
                    <CardBody>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Link to="/permissions/add">
                                    <CdButton
                                        id="add-permission"
                                        text="New"
                                        color="primary"
                                    />
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end mt-3">
                                <CdDataGrid
                                    rows={rows}
                                    setRows={setRows}
                                    columns={columns}
                                    getRowId={(row: any) => row?.id}
                                    headerFilters={true}
                                    filterMode={ProcessingMode.Server}
                                    onFilterChange={(filter) => onFilterChange(filter)}
                                    paginationModel={paginationParams}
                                    paginationMode={ProcessingMode.Server}
                                    onPaginationModelChange={(pagination) => setPaginationParams(pagination)}
                                    pageSizeOptions={[10, 25, 100]}
                                    initialState={initialState}
                                    headerFilterMenu={null}
                                    rowCount={rowCount}
                                    rowReordering={true}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
};

export default PermissionsIndex;
