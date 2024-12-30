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

const SingleMemberDistrictPopupTemplate = {
    title: 'Single Member District - 2023: {ProjectName}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'SMD_ID ',
                    label: 'Single Member District Identifier',
                },
                {
                    fieldName: 'ANC_ID ',
                    label: 'Advisory Neighborhood Commission Identifier',
                },
                {
                    fieldName: 'WEB_URL ',
                    label: 'Web URL',
                },
                {
                    fieldName: 'NAME ',
                    label: 'Name',
                },
                {
                    fieldName: 'CHAIR ',
                    label: 'Chair',
                },
                {
                    fieldName: 'REP_NAME ',
                    label: 'Representative Name',
                },

                {
                    fieldName: 'FIRST_NAME ',
                    label: 'Representative First Name',
                },
                {
                    fieldName: 'MIDDLE_NAME ',
                    label: 'Representative Middle Name',
                },
                {
                    fieldName: 'LAST_NAME ',
                    label: 'Representative Last Name',
                },

                {
                    fieldName: 'ADDRESS ',
                    label: 'Address',
                },

                {
                    fieldName: 'SF ',
                    label: 'Suffix',
                },
                {
                    fieldName: 'APT ',
                    label: 'Apartment',
                },
                {
                    fieldName: 'ZIPCODE ',
                    label: 'Zipcode',
                },
                {
                    fieldName: 'PHONE ',
                    label: 'Phone',
                },
                {
                    fieldName: 'EMAIL ',
                    label: 'Email',
                },
                {
                    fieldName: 'GIS_ID ',
                    label: 'GIS Identifier',
                },

                {
                    fieldName: 'SE_ANNO_CAD_DATA ',
                    label: 'SE_ANNO_CAD_DATA',
                },
                {
                    fieldName: 'CREATOR ',
                    label: 'CREATOR',
                },
                {
                    fieldName: 'CREATED ',
                    label: 'CREATED',
                },
                {
                    fieldName: 'EDITOR ',
                    label: 'EDITOR',
                },
                {
                    fieldName: 'EDITED ',
                    label: 'EDITED',
                },
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default SingleMemberDistrictPopupTemplate;
