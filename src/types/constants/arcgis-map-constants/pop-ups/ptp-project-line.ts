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

const PTPProjectLinePopupTemplate = {
    title: 'Project Line: {ContractNumber}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'PIUniqueID',
                    label: 'PIUniqueID',
                },
                {
                    fieldName: 'PIID',
                    label: 'PIID',
                },
                {
                    fieldName: 'PIIDBI',
                    label: 'PIIDBI',
                },
                {
                    fieldName: 'SolicitationNumber',
                    label: 'SolicitationNumber',
                },
                {
                    fieldName: 'TaskOrderNumber',
                    label: 'TaskOrderNumber',
                },
                {
                    fieldName: 'ContractNumber',
                    label: 'ContractNumber',
                },
                {
                    fieldName: 'WorkType',
                    label: 'WorkType',
                },
                {
                    fieldName: 'ProjectName',
                    label: 'ProjectName',
                },


                {
                    fieldName: 'ProjectPhase',
                    label: 'ProjectPhase',
                },
                {
                    fieldName: 'ProjectStatus',
                    label: 'ProjectStatus',
                },
                {
                    fieldName: 'EstimatedStartDate',
                    label: 'EstimatedStartDate',
                },
                {
                    fieldName: 'EstimatedCompletionDate',
                    label: 'EstimatedCompletionDate',
                },
                {
                    fieldName: 'ActualStartDate',
                    label: 'ActualStartDate',
                },
                {
                    fieldName: 'ActualCompletionDate',
                    label: 'ActualCompletionDate',
                },
                {
                    fieldName: 'PercentCompleted',
                    label: 'PercentCompleted',
                },
                {
                    fieldName: 'RequestType',
                    label: 'RequestType',
                },



                {
                    fieldName: 'ContactEmail',
                    label: 'ContactEmail',
                },
                {
                    fieldName: 'Description',
                    label: 'Description',
                },
                {
                    fieldName: 'Comments',
                    label: 'Comments',
                },
                {
                    fieldName: 'RouteName',
                    label: 'RouteName',
                },
                {
                    fieldName: 'FromStreet',
                    label: 'FromStreet',
                },
                {
                    fieldName: 'ToStreet',
                    label: 'ToStreet',
                },
                {
                    fieldName: 'RouteID',
                    label: 'RouteID',
                },
                {
                    fieldName: 'FromMeasure',
                    label: 'FromMeasure',
                },



                {
                    fieldName: 'ToMeasure',
                    label: 'ToMeasure',
                },
                {
                    fieldName: 'Miles',
                    label: 'Miles',
                },
                {
                    fieldName: 'BudgetYear',
                    label: 'BudgetYear',
                },
                {
                    fieldName: 'FunctionalClass',
                    label: 'FunctionalClass',
                },
                {
                    fieldName: 'EstimatedCost',
                    label: 'EstimatedCost',
                },
                {
                    fieldName: 'ActualCost',
                    label: 'ActualCost',
                },
                {
                    fieldName: 'Ward',
                    label: 'Ward',
                },
                {
                    fieldName: 'IsNHS',
                    label: 'IsNHS',
                },



                {
                    fieldName: 'Side',
                    label: 'Side',
                },
                {
                    fieldName: 'ProjectIdentifier',
                    label: 'ProjectIdentifier',
                },
                {
                    fieldName: 'CreatedByID',
                    label: 'CreatedByID',
                },
                {
                    fieldName: 'CreatedBy',
                    label: 'CreatedBy',
                },
                {
                    fieldName: 'CreatedDate',
                    label: 'CreatedDate',
                },
                {
                    fieldName: 'LastUpdatedByID',
                    label: 'LastUpdatedByID',
                },
                {
                    fieldName: 'LastUpdatedBy',
                    label: 'LastUpdatedBy',
                },
                {
                    fieldName: 'LastUpdatedDate',
                    label: 'LastUpdatedDate',
                },



                {
                    fieldName: 'IsDeleted',
                    label: 'IsDeleted',
                },
                {
                    fieldName: 'IsPublishedToPublic',
                    label: 'IsPublishedToPublic',
                },
                {
                    fieldName: 'SMD',
                    label: 'SMD',
                },
                {
                    fieldName: 'ANC',
                    label: 'ANC',
                },
                {
                    fieldName: 'TaskOrderRequestNumber',
                    label: 'TaskOrderRequestNumber',
                },
                {
                    fieldName: 'DTAPLastUpdatedByID',
                    label: 'DTAPLastUpdatedByID',
                },
                {
                    fieldName: 'DTAPLastUpdatedBy',
                    label: 'DTAPLastUpdatedBy',
                },
                {
                    fieldName: 'DTAPLastUpdatedDate',
                    label: 'DTAPLastUpdatedDate',
                },

            ],
        },
        {
            type: "attachments"
        }
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default PTPProjectLinePopupTemplate;
