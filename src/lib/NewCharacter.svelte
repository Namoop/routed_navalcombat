<script lang="ts">
	// @ts-nocheck svelcte line only
	import Svelecte from "svelecte";
	import { NormalPlayerStats, NormalEnemyStats, ships, type Player, type Ship } from "./data";
	import NewCharacterEnemy from "./NewCharacter_Enemy.svelte";
	import NewCharacterPlayer from "./NewCharacter_Player.svelte";
	import NewCharacterShip from "./NewCharacter_Ship.svelte";
	import Separator from "./Separator.svelte";

	let type = 0;
	let selectedship = 0;
	export let shipItems: DragNodeList;
	let previewship: Ship;
	$: previewship = JSON.parse(JSON.stringify(ships[selectedship]));
	let previewplayer: Player = JSON.parse(JSON.stringify(NormalPlayerStats));
	let previewenemy: Enemy = JSON.parse(JSON.stringify(NormalEnemyStats))
	export let landItems: DragNodeList;

	function addShip(model: Ship) {
		const char = JSON.parse(JSON.stringify(model)) as Ship
		char.hp = char.maxhp;
		char.cargo = [];
		char.keep = false;
		char.name = char.class;
		char.initiative = 0;
		char.equipment.forEach(
			(a) => ([a.hp, a.pos, a.id] = [a.maxhp, "fore", Math.random()])
		);
		shipItems.push({
			id: Math.round(Math.random() * 1e6),
			name: char.class,
			itemComponent: "ship",
			parentable: true,
			items: [],
			type: "Ship",
			data: char,
		});
		shipItems = shipItems;
	}
	function addPlayer(model: Player) {
		const char = JSON.parse(JSON.stringify(model)) as Player
		char.hp = char.maxhp;
		char.initiative = 0;
		landItems.push({
			id: Math.round(Math.random() * 1e6),
			name: char.name,
			itemComponent: "player",
			data: char,
		});
		landItems = landItems;
	}
	function addEnemy(model: Enemy) {
		const char = JSON.parse(JSON.stringify(model)) as Enemy
		char.hp = char.maxhp;
		char.initiative = 0;
		landItems.push({
			id: Math.round(Math.random() * 1e6),
			name: char.name,
			itemComponent: "enemy",
			data: char,
		});
		landItems = landItems;
	}
</script>

<div class="adder-wrapper">
	<Svelecte
		options={["Ship", "Player", "Enemy"]}
		bind:value={type}
		class="svelecte-dark"
		searchable="false"
	/>
	<Separator />
	{#if type == 0}
		<NewCharacterShip bind:selectedship bind:previewship {ships} />
		<button on:click={() => addShip(previewship)}>Add</button>
	{/if}
	{#if type == 1}
		<NewCharacterPlayer bind:previewplayer />
		<button on:click={() => addPlayer(previewplayer)}>Add</button>
	{/if}
	{#if type == 2}
		<NewCharacterEnemy bind:previewenemy />
		<button on:click={() => addEnemy(previewenemy)}>Add</button>
	{/if}
</div>

<style>
	.adder-wrapper {
		border: 1px solid gray;
		background: #2b2b2b;
		padding: 10px;
		position: relative;
		display: flex;
		flex-direction: row;
		gap: 15px;
	}
	button {
		padding: 0 10px;
	}
</style>
