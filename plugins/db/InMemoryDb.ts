import { DbRecord, DbSearchData } from '~/plugins/db/types';

const LOCAL_STORAGE_KEY = 'car-rental:DB-v1-latest';

export const InMemoryDb = {
  tables: [] as Table[],

  read () {
    InMemoryDb.tables = [];
    const [ result, error ] = parse();
    if (error) console.error(error);
    return result;
  },

  save () {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, serialize());
  },

  getRecords (tableName: string): DbSearchData {
    const table = getTable(tableName);
    const list = table.items.slice(0);
    return {
      page: 1,
      perPage: list.length,
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

function parse (): [true, null] | [false, Error] {
  InMemoryDb.tables = [];
  const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    InMemoryDb.tables.push(new Table('cars'));
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

class Table {
  name: string;
  items: DbRecord[] = [];

  constructor (name) {
    this.name = name;
  }

  serialize () {
    return {
      name: this.name,
      items: this.items,
    };
  }

  nextId (): string {
    // TODO
    // najdi nejvetsi id, a pricti k tomu jedna
    return String(Math.random());
  }

  addRecord (record): string {
    record.id = this.nextId();
    Object.freeze(record);
    this.items.push(record);
    return record.id;
  }

  replaceRecord (id, record): boolean {
    record.id = id;
    Object.freeze(record);
    const index = this.items.findIndex(record => record.id === id);
    if (index) {
      this.items[index] = record;
      return true;
    }
    return false;
  }

  removeRecord (id): boolean {
    const index = this.items.findIndex(record => record.id === id);
    if (index) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}
