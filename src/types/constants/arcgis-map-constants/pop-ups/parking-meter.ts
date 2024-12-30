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

const ParkingMeterPopupTemplate = {
  title: 'Parking Meter: {METERID}',
  content: [
    {
      type: 'fields',
      fieldInfos: [
        {
          fieldName: 'METERTYPE',
          label: 'Meter Type',
        },
        {
          fieldName: 'METERID',
          label: 'Meter Identifier',
        },
        {
          fieldName: 'ROUTEID',
          label: 'Route Identifier',
        },
        {
          fieldName: 'SIDE',
          label: 'Side',
        },
        {
          fieldName: 'STREET',
          label: 'Street',
        },
        {
          fieldName: 'BLOCK',
          label: 'Block',
        },
        {
          fieldName: 'METERMODEL',
          label: 'Meter Model',
        },
        {
          fieldName: 'METERSTATUS',
          label: 'Meter Status',
        },
        {
          fieldName: 'METERSTATE',
          label: 'Meter State',
        },
        {
          fieldName: 'METERSPACES',
          label: 'Meter Spaces',
        },
        {
          fieldName: 'METERMODEM',
          label: 'Meter Modem',
        },
        {
          fieldName: 'EVENTZONES',
          label: 'Event Zones',
        },
        {
          fieldName: 'ISADA',
          label: 'Is ADA',
        },
        {
          fieldName: 'PMZONE',
          label: 'PM Zone',
        },
        {
          fieldName: 'TRANSMISSIONDATE',
          label: 'Transmission Date',
        },
      ],
    },
  ],
  actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default ParkingMeterPopupTemplate;
