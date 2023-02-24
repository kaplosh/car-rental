export interface Car {
    id: string;
    brand: string;
    type: string;
    engine: 'B' | 'N' | 'E';
    seats: number;
}
export interface Rental {
    id: string;
    name: string;
    car: string;
    start: string;
    end: string;

}
