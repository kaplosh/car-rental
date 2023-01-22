import { InMemoryDb } from '~/plugins/db/InMemoryDb';
import { Table } from '~/plugins/db/Table';

export function mockDb () {
  const cars = new Table('cars');
  InMemoryDb.tables.push(cars);
  cars.items.push({ id: cars.nextId(), brand: 'Fiat', type: 'Punto', engine: 'B', seats: 4 });
  cars.items.push({ id: cars.nextId(), brand: 'Tesla', type: 'Y', engine: 'E', seats: 5 });
  cars.items.push({ id: cars.nextId(), brand: 'Škoda', type: 'ctavie', engine: 'N', seats: 5 });
  cars.filters.push({ name: 'brand', filter: { type: 'includes' } });
  cars.filters.push({ name: 'type', filter: { type: 'includes' } });
  cars.filters.push({ name: 'engine', filter: { type: 'includes' } });
}
