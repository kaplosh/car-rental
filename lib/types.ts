export interface Car {
    id: string;
    brand: string;
    type: string;
    engine: 'B' | 'N' | 'E';
    seats: number;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
}
