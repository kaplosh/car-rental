import { DbQueryParams, DbRecord, DbSearchData } from '~/plugins/db/types';
import { mockDb } from '~/lib/records/__mocks/default';
import { Table } from '~/plugins/db/Table';

const LOCAL_STORAGE_KEY = 'car-rental:DB-v1-latest';

export const InMemoryDb = {
  tables: [] as Table[],

  read () {
    InMemoryDb.tables = [];
    const [ result, error ] = parseOrCreate();
    if (error) console.error(error);
    return result;
  },

  save () {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, serialize());
  },

  getRecords (tableName: string, params: DbQueryParams): DbSearchData {
    const table = getTable(tableName);
    let list = table.filterRecords(params);
    const page = getPageFromParams(params);
    const perPage = getPerPageFromParams(params);
    const start = (page - 1) * perPage;
    list = list.slice(start, start + perPage);
    return {
      page,
      perPage,
      total: table.items.length,
      list,
    };
  },

  createRecord (tableName: string, record: Omit<DbRecord, 'id'>): string {
    const table = getTable(tableName);
    const recordData = JSON.stringify(record);
    const lastId = table.addRecord(JSON.parse(recordData));
    InMemoryDb.save();
    return lastId;
  },

  updateRecord (tableName: string, record: DbRecord): void {
    const table = getTable(tableName);
    const recordData = JSON.stringify(record);
    const result = table.replaceRecord(record.id, JSON.parse(recordData));
    if (!result) throw new Error(`db fail: .updateRecord ${tableName} ${record.id}`);
    InMemoryDb.save();
  },

  deleteRecord (tableName: string, id: string): void {
    const table = getTable(tableName);
    const result = table.removeRecord(id);
    if (!result) throw new Error(`db fail: .deleteRecord ${tableName} ${id}`);
    InMemoryDb.save();
  },

};

function parseOrCreate (): [true, null] | [false, Error] {
  InMemoryDb.tables = [];
  const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    mockDb();
    return [ true, null ];
  }

  try {
    const json = JSON.parse(data!);
    json.tables.forEach((data) => {
      const table = new Table(data.name);
      table.items = data.items;
      InMemoryDb.tables.push(table);
    });
    return [ true, null ];
  } catch (error) {
    return [ false, error ];
  }
}

function serialize () {
  return JSON.stringify({
    tables: InMemoryDb.tables.map(table => table.serialize()),
  });
}

function getTable (name: string) {
  const table = InMemoryDb.tables.find(table => table.name === name);
  if (!table) throw new Error('table #{name} not found');
  return table;
}

function getPageFromParams (params: DbQueryParams): number {
  const validParams = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  const getPage = Number(params.Page);
  const found = validParams.includes(getPage);

  if (!found) {
    return 10;
  } else {
    return getPage;
  }
}

function getPerPageFromParams (params: DbQueryParams): number {
  const validParams = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  const getPerPage = Number(params.perPage);
  const found = validParams.includes(getPerPage);

  if (!found) {
    return 10;
  } else {
    return getPerPage;
  }
}
