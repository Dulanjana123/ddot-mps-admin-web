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

const PublicSpaceConstructionPopupTemplate = {
    title: 'Public Space Construction Permits: {Status}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'TrackingNumber',
                    label: 'Tracking Number',
                },
                {
                    fieldName: 'EffectiveDate',
                    label: 'Effective Date',
                },
                {
                    fieldName: 'ExpirationDate',
                    label: 'Expiration Date',
                },
                {
                    fieldName: 'Status',
                    label: 'Status',
                },
                {
                    fieldName: 'WorkDetail',
                    label: 'WorkDetail',
                },
                {
                    fieldName: 'WorkLocationFullAddress',
                    label: 'Work Address',
                },
                {
                    fieldName: 'TypeDetailNames',
                    label: 'TypeDetailNames',
                },
                {
                    fieldName: 'OwnerName',
                    label: 'Owner Name',
                },
                {
                    fieldName: 'PermitteeName',
                    label: 'PermitteeName',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default PublicSpaceConstructionPopupTemplate;
