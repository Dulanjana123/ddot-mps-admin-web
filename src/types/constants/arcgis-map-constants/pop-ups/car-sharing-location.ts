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

const CarSharingLocationPopupTemplate = {
    title: 'Zipcar: {LOC_TYPE}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'MAKE_MODEL',
                    label: 'Make Model',
                },
                {
                    fieldName: 'VEHICLE',
                    label: 'Vehicle',
                },
                {
                    fieldName: 'VEHICLE_ID',
                    label: 'Vehicle ID',
                },
                {
                    fieldName: 'ZONE_',
                    label: 'Zone',
                },
                {
                    fieldName: 'REGION',
                    label: 'Region',
                },
                {
                    fieldName: 'VENDOR',
                    label: 'Vendor',
                },
                {
                    fieldName: 'LOC_TYPE',
                    label: 'Location Type',
                },
                {
                    fieldName: 'ADDRESS',
                    label: 'ADDRESS',
                },
                {
                    fieldName: 'NUMSPACES',
                    label: 'Number of Spaces',
                },
                {
                    fieldName: 'DESCRIPTION',
                    label: 'Description',
                }
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default CarSharingLocationPopupTemplate;
