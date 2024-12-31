export const vehicles = {
	dragRacer: {
		vehicleType: 'Drag Racer',
		weight: 'Lightweight',
		hull: 4,
		handling: 4,
		maxGear: 6,
		crew: 1,
		buildSlots: 2,
		specialRules: ['Jet Engine'],
		cost: 5
	},
	bike: {
		vehicleType: 'Bike',
		weight: 'Lightweight',
		hull: 4,
		handling: 5,
		maxGear: 6,
		crew: 1,
		buildSlots: 1,
		specialRules: ['Full Throttle', 'Pivot'],
		cost: 5
	},
	buggy: {
		vehicleType: 'Buggy',
		weight: 'Lightweight',
		hull: 6,
		handling: 4,
		maxGear: 6,
		crew: 2,
		buildSlots: 2,
		specialRules: ['Roll Cage'],
		cost: 6
	},
	bikeWithSidecar: {
		vehicleType: 'Bike with Sidecar',
		weight: 'Lightweight',
		hull: 4,
		handling: 5,
		maxGear: 6,
		crew: 2,
		buildSlots: 2,
		specialRules: ['Full Throttle', 'Pivot'],
		cost: 8
	},
	iceCreamTruck: {
		vehicleType: 'Ice-cream Truck',
		weight: 'Middleweight',
		hull: 10,
		handling: 2,
		maxGear: 4,
		crew: 2,
		buildSlots: 2,
		specialRules: ['Infuriating Jingle'],
		cost: 8
	},
	car: {
		vehicleType: 'Car',
		weight: 'Middleweight',
		hull: 10,
		handling: 3,
		maxGear: 5,
		crew: 2,
		buildSlots: 2,
		specialRules: [],
		cost: 12
	},
	performanceCar: {
		vehicleType: 'Performance Car',
		weight: 'Middleweight',
		hull: 8,
		handling: 4,
		maxGear: 6,
		crew: 1,
		buildSlots: 2,
		specialRules: ['Slip Away'],
		cost: 15
	},
	truck: {
		vehicleType: 'Truck',
		weight: 'Middleweight',
		hull: 12,
		handling: 2,
		maxGear: 4,
		crew: 3,
		buildSlots: 3,
		specialRules: [],
		cost: 15
	},
	gyroCopter: {
		vehicleType: 'Gyrocopter',
		weight: 'Middleweight',
		hull: 4,
		handling: 4,
		maxGear: 6,
		crew: 1,
		buildSlots: 0,
		specialRules: ['Airwolf', 'Airborne'],
		cost: 10
	},
	ambulance: {
		vehicleType: 'Ambulance',
		weight: 'Middleweight',
		hull: 12,
		handling: 2,
		maxGear: 5,
		crew: 3,
		buildSlots: 3,
		specialRules: ['Uppers', 'Downers'],
		cost: 20
	},
	monsterTruck: {
		vehicleType: 'Monster Truck',
		weight: 'Heavyweight',
		hull: 10,
		handling: 3,
		maxGear: 4,
		crew: 2,
		buildSlots: 2,
		specialRules: ['All Terrain', 'Up and Over'],
		cost: 25
	},
	heavyTruck: {
		vehicleType: 'Heavy Truck',
		weight: 'Heavyweight',
		hull: 14,
		handling: 2,
		maxGear: 3,
		crew: 4,
		buildSlots: 5,
		specialRules: [],
		cost: 25
	},
	bus: {
		vehicleType: 'Bus',
		weight: 'Heavyweight',
		hull: 16,
		handling: 2,
		maxGear: 3,
		crew: 8,
		buildSlots: 3,
		specialRules: [],
		cost: 30
	},
	helicopter: {
		vehicleType: 'Helicopter',
		weight: 'Heavyweight',
		hull: 6,
		handling: 3,
		maxGear: 4,
		crew: 3,
		buildSlots: 4,
		specialRules: ['Airwolf', 'Airborne', 'Restricted'],
		cost: 30
	},
	tank: {
		vehicleType: 'Tank',
		weight: 'Heavyweight',
		hull: 20,
		handling: 4,
		maxGear: 3,
		crew: 3,
		buildSlots: 4,
		specialRules: ['Pivot', 'Up and Over', 'All Terrain', 'Turret', 'Restricted'],
		cost: 40
	},
	warRig: {
		vehicleType: 'War Rig',
		weight: 'Heavyweight',
		hull: 26,
		handling: 2,
		maxGear: 4,
		crew: 5,
		buildSlots: 5,
		specialRules: ['See War Rig rules'],
		cost: 40
	}
};
