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

const SuspendedStreetsPopupTemplate = {
    title: 'Suspended Streets: {ProjectName}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
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
                    fieldName: 'ContractNumber',
                    label: 'ContractNumber',
                },
                {
                    fieldName: 'TaskOrderRequestNumber',
                    label: 'TaskOrderRequestNumber',
                },
                {
                    fieldName: 'TaskOrderNumber',
                    label: 'TaskOrderNumber',
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
                    fieldName: 'ProjectIdentifier',
                    label: 'ProjectIdentifier',
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
                    fieldName: 'Miles',
                    label: 'Miles',
                },
                {
                    fieldName: 'FunctionalClass',
                    label: 'FunctionalClass',
                },
                {
                    fieldName: 'IsNHS',
                    label: 'IsNHS',
                },
                {
                    fieldName: 'BudgetYear',
                    label: 'BudgetYear',
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
                    fieldName: 'SMD',
                    label: 'SMD',
                },
                {
                    fieldName: 'ANC',
                    label: 'ANC',
                },
                {
                    fieldName: 'Side',
                    label: 'Side',
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

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default SuspendedStreetsPopupTemplate;
