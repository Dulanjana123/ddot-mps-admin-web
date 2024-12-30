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

const GroundMuralPopupTemplate = {
    title: 'Ground Mural: {OBJECTID}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'CreationDate',
                    label: 'CreationDate',
                },
                {
                    fieldName: 'Creator',
                    label: 'Creator',
                },
                {
                    fieldName: 'EditDate',
                    label: 'EditDate',
                },
                {
                    fieldName: 'Editor',
                    label: 'Editor',
                },
                {
                    fieldName: 'Location',
                    label: 'Location',
                },
                {
                    fieldName: 'InstallationYear',
                    label: 'Installation Year',
                },
                {
                    fieldName: 'Artist',
                    label: 'Artist',
                }
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default GroundMuralPopupTemplate;
