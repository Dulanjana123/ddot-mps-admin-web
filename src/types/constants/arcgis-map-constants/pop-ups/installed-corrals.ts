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

const InstalledCorralsPopupTemplate = {
    title: 'Polygons: {Name}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'Name',
                    label: 'Name',
                },
                {
                    fieldName: 'FolderPath',
                    label: 'FolderPath',
                },
                {
                    fieldName: 'SymbolID',
                    label: 'SymbolID',
                },
                {
                    fieldName: 'AltMode',
                    label: 'AltMode',
                },
                {
                    fieldName: 'Base',
                    label: 'Base',
                },
                {
                    fieldName: 'Clamped',
                    label: 'Clamped',
                },
                {
                    fieldName: 'Extruded',
                    label: 'Extruded',
                },
                {
                    fieldName: 'Snippet',
                    label: 'Snippet',
                },
                {
                    fieldName: 'PopupInfo',
                    label: 'PopupInfo',
                }
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default InstalledCorralsPopupTemplate;
