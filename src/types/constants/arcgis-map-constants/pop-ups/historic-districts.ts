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

const HistoricDistrictsPopupTemplate = {
    title: 'Historic Districts',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'NAME',
                    label: 'NAME',
                },
                {
                    fieldName: 'LABEL',
                    label: 'LABEL',
                },
                {
                    fieldName: 'ADDRESS',
                    label: 'ADDRESS',
                },
                {
                    fieldName: 'NR',
                    label: 'National Register',
                },
                {
                    fieldName: 'NM',
                    label: 'National Monument',
                },
                {
                    fieldName: 'NHL',
                    label: 'National Historic Landmark',
                },
                {
                    fieldName: 'NHS',
                    label: 'National Historic Site',
                },
                {
                    fieldName: 'NHP',
                    label: 'National Historic Park',
                },
                {
                    fieldName: 'STATUS',
                    label: 'Status',
                },
                {
                    fieldName: 'DESIGNATION_DATE',
                    label: 'Designation Date',
                },
                {
                    fieldName: 'EDIT_DATE',
                    label: 'Edit Date',
                },
                {
                    fieldName: 'DESIGNATION',
                    label: 'Designation',
                },
                {
                    fieldName: 'UNIQUEID',
                    label: 'UniqueID',
                },
                {
                    fieldName: 'HITYPE',
                    label: 'HIType',
                },
                {
                    fieldName: 'GIS_ID',
                    label: 'GIS_ID',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default HistoricDistrictsPopupTemplate;
