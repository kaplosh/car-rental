import { Car } from '~/lib/types';

export const Cars = {
  list: ref<Readonly<Car[]>>(Object.freeze([])),

  _id: 1,
  nextId (): string {
    const value = this._id;
    this._id += 1;
    return String(value);
  },

  add (car: Car) {
    Cars.list.value = Object.freeze([ ...Cars.list.value, car ]);
  },

  delete (id: string) {
    Cars.list.value = Object.freeze(Cars.list.value.filter(item => item.id !== id));
  },
};

Cars.add({
  id: Cars.nextId(),
  brand: 'Fiat',
  type: 'Punto',
  engine: 'B',
  seats: 4,
});

Cars.add({
  id: Cars.nextId(),
  brand: 'Tesla',
  type: 'Y',
  engine: 'E',
  seats: 5,
});

Cars.add({
  id: Cars.nextId(),
  brand: 'Škoda',
  type: 'Octavia',
  engine: 'N',
  seats: 5,
});
// Cars.delete();
