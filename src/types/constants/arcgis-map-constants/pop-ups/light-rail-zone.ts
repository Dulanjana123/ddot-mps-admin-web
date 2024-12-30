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

const LightRailZonePopupTemplate = {
    title: 'Light Rail Zone - TOPS',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'BUFFERDIST',
                    label: 'BufferDist',
                },
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default LightRailZonePopupTemplate;
