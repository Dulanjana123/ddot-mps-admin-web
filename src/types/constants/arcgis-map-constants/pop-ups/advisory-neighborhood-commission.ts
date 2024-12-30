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

const AdvisoryNeighborhoodCommissionPopupTemplate = {
    title: 'Advisory Neighborhood Commission: {NAME}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'ANC_ID',
                    label: 'Advisory Neighborhood Commission Identifier',
                },
                {
                    fieldName: 'WEB_URL ',
                    label: 'Web URL',
                },
                {
                    fieldName: 'NAME ',
                    label: 'Name',
                },
                {
                    fieldName: 'SE_ANNO_CAD_DATA ',
                    label: 'SE_ANNO_CAD_DATA',
                },
                {
                    fieldName: 'GIS_ID ',
                    label: 'GIS_ID',
                },
                {
                    fieldName: 'CREATOR ',
                    label: 'CREATOR',
                },
                {
                    fieldName: 'CREATED ',
                    label: 'CREATED',
                },
                {
                    fieldName: 'EDITOR ',
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

export default AdvisoryNeighborhoodCommissionPopupTemplate;
