export interface DbRecord {
    [attr: string]: any;
    id: string;
}

export interface DbResult<D = any> {
    ok: boolean;
    data?: D;
    error?: any;
}

export interface DbSearchData<R = any> {
    page: number;
    perPage: number;
    total: number;
    list: R[];
}
