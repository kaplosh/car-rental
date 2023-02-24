import { InMemoryDb } from '~/plugins/db/InMemoryDb';
import { Table } from '~/plugins/db/Table';

export function mockDb () {
  const cars = new Table('cars');
  InMemoryDb.tables.push(cars);
  cars.items.push({ id: cars.nextId(), brand: 'Fiat', type: 'Punto', engine: 'B', seats: 4 });
  cars.items.push({ id: cars.nextId(), brand: 'Tesla', type: 'Y', engine: 'E', seats: 5 });
  cars.items.push({ id: cars.nextId(), brand: 'Škoda', type: 'Octavie', engine: 'N', seats: 5 });
  cars.filters.push({ name: 'brand', filter: { type: 'includes' } });
  cars.filters.push({ name: 'type', filter: { type: 'includes' } });
  cars.filters.push({ name: 'engine', filter: { type: 'includes' } });
  const rentals = new Table('rentals');
  InMemoryDb.tables.push(rentals);
  rentals.items.push({ id: rentals.nextId(), name: 'Aleš Vocílka', car: 'Ford Exort', start: '04-08-2020', end: '04-15-2020' });
  rentals.filters.push({ name: 'id', filter: { type: 'includes' } });
}
