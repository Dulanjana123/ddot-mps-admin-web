export interface Block {
    longitude: number,
    latitude: number,
    ward: string | null,
    quadrant: string | null
}

export interface Address {
    longitude: number,
    latitude: number,
    ward: string | null,
    quadrant: string | null
}

export interface Intersection {
    longitude: number,
    latitude: number,
}