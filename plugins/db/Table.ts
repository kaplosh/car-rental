import { deburr } from 'lodash';
import { DbQueryParams, DbRecord } from '~/plugins/db/types';

interface Filter {
  name: string;
  filter:
      |{ type: 'includes' };
}

export class Table {
  name: string;
  items: DbRecord[] = [];
  filters: Filter[] = [];

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

  filterRecords (params: DbQueryParams): DbRecord[] {
    let list = this.items.slice(0);
    this.filters.forEach((filter) => {
      if (params[filter.name] === undefined) return;
      switch (filter.filter.type) {
        case 'includes': {
          const expected = params[filter.name];
          list = list.filter(record => filter_includes(record[filter.name], expected));
          break;
        }
      }
    });
    return list;
  }
}

function filter_includes (value: any, expected: any): boolean {
  value = deburr(String(value)).toLowerCase();
  expected = deburr(String(expected)).toLowerCase();
  return value.includes(expected);
}
