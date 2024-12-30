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

const ConstructionProjectsPopupTemplate = {
    title: 'ProTrack Line: {PROJECTNAME}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'PROJECTID',
                    label: 'PROJECTID',
                },
                {
                    fieldName: 'DCPROJECTNO',
                    label: 'DCPROJECTNO',
                },
                {
                    fieldName: 'PROJECTNAME',
                    label: 'PROJECTNAME',
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
                    fieldName: 'FROMSTREET',
                    label: 'FROMSTREET',
                },
                {
                    fieldName: 'TOSTREET',
                    label: 'TOSTREET',
                },
                {
                    fieldName: 'WORKTYPECODE',
                    label: 'WORKTYPECODE',
                },


                {
                    fieldName: 'YEARBUDGETED',
                    label: 'YEARBUDGETED',
                },
                {
                    fieldName: 'LENGTH',
                    label: 'LENGTH',
                },
                {
                    fieldName: 'WIDTH',
                    label: 'WIDTH',
                },
                {
                    fieldName: 'SYAREA',
                    label: 'SYAREA',
                },
                {
                    fieldName: 'WARD',
                    label: 'WARD',
                },
                {
                    fieldName: 'FUNCTIONALCLASSCODE',
                    label: 'FUNCTIONALCLASSCODE',
                },
                {
                    fieldName: 'ADMIN',
                    label: 'ADMIN',
                },
                {
                    fieldName: 'NHSELIGIBLE',
                    label: 'NHSELIGIBLE',
                },



                {
                    fieldName: 'LOCATIONTYPE',
                    label: 'LOCATIONTYPE',
                },
                {
                    fieldName: 'CONTACTNAME',
                    label: 'CONTACTNAME',
                },
                {
                    fieldName: 'CONTACTEMAIL',
                    label: 'CONTACTEMAIL',
                },
                {
                    fieldName: 'PHASETYPECODE',
                    label: 'PHASETYPECODE',
                },
                {
                    fieldName: 'STATUSCODE',
                    label: 'STATUSCODE',
                },
                {
                    fieldName: 'ESTIMATEDSTARTDATE',
                    label: 'ESTIMATEDSTARTDATE',
                },
                {
                    fieldName: 'ESTIMATEDCOMPLETIONDATE',
                    label: 'ESTIMATEDCOMPLETIONDATE',
                },
                {
                    fieldName: 'ACTUALSTARTDATE',
                    label: 'ACTUALSTARTDATE',
                },



                {
                    fieldName: 'ACTUALCOMPLETIONDATE',
                    label: 'ACTUALCOMPLETIONDATE',
                },
                {
                    fieldName: 'PERCENTCOMPLETED',
                    label: 'PERCENTCOMPLETED',
                },
                {
                    fieldName: 'MODIFIEDDATE',
                    label: 'MODIFIEDDATE',
                },
                {
                    fieldName: 'CONTRACTNO',
                    label: 'CONTRACTNO',
                },
                {
                    fieldName: 'DIVISIONID',
                    label: 'DIVISIONID',
                },
                {
                    fieldName: 'ESTIMATEDCOST',
                    label: 'ESTIMATEDCOST',
                },
                {
                    fieldName: 'ACTUALCOST',
                    label: 'ACTUALCOST',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default ConstructionProjectsPopupTemplate;
