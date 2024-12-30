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

const WatchLockAreaPopupTemplate = {
    title: 'TOPSWatchArea: {Name}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'WatchLockId',
                    label: 'WatchLockId',
                },
                {
                    fieldName: 'Name',
                    label: 'Name',
                },
                {
                    fieldName: 'WatchType',
                    label: 'WatchType',
                },
                {
                    fieldName: 'Status',
                    label: 'Status',
                },
                {
                    fieldName: 'StartDateTime',
                    label: 'StartDateTime',
                },
                {
                    fieldName: 'EndDateTime',
                    label: 'EndDateTime',
                },
                {
                    fieldName: 'ConstructionWorkTypes',
                    label: 'ConstructionWorkTypes',
                },
                {
                    fieldName: 'OccupancyEventTypes',
                    label: 'OccupancyEventTypes',
                },
                {
                    fieldName: 'AnnualRentalEventTypes',
                    label: 'AnnualRentalEventTypes',
                }
            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default WatchLockAreaPopupTemplate;
