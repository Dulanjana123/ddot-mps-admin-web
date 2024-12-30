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

const UFATreesPopupTemplate = {
    title: 'UFA Trees: {FACILITYID}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'FACILITYID',
                    label: 'FACILITYID',
                },
                {
                    fieldName: 'VICINITY',
                    label: 'VICINITY',
                },
                {
                    fieldName: 'WARD',
                    label: 'WARD',
                },
                {
                    fieldName: 'TBOX_L',
                    label: 'TBOX_L',
                },
                {
                    fieldName: 'TBOX_W',
                    label: 'TBOX_W',
                },
                {
                    fieldName: 'WIRES',
                    label: 'WIRES',
                },
                {
                    fieldName: 'CURB',
                    label: 'CURB',
                },
                {
                    fieldName: 'SIDEWALK',
                    label: 'SIDEWALK',
                },
                {
                    fieldName: 'TBOX_STAT',
                    label: 'TBOX_STAT',
                },
                {
                    fieldName: 'RETIREDDT',
                    label: 'RETIREDDT',
                },
                {
                    fieldName: 'SCI_NM',
                    label: 'SCI_NM',
                },
                {
                    fieldName: 'CMMN_NM',
                    label: 'CMMN_NM',
                },

                {
                    fieldName: 'DATE_PLANT',
                    label: 'DATE_PLANT',
                },
                {
                    fieldName: 'DBH',
                    label: 'DBH',
                },
                {
                    fieldName: 'DISEASE',
                    label: 'DISEASE',
                },
                {
                    fieldName: 'PESTS',
                    label: 'PESTS',
                },
                {
                    fieldName: 'CONDITION',
                    label: 'CONDITION',
                },
                {
                    fieldName: 'CONDITIODT',
                    label: 'CONDITIODT',
                },
                {
                    fieldName: 'OWNERSHIP',
                    label: 'OWNERSHIP',
                },
                {
                    fieldName: 'TREE_NOTES',
                    label: 'TREE_NOTES',
                },
                {
                    fieldName: 'ONEYEARPHOTO',
                    label: 'ONEYEARPHOTO',
                },

                {
                    fieldName: 'SPECIALPHOTO',
                    label: 'SPECIALPHOTO',
                },
                {
                    fieldName: 'PHOTOREMARKS',
                    label: 'PHOTOREMARKS',
                },
                {
                    fieldName: 'ELEVATION',
                    label: 'ELEVATION',
                },
                {
                    fieldName: 'SIGN',
                    label: 'SIGN',
                },
                {
                    fieldName: 'TRRS',
                    label: 'TRRS',
                },
                {
                    fieldName: 'WARRANTY',
                    label: 'WARRANTY',
                },
                {
                    fieldName: 'FAM_NAME',
                    label: 'FAM_NAME',
                },
                {
                    fieldName: 'CREATED_USER',
                    label: 'CREATED_USER',
                },

                {
                    fieldName: 'CREATED_DATE',
                    label: 'CREATED_DATE',
                },
                {
                    fieldName: 'EDITEDBY',
                    label: 'EDITEDBY',
                },
                {
                    fieldName: 'LAST_EDITED_USER',
                    label: 'LAST_EDITED_USER',
                },
                {
                    fieldName: 'LAST_EDITED_DATE',
                    label: 'LAST_EDITED_DATE',
                },
                {
                    fieldName: 'Email',
                    label: 'GENUS_NAME',
                },
                {
                    fieldName: 'PLANTED_BY',
                    label: 'PLANTED_BY',
                },
                {
                    fieldName: 'NURSERY_STOCK',
                    label: 'NURSERY_STOCK',
                },

                {
                    fieldName: 'CANOPY_KEEPER',
                    label: 'CANOPY_KEEPER',
                },
                {
                    fieldName: 'TREEMORTALITY_STUDY',
                    label: 'TREEMORTALITY_STUDY',
                },
                {
                    fieldName: 'LONGITUDINAL',
                    label: 'LONGITUDINAL',
                },
                {
                    fieldName: 'MBG_WIDTH',
                    label: 'Crown Width',
                },

                {
                    fieldName: 'MBG_LENGTH',
                    label: 'Crown Length',
                },
                {
                    fieldName: 'MBG_ORIENTATION',
                    label: 'Crown Orientation',
                },
                {
                    fieldName: 'MAX_CROWN_HEIGHT',
                    label: 'Crown Height Max',
                },
                {
                    fieldName: 'MAX_MEAN',
                    label: 'Crown Height Mean',
                },
                {
                    fieldName: 'MIN_CROWN_BASE',
                    label: 'Crown Base Min',
                },
                {
                    fieldName: 'DTM_MEAN',
                    label: 'Ground Elevation',
                },
                {
                    fieldName: 'PERIM',
                    label: 'Crown Perimeter',
                },
                {
                    fieldName: 'CROWN_AREA',
                    label: 'Crown Area',
                },
                {
                    fieldName: 'CICADA_SURVEY',
                    label: 'CICADA_SURVEY',
                },
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default UFATreesPopupTemplate;
