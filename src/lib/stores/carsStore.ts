import { writable } from 'svelte/store';
import type { Car } from '$lib/types';

let initialCars: Car[] = [];

if (typeof localStorage !== 'undefined') {
	const storedCars = localStorage.getItem('cars');
	initialCars = storedCars ? JSON.parse(storedCars) : [];
}

export const cars = writable<Car[]>(initialCars);

if (typeof localStorage !== 'undefined') {
	cars.subscribe((value) => {
		localStorage.setItem('cars', JSON.stringify(value));
	});
}
