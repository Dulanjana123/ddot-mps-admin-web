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

const CommisionFineArtPopupTemplate = {
    title: 'Commission of Fine Arts Review Area',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'NAME',
                    label: 'NAME',
                },
                {
                    fieldName: 'GIS_ID',
                    label: 'GIS_ID',
                },
                {
                    fieldName: 'AID',
                    label: 'AID',
                },
                {
                    fieldName: 'WEB_URL',
                    label: 'WEB_URL',
                },
                {
                    fieldName: 'UPDATE_DATE',
                    label: 'UPDATE_DATE',
                },
                {
                    fieldName: 'STATUS',
                    label: 'STATUS',
                },
                {
                    fieldName: 'HITYPE',
                    label: 'HITYPE',
                },
                {
                    fieldName: 'CREATOR',
                    label: 'CREATOR',
                },
                {
                    fieldName: 'CREATED',
                    label: 'CREATED',
                },
                {
                    fieldName: 'EDITOR',
                    label: 'EDITOR',
                },
                {
                    fieldName: 'EDITED',
                    label: 'EDITED',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default CommisionFineArtPopupTemplate;
