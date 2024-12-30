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

const MicroMobilityCorralsPopupTemplate = {
    title: 'Micromobility (MiMo) Corrals: {Intersection}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'Intersection',
                    label: 'Intersection',
                },
                {
                    fieldName: 'CornerofIntersect',
                    label: 'CornerofIntersect',
                },
                {
                    fieldName: 'SnowEmergencyRoute',
                    label: 'SnowEmergencyRoute',
                }
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default MicroMobilityCorralsPopupTemplate;
