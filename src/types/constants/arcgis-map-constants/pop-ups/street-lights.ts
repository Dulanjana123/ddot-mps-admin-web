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

const StreetLightPopupTemplate = {
    title: 'Street Lights: {STREETNAME}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'PEPCOLIGHTID',
                    label: 'PEPCOLIGHTID',
                },
                {
                    fieldName: 'LIGHTTYPE',
                    label: 'LIGHTTYPE',
                },
                {
                    fieldName: 'WATTAGE1',
                    label: 'WATTAGE',
                },
                {
                    fieldName: 'POLETYPE',
                    label: 'POLETYPE',
                },
                {
                    fieldName: 'POLESTYLE',
                    label: 'POLESTYLE',
                },
                {
                    fieldName: 'POLEHEIGHT',
                    label: 'POLEHEIGHT',
                },
                {
                    fieldName: 'POWERFEED',
                    label: 'POWERFEED',
                },
                {
                    fieldName: 'NUMBERARMS',
                    label: 'NUMBERARMS',
                },

                {
                    fieldName: 'ARMLENGTH',
                    label: 'ARMLENGTH',
                },
                {
                    fieldName: 'FIXTURESTYLE',
                    label: 'FIXTURE',
                },
                {
                    fieldName: 'PROXIMITY',
                    label: 'PROXIMITY',
                },
                {
                    fieldName: 'STREETNAME',
                    label: 'STREETNAME',
                },
                {
                    fieldName: 'QUADRANT',
                    label: 'QUADRANT',
                },
                {
                    fieldName: 'ROADTYPE',
                    label: 'ROADTYPE',
                },
                {
                    fieldName: 'OWNER',
                    label: 'OWNER',
                },
                {
                    fieldName: 'WARD',
                    label: 'WARD',
                },




                {
                    fieldName: 'COMMENTS',
                    label: 'COMMENTS',
                },
                {
                    fieldName: 'HOUSENO',
                    label: 'HOUSENO',
                },
                {
                    fieldName: 'FACILITYID',
                    label: 'FACILITYID',
                },
                {
                    fieldName: 'ASSETTYPE',
                    label: 'ASSETTYPE',
                },
                {
                    fieldName: 'ISMETERED',
                    label: 'ISMETERED',
                },
                {
                    fieldName: 'NUMBERFIXTURES',
                    label: 'NUMBERFIXTURES',
                },
                {
                    fieldName: 'CROSSSTREET',
                    label: 'CROSSSTREET',
                },
                {
                    fieldName: 'RMS',
                    label: 'RMS',
                },



                {
                    fieldName: 'TRAFFICCOMBO',
                    label: 'ISCOMBOPOLE',
                },
                {
                    fieldName: 'STREETSEGMID',
                    label: 'STREETSEGMID',
                },
                {
                    fieldName: 'OTHEREQUIPMENT',
                    label: 'OTHEREQUIPMENT',
                },
                {
                    fieldName: 'CONDITION',
                    label: 'CONDITION',
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
                    fieldName: 'LASTMODIFIED',
                    label: 'LASTMODIFIED',
                },
                {
                    fieldName: 'LIGHTHISTORY',
                    label: 'LIGHTHISTORY',
                },


                {
                    fieldName: 'INOPERATION',
                    label: 'INOPERATION',
                },
                {
                    fieldName: 'ADDTOGIS',
                    label: 'ADDTOGIS',
                },
                {
                    fieldName: 'ADDEDBY',
                    label: 'ADDEDBY',
                },
                {
                    fieldName: 'WHATMODIFIED',
                    label: 'WHATMODIFIED',
                },
                {
                    fieldName: 'LASTLOGGED',
                    label: 'LASTLOGGED',
                },
                {
                    fieldName: 'LOGGEDBY',
                    label: 'LOGGEDBY',
                },
                {
                    fieldName: 'LIGHTMANUFACTURER',
                    label: 'LIGHTBRAND',
                },
                {
                    fieldName: 'TBASETYPE',
                    label: 'BASETYPE',
                },




                {
                    fieldName: 'STREETLIGHTID',
                    label: 'STREETLIGHTID',
                },
                {
                    fieldName: 'SHIELD',
                    label: 'SHIELD',
                },
                {
                    fieldName: 'LASTPAINTED',
                    label: 'LASTPAINTED',
                },
                {
                    fieldName: 'LEDINOPERATION',
                    label: 'LEDINOPERATION',
                },
                {
                    fieldName: 'XCOORD',
                    label: 'XCOORDINAT',
                },
                {
                    fieldName: 'YCOORD',
                    label: 'yCOORDINAT',
                },
                {
                    fieldName: 'ISMETERED_DESC',
                    label: 'ISMETERED_DESC',
                },
                {
                    fieldName: 'LIGHTTYPE_DESC',
                    label: 'LIGHTTYPE_DESC',
                },




                {
                    fieldName: 'WATTAGE1_DESC',
                    label: 'WATTAGE_DESC',
                },
                {
                    fieldName: 'POLETYPE_DESC',
                    label: 'POLETYPE_DESC',
                },
                {
                    fieldName: 'POLESTYLE_DESC',
                    label: 'POLESTYLE_DESC',
                },
                {
                    fieldName: 'POLEHEIGHT_DESC',
                    label: 'POLEHEIGHT_DESC',
                },
                {
                    fieldName: 'POWERFEED_DESC',
                    label: 'POWERFEED_DESC',
                },
                {
                    fieldName: 'NUMBERARMS_DESC',
                    label: 'NUMBERARMS_DESC',
                },
                {
                    fieldName: 'ARMLENGTH1_DESC',
                    label: 'ARMLENGTH_DESC',
                },
                {
                    fieldName: '',
                    label: 'NUMBERFIXTURES_DESC',
                },




                {
                    fieldName: 'FIXTURESTYLE_DESC',
                    label: 'FIXTURE_DESC',
                },
                {
                    fieldName: 'PROXIMITY_DESC',
                    label: 'PROXIMITY_DESC',
                },
                {
                    fieldName: 'QUADRANT_DESC',
                    label: 'QUADRANT_DESC',
                },
                {
                    fieldName: 'ROADTYPE_DESC',
                    label: 'ROADTYPE_DESC',
                },
                {
                    fieldName: 'OWNER_DESC',
                    label: 'OWNER_DESC',
                },
                {
                    fieldName: 'WARD_DESC',
                    label: 'WARD_DESC',
                },
                {
                    fieldName: 'RMS_DESC',
                    label: 'RMS_DESC',
                },
                {
                    fieldName: 'CONDITION_DESC',
                    label: 'CONDITION_DESC',
                },

                {
                    fieldName: 'TBASETYPE_DESC',
                    label: 'BASETYPE_DESC',
                },
                {
                    fieldName: 'SHIELD_DESC',
                    label: 'SHIELD_DESC',
                },
                {
                    fieldName: 'GLOBALID',
                    label: 'GLOBALID',
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
                    fieldName: 'POLECOLOR',
                    label: 'POLECOLOR',
                },
                {
                    fieldName: 'AFFILIATION',
                    label: 'AFFILIATION',
                },
                {
                    fieldName: 'SCRATCH',
                    label: 'SCRATCH',
                },
                {
                    fieldName: 'CCT',
                    label: 'CCT',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default StreetLightPopupTemplate;
