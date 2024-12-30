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

const RoadwayFunctionalClassificationPopupTemplate = {
    title: 'DDOT Street Functional Classification: {ROUTENAME}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'ROADTYPE',
                    label: 'ROADTYPE',
                },
                {
                    fieldName: 'STREETTYPE',
                    label: 'STREETTYPE',
                },
                {
                    fieldName: 'OWNERSHIP',
                    label: 'OWNERSHIP',
                },
                {
                    fieldName: 'NHSTYPE',
                    label: 'NHSTYPE',
                },
                {
                    fieldName: 'ROUTENAME',
                    label: 'Route Name',
                },
                {
                    fieldName: 'DCFUNCTIONALCLASS',
                    label: 'DC Functional Class',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default RoadwayFunctionalClassificationPopupTemplate;
