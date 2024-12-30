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

const StreetCenterlinePopupTemplate = {
    title: 'Street Centerline: {ROUTENAME}',
    content: [
        {
            type: 'fields',
            fieldInfos: [
                {
                    fieldName: 'ROUTEID',
                    label: 'Route ID for roadway',
                },
                {
                    fieldName: 'FROMMEASURE',
                    label: 'From Measure (m)',
                },
                {
                    fieldName: 'TOMEASURE',
                    label: 'To Measure (m)',
                },
                {
                    fieldName: 'ROUTENAME',
                    label: 'Route Name',
                },
                {
                    fieldName: 'ROADTYPE',
                    label: 'Road Type',
                },
                {
                    fieldName: 'SUBBLOCKKEY',
                    label: 'SubBlockKey',
                },


                {
                    fieldName: 'TOTALTRAVELLANES',
                    label: 'Total # Travel Lanes',
                },
                {
                    fieldName: 'TOTALPARKINGLANES',
                    label: 'Total # Parking Lanes',
                },
                {
                    fieldName: 'TOTALRAISEDBUFFERS',
                    label: 'Total # Raised Buffers',
                },
                {
                    fieldName: 'TOTALTRAVELLANEWIDTH',
                    label: 'Width of Travel Lanes',
                },
                {
                    fieldName: 'TOTALCROSSSECTIONWIDTH',
                    label: 'Width of All Cross-sections',
                },
                {
                    fieldName: 'TOTALPARKINGLANEWIDTH',
                    label: 'Width of Parking Lanes',
                },


                {
                    fieldName: 'TOTALTRAVELLANESINBOUND',
                    label: 'Total Inbound Travel Lanes',
                },
                {
                    fieldName: 'TOTALTRAVELLANESOUTBOUND',
                    label: 'Total Outbound Travel Lanes',
                },
                {
                    fieldName: 'TOTALTRAVELLANESBIDIRECTIONAL',
                    label: 'Total BiDirectional Travel Lanes',
                },
                {
                    fieldName: 'TOTALTRAVELLANESREVERSIBLE',
                    label: 'Total Reversible Travel Lanes',
                },
                {
                    fieldName: 'SUMMARYDIRECTION',
                    label: 'General Directionality for Segment',
                },
                {
                    fieldName: 'BIKELANE_PARKINGLANE_ADJACENT',
                    label: 'Parking Lane Adjacent to Bikelane',
                },

                {
                    fieldName: 'BIKELANE_THROUGHLANE_ADJACENT',
                    label: 'Throughlane Adjacent to Bikelane',
                },
                {
                    fieldName: 'BIKELANE_POCKETLANE_ADJACENT',
                    label: 'Pocket Turnlane Adjacent to Bikelane',
                },
                {
                    fieldName: 'BIKELANE_CONTRAFLOW',
                    label: 'Bikelane is Contraflow',
                },
                {
                    fieldName: 'BIKELANE_CONVENTIONAL',
                    label: 'Conventional Bikelane',
                },
                {
                    fieldName: 'BIKELANE_DUAL_PROTECTED',
                    label: 'Protected Dual Bikelane',
                },
                {
                    fieldName: 'BIKELANE_DUAL_BUFFERED',
                    label: 'Buffered Dual Bikelane',
                },


                {
                    fieldName: 'BIKELANE_PROTECTED',
                    label: 'Protected Bikelane',
                },
                {
                    fieldName: 'BIKELANE_BUFFERED',
                    label: 'Buffered Bikelane',
                },
                {
                    fieldName: 'DOUBLEYELLOW_LINE',
                    label: 'Double Yellow Line on Segment',
                },
                {
                    fieldName: 'SECTIONFLAGS',
                    label: 'SectionFlags',
                },
                {
                    fieldName: 'LOC_ERROR',
                    label: 'LOC_ERROR',
                },
                {
                    fieldName: 'MIDMEASURE',
                    label: 'MIDMEASURE',
                },


                {
                    fieldName: 'AADT',
                    label: 'AADT',
                },
                {
                    fieldName: 'FHWAFUNCTIONALCLASS',
                    label: 'FHWA Functional Class',
                },
                {
                    fieldName: 'HPMSID',
                    label: 'HPMS ID',
                },
                {
                    fieldName: 'HPMSSECTIONTYPE',
                    label: 'HPMS Section Type',
                },
                {
                    fieldName: 'ID',
                    label: 'Overlay ID',
                },
                {
                    fieldName: 'IRI',
                    label: 'IRI',
                },


                {
                    fieldName: 'IRI_DATE',
                    label: 'IRI Date',
                },
                {
                    fieldName: 'NHSCODE',
                    label: 'NHS Code',
                },
                {
                    fieldName: 'OWNERSHIP',
                    label: 'Ownership',
                },
                {
                    fieldName: 'PCI_CONDCATEGORY',
                    label: 'PCI Condition Category',
                },
                {
                    fieldName: 'PCI_LASTINSPECTED',
                    label: 'PCI Last Inspection Date',
                },
                {
                    fieldName: 'PCI_SCORE',
                    label: 'PCI Condition Score',
                },


                {
                    fieldName: 'SIDEWALK_IB_PAVTYPE',
                    label: 'Sidewalk Pavement Type (Inbound)',
                },
                {
                    fieldName: 'SIDEWALK_IB_WIDTH',
                    label: 'Sidewalk Pavement Width (Inbound)',
                },
                {
                    fieldName: 'SIDEWALK_OB_PAVTYPE',
                    label: 'Sidewalk Pavement Type (Outbound)',
                },
                {
                    fieldName: 'SIDEWALK_OB_WIDTH',
                    label: 'Sidewalk Pavement Width (Outbound)',
                },
                {
                    fieldName: 'SPEEDLIMITS_IB',
                    label: 'Speed Limit (Inbound)',
                },
                {
                    fieldName: 'SPEEDLIMITS_IB_ALT',
                    label: 'Speed Limit Schools (Inbound)',
                },


                {
                    fieldName: 'SPEEDLIMITS_OB',
                    label: 'Speed Limit (Outbound)',
                },
                {
                    fieldName: 'SPEEDLIMITS_OB_ALT',
                    label: 'Speed Limit Schools (Outbound)',
                },
                {
                    fieldName: 'SUBBLOCKID',
                    label: 'SubBlockID',
                },
                {
                    fieldName: 'BLOCKID',
                    label: 'BlockID',
                },
                {
                    fieldName: 'BLOCKKEY',
                    label: 'BlockKey',
                },
                {
                    fieldName: 'DCFUNCTIONALCLASS',
                    label: 'DC Functional Class',
                },


                {
                    fieldName: 'NHSTYPE',
                    label: 'NHS Type',
                },
                {
                    fieldName: 'QUADRANT',
                    label: 'Quadrant',
                },
                {
                    fieldName: 'STREETNAME',
                    label: 'Street Name',
                },
                {
                    fieldName: 'STREETTYPE',
                    label: 'Street Type',
                },
                {
                    fieldName: 'SNOWROUTE_DPW',
                    label: 'Snow Route DPW',
                },
                {
                    fieldName: 'SNOWZONE_DPW',
                    label: 'Snow Zone DPW',
                },


                {
                    fieldName: 'SNOWROUTE',
                    label: 'Snow Route',
                },
                {
                    fieldName: 'SNOWSECTION',
                    label: 'Snow Section',
                },
                {
                    fieldName: 'SNOWZONE',
                    label: 'Snow Zone',
                },
                {
                    fieldName: 'LEFTTURN_CURBLANE_EXCL',
                    label: 'Exclusive Left Turn Lane Approaching Int (One way only)',
                },
                {
                    fieldName: 'LEFTTURN_CURBLANE_EXCL_LEN',
                    label: 'Exclusive Left Turn Lane Approaching Int Length (ft)',
                },
                {
                    fieldName: 'RIGHTTURN_CURBLANE_EXCL',
                    label: 'Exclusive Right Turn Lane Approaching Int (One way only)',
                },



                {
                    fieldName: 'RIGHTTURN_CURBLANE_EXCL_LEN',
                    label: 'Exclusive Right Turn Lane Approaching Int Length (ft)',
                },
                {
                    fieldName: 'TOTALBIKELANES',
                    label: 'Bike Lane Count',
                },
                {
                    fieldName: 'TOTALBIKELANEWIDTH',
                    label: 'Total Width of Bike Lanes',
                },
                {
                    fieldName: 'RPPDIRECTION',
                    label: 'Resident Parking Permitted (Direction)',
                },
                {
                    fieldName: 'RPPSIDE',
                    label: 'Resident Parking Permitted (Side)',
                },
                {
                    fieldName: 'SLOWSTREETINFO',
                    label: 'Is Slow Street?',
                },


                {
                    fieldName: 'TOTALRAISEDBUFFERWIDTH',
                    label: 'Width of Buffer/Barriers',
                },
                {
                    fieldName: 'AADT_YEAR',
                    label: 'AADT Year',
                },
                {
                    fieldName: 'RIGHTTURN_EXCLUSIVE',
                    label: 'Excl Right turn Lane on Segment',
                },
                {
                    fieldName: 'LEFTTURN_EXCLUSIVE',
                    label: 'Excl Left turn Lane on Segment',
                },
                {
                    fieldName: 'BUSLANE_INBOUND',
                    label: 'Bus Lane (Inbound)',
                },
                {
                    fieldName: 'BUSLANE_OUTBOUND',
                    label: 'Bus Lane (Outbound)',
                },


                {
                    fieldName: 'FROMSTREET',
                    label: 'From Street',
                },
                {
                    fieldName: 'TOSTREET',
                    label: 'To Street',
                },
                {
                    fieldName: 'WARD_ID',
                    label: 'Ward',
                },
                {
                    fieldName: 'SMD_ID',
                    label: 'SMD',
                },
                {
                    fieldName: 'ANC_ID',
                    label: 'ANC',
                },
                {
                    fieldName: 'NETWORK_LOGICAL_END',
                    label: 'NETWORK_LOGICAL_END',
                },



                {
                    fieldName: 'AADT_COMBINATION',
                    label: 'AADT_COMBINATION',
                },
                {
                    fieldName: 'AADT_COMBINATION_YEAR',
                    label: 'AADT_COMBINATION_YEAR',
                },
                {
                    fieldName: 'AADT_SINGLE_UNIT',
                    label: 'AADT_SINGLE_UNIT',
                },
                {
                    fieldName: 'AADT_SINGLE_UNIT_YEAR',
                    label: 'AADT_SINGLE_UNIT_YEAR',
                },

            ],
        },
    ],
    actions: [panToAction, addMarkerAction, viewAttributeTableAction],
};

export default StreetCenterlinePopupTemplate;
