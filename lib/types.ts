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

export interface DataTableColumn {
    name: string;
    caption?: string;
    cell(record: any): any;
}
