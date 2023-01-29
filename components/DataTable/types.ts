export interface DataTableColumn {
    name: string;
    caption?: string;
    render(dataItem: any): any;
}

export type DataTableItem = unknown;

export interface DataTableItemAction<I = DataTableItem> {
    name: string;
    caption: string;
    action(item: I): void;
}
