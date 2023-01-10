import { Car } from '~/lib/types';
import { onNewId } from '~/lib/id';

export const Cars = {
  list: ref<Car[]>([]),

  add (car: Car) {
    car.id = onNewId();
    // car.id = String(Cars.list.value.length + 1);
    Cars.list.value = [ ...Cars.list.value, car ];
  },
};

Cars.add({
  id: '1',
  brand: 'Fiat',
  type: 'Punto',
  engine: 'B',
  seats: 4,
});

Cars.add({
  id: '2',
  brand: 'Tesla',
  type: 'Y',
  engine: 'E',
  seats: 5,
});

Cars.add({
  id: '3',
  brand: 'Škoda',
  type: 'Octavia',
  engine: 'N',
  seats: 5,
});
