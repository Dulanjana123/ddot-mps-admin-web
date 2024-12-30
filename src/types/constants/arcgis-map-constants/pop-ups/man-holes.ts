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

const ManholePopupTemplate = {
    title: 'Sewers - 1999: {OBJECTID}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'SWR',
                    label: 'SEWER',
                },
                {
                    fieldName: 'SWR_ID',
                    label: 'SEWER ID',
                },
                {
                    fieldName: 'SWR_CODE',
                    label: 'SEWER CODE',
                },
                {
                    fieldName: 'SWR_TYPE',
                    label: 'SEWER TYPE',
                },
                {
                    fieldName: 'DXF_LAYER',
                    label: 'DXF LAYER',
                },
                {
                    fieldName: 'DESC_',
                    label: 'DESCRIPTION',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default ManholePopupTemplate;
