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

const FireHydrantPopupTemplate = {
    title: 'Fire Hydrants: {OBJECTID}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'ASSETNUM',
                    label: 'ASSETNUM',
                },
                {
                    fieldName: 'DESCRIPTION',
                    label: 'DESCRIPTION',
                },
                {
                    fieldName: 'INSERVICE',
                    label: 'INSERVICE',
                },
                {
                    fieldName: 'LOCATIONDETAIL',
                    label: 'LOCATIONDETAIL',
                },
                {
                    fieldName: 'ISNFPA',
                    label: 'ISNFPA',
                },
                {
                    fieldName: 'LASTSERVICEDT',
                    label: 'LASTSERVICEDT',
                },
                {
                    fieldName: 'BATTALION',
                    label: 'BATTALION',
                },
                {
                    fieldName: 'ENGINEID',
                    label: 'ENGINEID',
                },
                {
                    fieldName: 'DCS_LAST_MOD_DTM',
                    label: 'DCS_LAST_MOD_DTM',
                },
                {
                    fieldName: 'SE_ANNO_CAD_DATA',
                    label: 'SE_ANNO_CAD_DATA',
                },
                {
                    fieldName: 'BANDCOLOR',
                    label: 'BANDCOLOR',
                },
                {
                    fieldName: 'FLOW',
                    label: 'FLOW',
                },
                {
                    fieldName: 'XCOORD',
                    label: 'X Coordinate',
                },
                {
                    fieldName: 'YCOORD',
                    label: 'Y Coordinate',
                },
                {
                    fieldName: 'GIS_ID',
                    label: 'GIS_ID',
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

export default FireHydrantPopupTemplate;
