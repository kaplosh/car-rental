import { Car } from '~/lib/types';

export const allCars: Car[] = [];

function addCar (car: Car) {
  allCars.push(car);
}

addCar({
  id: '1',
  brand: 'Fiat',
  type: 'Punto',
  engine: 'B',
  seats: 4,
});

addCar({
  id: '2',
  brand: 'Tesla',
  type: 'Y',
  engine: 'E',
  seats: 5,
});

addCar({
  id: '3',
  brand: 'Škoda',
  type: 'Octavia',
  engine: 'N',
  seats: 5,
});
