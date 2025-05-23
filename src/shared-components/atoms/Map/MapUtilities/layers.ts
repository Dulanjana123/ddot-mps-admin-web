import * as PopupTemplates from '@constants/arcgis-map-constants/pop-ups';

export const featureLayers = [
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_Parking_WebMercator/MapServer/76',
        popupTemplate: PopupTemplates.ParkingMeterPopupTemplate,
        title: 'Parking Meters',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/13',
        popupTemplate: PopupTemplates.MetroBusStopsPopupTemplate,
        title: 'Metro Bus Stops',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Property_and_Land/MapServer/9',
        popupTemplate: PopupTemplates.BuildingRestrictionLinePopupTemplate,
        title: 'Bulding Restriction Lines',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Public_Safety_WebMercator/MapServer/5',
        popupTemplate: PopupTemplates.FireHydrantPopupTemplate,
        title: 'Fire Hydrants',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/Planning/FeatureServer/0',
        popupTemplate: PopupTemplates.GroundMuralPopupTemplate,
        title: 'Ground Mural',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/TOPS/MapServer/5',
        popupTemplate: PopupTemplates.ConstructionPermitPopupTemplate,
        title: 'Construction Permits Boundary',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/UFATrees2/MapServer/0',
        popupTemplate: PopupTemplates.UFATreesPopupTemplate,
        title: 'UFA Trees',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Planimetrics_1999/MapServer/5',
        popupTemplate: PopupTemplates.ManholePopupTemplate,
        title: 'Manholes',
        visible: false,
    },
    {
        url: 'https://services.arcgis.com/neT9SoYxizqTHZPH/ArcGIS/rest/services/InstalledCorrals/FeatureServer/1',
        popupTemplate: PopupTemplates.InstalledCorralsPopupTemplate,
        title: 'Installed Corrals',
        visible: false,
    },
    {
        url: 'https://services.arcgis.com/neT9SoYxizqTHZPH/arcgis/rest/services/MiMo_Corrals_WFL1/FeatureServer/0',
        popupTemplate: PopupTemplates.MicroMobilityCorralsPopupTemplate,
        title: 'Micromobility (MiMo) Corrals',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/WatchLockArea/FeatureServer/0',
        popupTemplate: PopupTemplates.WatchLockAreaPopupTemplate,
        title: 'WatchLockArea - TOPSWatchArea',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/PTP/FeatureServer/3',
        popupTemplate: PopupTemplates.PavingPlanPopupTemplate,
        title: 'Paving Plan 2023',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/DCCarsharingSpaces/MapServer/0',
        popupTemplate: PopupTemplates.CarSharingLocationPopupTemplate,
        title: 'Car Sharing Locations',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/PTP/FeatureServer/1',
        popupTemplate: PopupTemplates.PTPProjectPointPopupTemplate,
        title: 'PTP - Project Point',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/23',
        popupTemplate: PopupTemplates.PublicSpaceConstructionPopupTemplate,
        title: 'Public Space Construction Permits - Expired Permits',
        definitionExpression: 'Status = 8', //Filter expired features
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/23',
        popupTemplate: PopupTemplates.PublicSpaceConstructionPopupTemplate,
        title: 'Public Space Construction Permits',
        definitionExpression: 'Status IN (1,9)',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/23',
        popupTemplate: PopupTemplates.PublicSpaceConstructionPopupTemplate,
        title: 'Public Space Construction Permits - Pending',
        definitionExpression: 'Status IN (0,10,11,12)',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/24',
        popupTemplate: PopupTemplates.PublicSpaceOccupancyPopupTemplate,
        title: 'Public Space Occupancy Permits - Expired Permits',
        definitionExpression: "Status = 'EXPIRED'",
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/24',
        popupTemplate: PopupTemplates.PublicSpaceOccupancyPopupTemplate,
        title: 'Public Space Occupancy Permits',
        definitionExpression: "Status IN ('APPROVED','ISSUED')",
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/24',
        popupTemplate: PopupTemplates.PublicSpaceOccupancyPopupTemplate,
        title: 'Public Space Occupancy Permits - Pending',
        definitionExpression: "Status IN ('PENDING','ASSIGNED','RESUBMIT')",
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/21',
        popupTemplate: PopupTemplates.StreetLightPopupTemplate,
        title: 'Street Lights',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_WebMercator/MapServer/48',
        popupTemplate: PopupTemplates.RoadwayFunctionalClassificationPopupTemplate,
        title: 'Roadway Functional Classification',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/5',
        popupTemplate: PopupTemplates.StreetCenterlinePopupTemplate,
        title: 'Street Centerline',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/34',
        popupTemplate: PopupTemplates.ValetParkingPopupTemplate,
        title: 'Valet Parking Permits',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/35',
        popupTemplate: PopupTemplates.EmergencyWorkRequestPermitPopupTemplate,
        title: 'Emergency Work Request Permits',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/PTP/FeatureServer/3',
        popupTemplate: PopupTemplates.PTPProjectLinePopupTemplate,
        title: 'PTP - Project Line',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/ProTrack/FeatureServer/1',
        popupTemplate: PopupTemplates.ConstructionProjectsPopupTemplate,
        title: 'Construction Projects',
        definitionExpression: "PHASETYPECODE = '030'",
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/ProTrack/FeatureServer/1',
        popupTemplate: PopupTemplates.ConstructionProjectsPopupTemplate,
        title: 'Design Projects',
        definitionExpression: "PHASETYPECODE = '020'",
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/SuspendedStreet/MapServer/0',
        popupTemplate: PopupTemplates.SuspendedStreetsPopupTemplate,
        title: 'Suspended Streets(ProTrack Plus)',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/41',
        popupTemplate: PopupTemplates.BusinessImprovementDistrictPopupTemplate,
        title: 'Business Improvement Districts',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/38',
        popupTemplate: PopupTemplates.CommisionFineArtPopupTemplate,
        title: 'Commission of Fine Arts Review Area',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/39',
        popupTemplate: PopupTemplates.HistoricDistrictsPopupTemplate,
        title: 'Historic Districts',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/44',
        popupTemplate: PopupTemplates.LightRailZonePopupTemplate,
        title: 'Light Rail Zone - TOPS',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/2',
        popupTemplate: PopupTemplates.OwnerPolygonsPopupTemplate,
        title: 'Owner Polygons (Common Ownership Layer)',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/PTP/FeatureServer/5',
        popupTemplate: PopupTemplates.PTPProjectPolygonPopupTemplate,
        title: 'PTP - Project Polygon',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries/MapServer/55',
        popupTemplate: PopupTemplates.SingleMemberDistrictPopupTemplate,
        title: 'Single Member District (SMD)',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries/MapServer/54',
        popupTemplate: PopupTemplates.AdvisoryNeighborhoodCommissionPopupTemplate,
        title: 'Advisory Neighborhood Commission (ANC)',
        visible: false,
    },
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_APPS/DDOT_TOPS/MapServer/40',
        popupTemplate: PopupTemplates.ZoningDistrictPopupTemplate,
        title: 'Zoning - Districts',
        visible: false,
    },
];

export const imageLayers = [
    {
        url: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/ROWScan/MapServer',
        title: 'Right of Way Scan',
        visible: false,
    }
]
