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

const EmergencyWorkRequestPermitPopupTemplate = {
    title: 'Emergency Work Request Permits: {Status}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'RequestID',
                    label: 'RequestID',
                },
                {
                    fieldName: 'RequestNumber',
                    label: 'RequestNumber',
                },
                {
                    fieldName: 'EmergencyTypeDescription',
                    label: 'EmergencyTypeDescription',
                },
                {
                    fieldName: 'EmergencyCause',
                    label: 'EmergencyCause',
                },
                {
                    fieldName: 'StatusDescription',
                    label: 'StatusDescription',
                },
                {
                    fieldName: 'ApplicationDate',
                    label: 'ApplicationDate',
                },
                {
                    fieldName: 'SubmissionDate',
                    label: 'SubmissionDate',
                },
                {
                    fieldName: 'EffectiveDate',
                    label: 'EffectiveDate',
                },


                {
                    fieldName: 'ExpirationDate',
                    label: 'ExpirationDate',
                },
                {
                    fieldName: 'RejectedDate',
                    label: 'RejectedDate',
                },
                {
                    fieldName: 'CancelledDate',
                    label: 'CancelledDate',
                },
                {
                    fieldName: 'LastUpdateDate',
                    label: 'LastUpdateDate',
                },
                {
                    fieldName: 'LocationDetail',
                    label: 'LocationDetail',
                },
                {
                    fieldName: 'LocationDescription',
                    label: 'LocationDescription',
                },
                {
                    fieldName: 'LocationFullDescription',
                    label: 'LocationFullDescription',
                },
                {
                    fieldName: 'ClientReferenceNum',
                    label: 'ClientReferenceNum',
                },



                {
                    fieldName: 'EWR_Location_ID',
                    label: 'EWR_Location_ID',
                },
                {
                    fieldName: 'ConstructionTrackingNumber',
                    label: 'ConstructionTrackingNumber',
                },
                {
                    fieldName: 'OccupancyTrackingNumber',
                    label: 'OccupancyTrackingNumber',
                },
                {
                    fieldName: 'Status',
                    label: 'Status',
                },
                {
                    fieldName: 'EmergencyTypeCode',
                    label: 'EmergencyTypeCode',
                },
                {
                    fieldName: 'EmergencyCauseID',
                    label: 'EmergencyCauseID',
                },
                {
                    fieldName: 'ApplicationTime',
                    label: 'ApplicationTime',
                },
                {
                    fieldName: 'StartTime',
                    label: 'StartTime',
                },



                {
                    fieldName: 'StartTimeAMPM',
                    label: 'StartTimeAMPM',
                },
                {
                    fieldName: 'NotificationSent',
                    label: 'NotificationSent',
                },
                {
                    fieldName: 'ConditionYN',
                    label: 'ConditionYN',
                },
                {
                    fieldName: 'ProblemDetails',
                    label: 'ProblemDetails',
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
                    fieldName: 'LastUpdatedBy',
                    label: 'LastUpdatedBy',
                },
                {
                    fieldName: 'CancelledBy',
                    label: 'CancelledBy',
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
                    fieldName: 'XCoord',
                    label: 'XCoord',
                },
                {
                    fieldName: 'YCoord',
                    label: 'YCoord',
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
                    fieldName: 'Longitude',
                    label: 'Longitude',
                },
                {
                    fieldName: 'Latitude',
                    label: 'Latitude',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default EmergencyWorkRequestPermitPopupTemplate;
