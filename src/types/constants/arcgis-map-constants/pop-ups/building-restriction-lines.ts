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

const BuildingRestrictionLinePopupTemplate = {
  title: 'Bulding restriction lines: {METERID}',
  content: [
    {
      type: 'fields',
      fieldInfos: [
        {
          fieldName: 'EGIS_ID',
          label: 'EGIS_ID',
        },
        {
          fieldName: 'REG_ID',
          label: 'REG_ID',
        },
        {
          fieldName: 'BSTP_GEO_ID',
          label: 'BSTP_GEO_ID',
        },
        {
          fieldName: 'BSTP_OPS_TCD',
          label: 'BSTP_OPS_TCD',
        },
        {
          fieldName: 'BSTP_EFF_DATE',
          label: 'BSTP_EFF_DATE',
        },
        {
          fieldName: 'BSTP_TCD',
          label: 'BSTP_TCD',
        },
        {
          fieldName: 'AT_STR',
          label: 'AT_STR',
        },
        {
          fieldName: 'ON_STR',
          label: 'ON_STR',
        },
        {
          fieldName: 'BSTP_HDG',
          label: 'BSTP_HDG',
        },
        {
          fieldName: 'BSTP_POS_TCD',
          label: 'BSTP_POS_TCD',
        },
        {
          fieldName: 'BSTP_LDC',
          label: 'BSTP_LDC',
        },
        {
          fieldName: 'BSTP_MSG_TEXT',
          label: 'BSTP_MSG_TEXT',
        },
        {
          fieldName: 'BSTP_LON',
          label: 'BSTP_LON',
        },
        {
          fieldName: 'BSTP_LAT',
          label: 'BSTP_LAT',
        },
        {
          fieldName: 'BSTP_LAT_LON_TCD',
          label: 'BSTP_LAT_LON_TCD',
        },

        {
          fieldName: 'BSTP_INV_SYR_TCD',
          label: 'BSTP_INV_SYR_TCD',
        },
        {
          fieldName: 'BSTP_INV_SRV_DATE',
          label: 'BSTP_INV_SRV_DATE',
        },
        {
          fieldName: 'BSTP_BNH_CNT',
          label: 'BSTP_BNH_CNT',
        },
        {
          fieldName: 'BSTP_BST_TCD',
          label: 'BSTP_BST_TCD',
        },
        {
          fieldName: 'BSTP_IFC_OWN',
          label: 'BSTP_IFC_OWN',
        },
        {
          fieldName: 'BSTP_HAS_BKRS',
          label: 'BSTP_HAS_BKRS',
        },
        {
          fieldName: 'BSTP_HAS_PRS',
          label: 'BSTP_HAS_PRS',
        },
        {
          fieldName: 'BSTP_HAS_PVM',
          label: 'BSTP_HAS_PVM',
        },
      ],
    },
  ],
  actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default BuildingRestrictionLinePopupTemplate;
