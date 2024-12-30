import ActionButton from '@arcgis/core/support/actions/ActionButton';

const panToAction = new ActionButton({
    id: 'pan-to-feature',
    title: 'Pan to',
    icon: 'pan',
});

const addMarkerAction = new ActionButton({
    id: 'add-marker-feature',
    title: 'Add a marker',
    icon: 'pin-tear',
});

const viewAttributeTableAction = new ActionButton({
    id: 'view-attribute-table-feature',
    title: 'View in attribute table',
    icon: 'table',
});

const ValetParkingPopupTemplate = {
    title: 'Valet Parking Permits',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'Status',
                    label: 'STATUS',
                },
                {
                    fieldName: 'OwnerName',
                    label: 'OWNERNAME',
                },
                {
                    fieldName: 'PermitteeName',
                    label: 'PERMITTEENAME',
                },
                {
                    fieldName: 'ApplicationDate',
                    label: 'APPLICATIONDATE',
                },
                {
                    fieldName: 'PermitNumber',
                    label: 'PERMITNUMBER',
                },
                {
                    fieldName: 'EffectiveDate',
                    label: 'EFFECTIVEDATE',
                },
                {
                    fieldName: 'ExpirationDate',
                    label: 'EXPIRATIONDATE',
                },
                {
                    fieldName: 'IssueDate',
                    label: 'ISSUEDATE',
                },

                {
                    fieldName: 'LastUpdateDate',
                    label: 'LASTUPDATEDATE',
                },
                {
                    fieldName: 'ReadyForReviewDate',
                    label: 'READYFORREVIEWDATE',
                },
                {
                    fieldName: 'AssignedDate',
                    label: 'ASSIGNEDDATE',
                },
                {
                    fieldName: 'LastApprovalDate',
                    label: 'LASTAPPROVALDATE',
                },
                {
                    fieldName: 'XCoord',
                    label: 'XCOORD',
                },
                {
                    fieldName: 'YCoord',
                    label: 'YCOORD',
                },
                {
                    fieldName: 'Latitude',
                    label: 'LATITUDE',
                },
                {
                    fieldName: 'Longitude',
                    label: 'LONGITUDE',
                },




                {
                    fieldName: 'TrackingNumber',
                    label: 'TrackingNumber',
                },
                {
                    fieldName: 'StatusDescription',
                    label: 'StatusDescription',
                },
                {
                    fieldName: 'EventTypeDescription',
                    label: 'EventTypeDescription',
                },
                {
                    fieldName: 'InconvenientFeePaymentDate',
                    label: 'InconvenientFeePaymentDate',
                },
                {
                    fieldName: 'PermitFeePaymentDate',
                    label: 'PermitFeePaymentDate',
                },
                {
                    fieldName: 'MeterPaymentDate',
                    label: 'MeterPaymentDate',
                },
                {
                    fieldName: 'MeterFeeWaiveDate',
                    label: 'MeterFeeWaiveDate',
                },
                {
                    fieldName: 'ConstructionPermitNumber',
                    label: 'ConstructionPermitNumber',
                },



                {
                    fieldName: 'ContractNumber',
                    label: 'ContractNumber',
                },
                {
                    fieldName: 'ConstructionTrackingNumber',
                    label: 'ConstructionTrackingNumber',
                },
                {
                    fieldName: 'SourcePermit',
                    label: 'SourcePermit',
                },
                {
                    fieldName: 'EWRNumber',
                    label: 'EWRNumber',
                },
                {
                    fieldName: 'ParkingStartTime',
                    label: 'ParkingStartTime',
                },
                {
                    fieldName: 'ParkingEndTime',
                    label: 'ParkingEndTime',
                },
                {
                    fieldName: 'TotalPermitFee',
                    label: 'TotalPermitFee',
                },
                {
                    fieldName: 'PermitFeePaidYN',
                    label: 'PermitFeePaidYN',
                },


                {
                    fieldName: 'PermitFeeWaivedYN',
                    label: 'PermitFeeWaivedYN',
                },
                {
                    fieldName: 'InconvenientFeePaidYN',
                    label: 'InconvenientFeePaidYN',
                },
                {
                    fieldName: 'InconvenientFeeWaivedYN',
                    label: 'InconvenientFeeWaivedYN',
                },
                {
                    fieldName: 'MeterPaidYN',
                    label: 'MeterPaidYN',
                },
                {
                    fieldName: 'MeterFeeWaivedYN',
                    label: 'MeterFeeWaivedYN',
                },
                {
                    fieldName: 'TechnologyFee',
                    label: 'TechnologyFee',
                },
                {
                    fieldName: 'InconvenientFee',
                    label: 'InconvenientFee',
                },
                {
                    fieldName: 'TotalMeterFee',
                    label: 'TotalMeterFee',
                },




                {
                    fieldName: 'TotalCarSpace',
                    label: 'TotalCarSpace',
                },
                {
                    fieldName: 'MeterInvoiceID',
                    label: 'MeterInvoiceID',
                },
                {
                    fieldName: 'WorkLocationAddressID',
                    label: 'WorkLocationAddressID',
                },
                {
                    fieldName: 'AddressLockedYN',
                    label: 'AddressLockedYN',
                },
                {
                    fieldName: 'WorkLocationFullAddress',
                    label: 'WorkLocationFullAddress',
                },
                {
                    fieldName: 'MultiAddresses',
                    label: 'MultiAddresses',
                },
                {
                    fieldName: 'WorkLocationWard',
                    label: 'WorkLocationWard',
                },
                {
                    fieldName: 'WorkLocationANC',
                    label: 'WorkLocationANC',
                },




                {
                    fieldName: 'WorkLocationSMD',
                    label: 'WorkLocationSMD',
                },
                {
                    fieldName: 'WorkLocationZip',
                    label: 'WorkLocationZip',
                },
                {
                    fieldName: 'RoadwaySegID',
                    label: 'RoadwaySegID',
                },
                {
                    fieldName: 'StreetSegID',
                    label: 'StreetSegID',
                },
                {
                    fieldName: 'FiscalYear',
                    label: 'FiscalYear',
                },
                {
                    fieldName: 'Ward',
                    label: 'Ward',
                },
                {
                    fieldName: 'Quadrant',
                    label: 'Quadrant',
                },
                {
                    fieldName: 'ZipCode',
                    label: 'ZipCode',
                },




                {
                    fieldName: 'ANC',
                    label: 'ANC',
                },
                {
                    fieldName: 'SMD',
                    label: 'SMD',
                },
                {
                    fieldName: 'NeighborhoodClusters',
                    label: 'NeighborhoodClusters',
                },
                {
                    fieldName: 'NeighborhoodNames',
                    label: 'NeighborhoodNames',
                },
                {
                    fieldName: 'BID',
                    label: 'BID',
                },
                {
                    fieldName: 'AWI',
                    label: 'AWI',
                },
                {
                    fieldName: 'EDZ',
                    label: 'EDZ',
                },
                {
                    fieldName: 'NIF',
                    label: 'NIF',
                },

                {
                    fieldName: 'HistoricDistrict',
                    label: 'HistoricDistrict',
                },
                {
                    fieldName: 'Zoning',
                    label: 'Zoning',
                },
                {
                    fieldName: 'PUD',
                    label: 'PUD',
                },
                {
                    fieldName: 'CFAR',
                    label: 'CFAR',
                },
                {
                    fieldName: 'PSA',
                    label: 'PSA',
                },
                {
                    fieldName: 'PD',
                    label: 'PD',
                },
                {
                    fieldName: 'DaysToAssign',
                    label: 'DaysToAssign',
                },
                {
                    fieldName: 'DaysToApprove',
                    label: 'DaysToApprove',
                },
                {
                    fieldName: 'DaysToIssue',
                    label: 'DaysToIssue',
                },
                {
                    fieldName: 'OnSegX',
                    label: 'OnSegX',
                },
                {
                    fieldName: 'OnSegY',
                    label: 'OnSegY',
                },
                {
                    fieldName: 'ApplicantCompany',
                    label: 'ApplicantCompany',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default ValetParkingPopupTemplate;
