<script lang="ts">
	import { cars } from '$lib/stores/carsStore';
	import { derived, get } from 'svelte/store';
	import { vehicles } from '$lib/data/vehiclesData';
	import type { Car } from '$lib/types';

	const totalFleetCost = derived(cars, ($cars) => $cars.reduce((sum, car) => sum + car.cost, 0));

	let showVehicleSelect = false;
	let showNamePrompt = false;
	let showEditModal = false;
	let editingIndex: number | null = null;
	let selectedVehicle: string | null = null;
	let newCarName = '';

	let carForm = {
		activatedInput: false,
		buildSlotsInput: 0,
		costInput: 0,
		crewInput: 0,
		handlingInput: 0,
		hullInput: 0,
		maxGearInput: 0,
		nameInput: '',
		specialRulesInput: [],
		weightInput: ''
	};

	const openVehicleSelect = () => {
		showVehicleSelect = true;
	};

	const selectVehicle = (vehicleKey: string) => {
		selectedVehicle = vehicleKey;
		showVehicleSelect = false;
		showNamePrompt = true;
		newCarName = '';
	};

	const confirmNewCar = () => {
		if (selectedVehicle && newCarName.trim()) {
			const vehicle = vehicles[selectedVehicle];
			const newCar: Car = {
				activated: false,
				buildSlots: vehicle.buildSlots,
				cost: vehicle.cost,
				crew: vehicle.crew,
				handling: vehicle.handling,
				hull: vehicle.hull,
				maxGear: vehicle.maxGear,
				name: newCarName.trim(),
				specialRules: vehicle.specialRules,
				vehicleType: vehicle.vehicleType,
				weight: vehicle.weight
			};

			cars.update((currentCars) => [...currentCars, newCar]);
			showNamePrompt = false;
			selectedVehicle = null;
		}
	};

	const openEditModal = (index: number) => {
		editingIndex = index;
		const c = get(cars)[index];
		carForm = {
			nameInput: c.name,
			handlingInput: c.handling,
			crewInput: c.crew,
			maxGearInput: c.maxGear,
			hullInput: c.hull,
			weightInput: c.weight,
			activatedInput: c.activated,
			buildSlotsInput: c.buildSlots,
			specialRulesInput: c.specialRules,
			costInput: c.cost
		};
		showEditModal = true;
	};

	const saveCar = () => {
		const newCar: Car = {
			name: carForm.nameInput,
			vehicleType: get(cars)[editingIndex].vehicleType,
			handling: carForm.handlingInput,
			crew: carForm.crewInput,
			maxGear: carForm.maxGearInput,
			hull: carForm.hullInput,
			weight: carForm.weightInput,
			activated: carForm.activatedInput,
			buildSlots: carForm.buildSlotsInput,
			specialRules: carForm.specialRulesInput,
			cost: carForm.costInput
		};

		cars.update((currentCars) => {
			if (editingIndex !== null) {
				const updatedCars = [...currentCars];
				updatedCars[editingIndex] = newCar;
				return updatedCars;
			}
			return currentCars;
		});
		showEditModal = false;
	};

	const deleteCar = (index: number) => {
		cars.update((currentCars) => currentCars.filter((_, i) => i !== index));
	};
</script>

<!-- Fleet Summary -->
<div class="fleet-summary">
	<h2>Fleet Summary</h2>
	<div class="total-cost">Total Cost: {$totalFleetCost} CANS</div>
</div>

<!-- Vehicle Selection Modal -->
{#if showVehicleSelect}
	<div class="modal">
		<div class="modal-content">
			<h2>Select Vehicle Type</h2>
			<div class="vehicle-grid">
				{#each Object.entries(vehicles) as [key, vehicle]}
					<button class="vehicle-option" on:click={() => selectVehicle(key)}>
						<div class="vehicle-name">{vehicle.vehicleType}</div>
						<div class="vehicle-stats">
							Hull: {vehicle.hull} | Handling: {vehicle.handling} | Cost: {vehicle.cost}
						</div>
						<div class="vehicle-weight">{vehicle.weight}</div>
					</button>
				{/each}
			</div>
			<div class="modal-buttons">
				<button on:click={() => (showVehicleSelect = false)}>Cancel</button>
			</div>
		</div>
	</div>
{/if}

<!-- Name Prompt Modal -->
{#if showNamePrompt}
	<div class="modal">
		<div class="modal-content">
			<h2>Name Your Vehicle</h2>
			<label>
				Vehicle Name:
				<input
					bind:value={newCarName}
					placeholder="Enter vehicle name"
					on:keydown={(e) => e.key === 'Enter' && confirmNewCar()}
				/>
			</label>
			<div class="modal-buttons">
				<button
					on:click={() => {
						showNamePrompt = false;
						selectedVehicle = null;
					}}>Cancel</button
				>
				<button class="primary" on:click={confirmNewCar}>OK</button>
			</div>
		</div>
	</div>
{/if}

<!-- Edit Modal -->
{#if showEditModal}
	<div class="modal">
		<div class="modal-content">
			<h2>Edit Vehicle</h2>
			<label>
				Vehicle Name:
				<input bind:value={carForm.nameInput} />
			</label>
			<label>
				Handling:
				<input type="number" bind:value={carForm.handlingInput} />
			</label>
			<label>
				Crew:
				<input type="number" bind:value={carForm.crewInput} />
			</label>
			<label>
				Max Gear:
				<input type="number" bind:value={carForm.maxGearInput} />
			</label>
			<label>
				Hull:
				<input type="number" bind:value={carForm.hullInput} />
			</label>
			<label>
				Weight Class:
				<select bind:value={carForm.weightInput}>
					<option value="Lightweight">Lightweight</option>
					<option value="Middleweight">Middleweight</option>
					<option value="Heavyweight">Heavyweight</option>
				</select>
			</label>
			<label>
				Build Slots:
				<input type="number" bind:value={carForm.buildSlotsInput} />
			</label>
			<label>
				Cost:
				<input type="number" bind:value={carForm.costInput} />
			</label>
			<label>
				Activated:
				<input type="checkbox" bind:checked={carForm.activatedInput} />
			</label>
			<div class="special-rules">
				<span>Special Rules:</span>
				<div class="rules-list">
					{#each carForm.specialRulesInput as rule}
						<div class="rule">{rule}</div>
					{/each}
				</div>
			</div>
			<div class="modal-buttons">
				<button on:click={() => (showEditModal = false)}>Cancel</button>
				<button class="primary" on:click={saveCar}>Save</button>
			</div>
		</div>
	</div>
{/if}

<!-- Cards Grid -->
<div class="cards-grid">
	{#each $cars as car, i}
		<div class="card">
			<div class="card-header">
				<div class="title">{car.name}</div>
				<div class="subtitle">
					<div class="vehicle-type">{car.vehicleType}</div>
					<div class="weight">{car.weight}</div>
				</div>
			</div>

			<div class="hull-section">
				<div class="hull-label">HULL</div>
				<div class="hull-grid">
					<div class="hull-row">
						{#each Array(Math.min(3, car.hull)).fill(0) as _}
							<div class="hull-box" />
						{/each}
					</div>
					<div class="hull-row">
						{#each Array(Math.max(0, Math.min(3, car.hull - 3))).fill(0) as _}
							<div class="hull-box" />
						{/each}
					</div>
				</div>
			</div>

			<div class="main-section">
				<div class="equipment-box">
					{#if car.specialRules && car.specialRules.length > 0}
						<div class="special-rules-list">
							{#each car.specialRules as rule}
								<div class="rule-item">{rule}</div>
							{/each}
						</div>
					{/if}
				</div>

				<div class="max-gear">
					<div>MAX GEAR</div>
					<div class="gear-number">{car.maxGear}</div>
				</div>
			</div>

			<div class="status-section">
				<div class="status-label">ACTIVATED</div>
				<div class="status-box">
					{#if car.activated}
						<div>⛽</div>
					{/if}
				</div>
			</div>

			<div class="stats-row">
				<div>HANDLING: {car.handling}</div>
				<div>CREW: {car.crew}</div>
				<div>CANS: {car.cost}</div>
			</div>

			<div class="card-actions">
				<button on:click={() => openEditModal(i)}>Edit</button>
				<button class="danger" on:click={() => deleteCar(i)}>Delete</button>
			</div>
		</div>
	{/each}
	<!-- Add Vehicle Placeholder Card -->
	<button class="placeholder-card" on:click={openVehicleSelect}>
		<div class="placeholder-content">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
			<span>Add Car</span>
		</div>
	</button>
</div>

<style>
	.fleet-summary {
		padding: 1.5rem;
		margin-bottom: 1rem;
		font-family: Arial, sans-serif;
	}

	.fleet-summary h2 {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0 0 1rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid black;
	}

	.total-cost {
		font-size: 1.25rem;
		font-weight: bold;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		padding: 1rem;
	}

	.card {
		border: 2px solid black;
		padding: 0.75rem;
		font-family: Arial, sans-serif;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.placeholder-card {
		border: 2px dashed #666;
		background: transparent;
		min-height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 0.2s;
		padding: 0;
	}

	.placeholder-card:hover {
		background: rgba(0, 0, 0, 0.05);
		border-color: #000;
	}

	.placeholder-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: #666;
	}

	.placeholder-content span {
		font-size: 1.25rem;
		font-weight: bold;
		text-transform: uppercase;
	}

	.card-header {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid black;
		padding-bottom: 0.5rem;
	}

	.title {
		font-size: 1.25rem;
		font-weight: bold;
		text-transform: uppercase;
		padding-bottom: 0.25rem;
		border-bottom: 1px dotted black;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.vehicle-type {
		font-size: 1.1rem;
		font-weight: bold;
		color: #333;
	}

	.weight {
		font-weight: bold;
		text-transform: uppercase;
		font-size: 0.9rem;
	}

	.hull-section {
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
	}

	.hull-label {
		text-transform: uppercase;
		font-weight: bold;
		margin-top: 0.25rem;
	}

	.hull-grid {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.hull-row {
		display: flex;
		gap: 0.25rem;
	}

	.hull-box {
		width: 1.25rem;
		height: 1.25rem;
		border: 2px solid black;
	}

	.equipment-box {
		border: 2px solid black;
		padding: 0.5rem;
		min-height: 3rem;
		display: flex;
		flex: 1;
	}

	.special-rules-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.rule-item {
		font-size: 0.9rem;
	}

	.status-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.status-label {
		text-transform: uppercase;
		font-weight: bold;
	}

	.status-box {
		width: 50px;
		height: 50px;
		border: 2px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
	}

	.stats-row {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.5rem;
		align-items: center;
		font-weight: bold;
		font-size: 0.9rem;
	}

	.max-gear {
		border: 2px solid black;
		padding: 0.25rem;
		text-align: center;
		min-width: 4rem;
	}

	.gear-number {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.card-actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
		margin-top: auto;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		border: 2px solid black;
		background: #fff;
		padding: 1.5rem;
		width: 90%;
		max-width: 800px;
		max-height: 85vh;
		overflow-y: auto;
		font-family: Arial, sans-serif;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.modal-content h2 {
		font-size: 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid black;
		margin: 0;
	}

	.vehicle-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 10px;
		margin: 20px 0;
	}

	.vehicle-option {
		border: 2px solid black;
		padding: 0.75rem;
		text-align: left;
		background: white;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition: all 0.2s;
	}

	.vehicle-option:hover {
		background: #f0f0f0;
	}

	.vehicle-name {
		font-size: 1.1rem;
		font-weight: bold;
		text-transform: uppercase;
		padding-bottom: 0.25rem;
		border-bottom: 1px dotted black;
	}

	.vehicle-stats {
		font-size: 0.9rem;
		font-weight: bold;
	}

	.vehicle-weight {
		font-weight: bold;
		text-transform: uppercase;
		font-size: 0.9rem;
	}

	.main-section {
		display: flex;
		gap: 10px;
	}

	button {
		padding: 0.5rem 1rem;
		font-weight: bold;
		border: 2px solid black;
		background: white;
		cursor: pointer;
		font-family: Arial, sans-serif;
		transition: all 0.2s;
	}

	button:hover {
		background: #f0f0f0;
	}

	button.primary {
		background: black;
		color: white;
	}

	button.primary:hover {
		background: #333;
	}

	button.danger {
		border-color: #dc2626;
		color: #dc2626;
	}

	button.danger:hover {
		background: #dc2626;
		color: white;
	}

	.modal-buttons {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
		margin-top: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin: 0.5rem 0;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 0.9rem;
	}

	select,
	input {
		font-family: Arial, sans-serif;
		padding: 0.5rem;
		border: 2px solid black;
		font-size: 1rem;
		background: white;
	}

	select:focus,
	input:focus {
		outline: none;
		border-color: #666;
	}

	input[type='checkbox'] {
		width: 1.25rem;
		height: 1.25rem;
		margin: 0;
	}
</style>
