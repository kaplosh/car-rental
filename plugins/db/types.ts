export interface DbRecord {
    [attr: string]: any;
    id: string;
}

export interface DbActionResult {
    ok: boolean;
    data?: any;
    error?: any;
    message?: string;
}

export type DbQueryParams = Record<string, unknown>;
