export type DbQueryParams = Record<string, unknown>;

export type DbResult<D = any> =
    |{ ok: true; data: D }
    | { ok: false, error: any}

export interface DbSearchData<R = any> {
    page: number;
    perPage: number;
    total: number;
    list: R[];
}

export interface DbRecord {
    [attr: string]: any;
    id: string;
}
