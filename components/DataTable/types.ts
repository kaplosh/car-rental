export interface DataTableColumn {
    name: string;
    caption?: string;
    cell(record: any): any;
}
