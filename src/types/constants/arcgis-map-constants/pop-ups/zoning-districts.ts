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

const ZoningDistrictPopupTemplate = {
    title: 'Zoning - Districts',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'ZONING ',
                    label: 'ZONING',
                },
                {
                    fieldName: 'ZONING_WEB_URL ',
                    label: 'ZONING_WEB_URL',
                },
                {
                    fieldName: 'ZONING_CHANGE_NARRATIVE ',
                    label: 'ZONING_CHANGE_NARRATIVE',
                },
                {
                    fieldName: 'ZONING_STATUS ',
                    label: 'ZONING_STATUS',
                },
                {
                    fieldName: 'ZONING_LABEL ',
                    label: 'ZONING_LABEL',
                },
                {
                    fieldName: 'SE_ANNO_CAD_DATA ',
                    label: 'SE_ANNO_CAD_DATA',
                },
                {
                    fieldName: 'ZONE_DESCRIPTION ',
                    label: 'Zone_Description',
                },
                {
                    fieldName: 'ZONE_DISTRICT ',
                    label: 'Zone_District',
                },
                {
                    fieldName: 'ZR58 ',
                    label: 'ZR58',
                },
                {
                    fieldName: 'ZR16',
                    label: 'ZR16',
                },
                {
                    fieldName: 'IZ_DESIGNATION ',
                    label: 'IZ_DESIGNATION',
                },
                {
                    fieldName: 'ZR16_ORIGINAL ',
                    label: 'Zoning Regulations 2016 Original',
                }
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default ZoningDistrictPopupTemplate;
