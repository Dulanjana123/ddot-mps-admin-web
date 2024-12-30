export interface ReverseGeoCodeResponseDto {
    address: Address;
    distance: number | null;
    units: string | null;
    zones: Record<string, unknown> | null;
    sslData: Ssl | null
}

interface Address {
    type: string | null;
    properties: AddressProperties;
    geometry: Geometry | null;
}

interface AddressProperties {
    score: number;
    marId: string | null;
    fullAddress: string | null;
    ssl: string | null;
    alias: string | null;
    xCoord: number;
    yCoord: number;
    latitude: number;
    longitude: number;
    addrNum: string | null;
    addrNumSuffix: string | null;
    stName: string | null;
    streetType: string | null;
    quadrant: string | null;
    zipcode: string | null;
    blockKey: string | null;
    subBlockKey: string | null;
    ward: string | null;
    anc: string | null;
    censusTract: string | null;
    residenceType: string | null;
    hasCondoUnit: string | null;
    hasResUnit: string | null;
    status: string | null;
    nationalGrid: string | null;
}

interface Geometry {
    type: string | null;
    coordinates: Array<any> | null;
}
interface Ssl {
    marId: string | null;
    fullAddress: string | null;
    ssl: string | null;
    square: string | null;
    suffix: string | null;
    lot: string | null;
    lot_type: string | null;
    col: string | null;
}
