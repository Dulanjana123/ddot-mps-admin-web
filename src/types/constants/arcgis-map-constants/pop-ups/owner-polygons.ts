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

const OwnerPolygonsPopupTemplate = {
    title: 'Owner Polygons (Common Ownership Layer)',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'SQUARE',
                    label: 'SQUARE',
                },
                {
                    fieldName: 'LOT',
                    label: 'LOT',
                },
                {
                    fieldName: 'SSL',
                    label: 'SSL',
                },
                {
                    fieldName: 'LANDAREA',
                    label: 'LAND AREA',
                },
                {
                    fieldName: 'OWNERNAME',
                    label: 'OWNER NAME',
                },
                {
                    fieldName: 'CAREOFNAME',
                    label: 'CAREOFNAME',
                },
                {
                    fieldName: 'ADDRESS1',
                    label: 'ADDRESS',
                },
                {
                    fieldName: 'CITYSTZIP',
                    label: 'CITYSTZIP',
                },
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default OwnerPolygonsPopupTemplate;
