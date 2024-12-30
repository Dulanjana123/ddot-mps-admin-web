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

const ConstructionPermitPopupTemplate = {
    title: 'Construction Permits Boundary: {Supervisor}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'LocationId',
                    label: 'Location Id',
                },
                {
                    fieldName: 'Ward',
                    label: 'Ward',
                },
                {
                    fieldName: 'Supervisor',
                    label: 'Supervisor',
                },
                {
                    fieldName: 'Email',
                    label: 'Email',
                },
                {
                    fieldName: 'Territory',
                    label: 'Territory',
                },
                {
                    fieldName: 'Section',
                    label: 'Section',
                }
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default ConstructionPermitPopupTemplate;
