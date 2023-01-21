export interface DataTableColumn {
    name: string;
    caption?: string;
    render(dataItem: any): any;
}
