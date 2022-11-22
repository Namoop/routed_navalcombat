<script lang="ts">
	import type { Equipment, Ship, ShipCargo } from "./data";
	import GiCannon from "svelte-icons/gi/GiCannon.svelte";
	import GiBarrel from "svelte-icons/gi/GiBarrel.svelte";

	export let data: Ship;
	let totalcargoHTML: HTMLElement = document.createElement("aside");

	const getWeight = (weigh: { weight: number }[]) =>
		weigh.reduce((c, v) => c + v.weight, 0);
	let quipweight = getWeight(data.equipment);
	$: quipweight = getWeight(data.equipment);

	let cargoweight = getWeight(data.cargo);
	$: cargoweight = getWeight(data.cargo);

	let totalcargo = cargoweight + quipweight;
	$: totalcargo = cargoweight + quipweight;

	$: {
		if (totalcargo > data.storage) setRed();
		else setGreen();
	}
	const setRed = () => {
		totalcargoHTML.style.backgroundColor = "rgb(75, 41, 41)";
	};
	const setGreen = () => {
		totalcargoHTML.style.backgroundColor = "";
	};
</script>

<div class="main">
	<div class="title">Cargo Status</div>
	<div class="quickstats">{data.class} storage capacity: {data.storage} tons</div>
	<div class="breakdown">
		<div class="quips">
			<div class="icon">
				<GiCannon />
			</div>
			<div class="number">
				{quipweight}
			</div>
		</div>
		+
		<div class="cargo">
			<div class="icon">
				<GiBarrel />
			</div>
			<div class="number">
				{cargoweight}
			</div>
		</div>
		=
		<div class="total">
			<div bind:this={totalcargoHTML} class="number totalcargo">
				{cargoweight + quipweight}
			</div>
		</div>
	</div>
	{#if totalcargo > data.storage}
		<span class="enky">Encumbered:</span> movement speed reduced by 10
	{/if}
	{#if totalcargo > data.storage + Math.ceil(data.storage * 0.1)}
		<span class="veryenky">Heavily Encumbered:</span> movement speed is reduced
		by an additional 20. Additionally, the is taking on water and can sink at
		the DM's discretion.
	{/if}
</div>

<style>
	.main {
		margin: 10px 15px 25px;
		padding-bottom: 10px;
		border-bottom: 1px solid gray;
	}
	.title {
		font-weight: bold;
	}
	.quickstats {
		font-style: italic;
		color: gray;
		font-size: small;
	}
	.breakdown {
		display: flex;
		flex-direction: row;
	}
	.breakdown > * {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex: 1;
		gap: 7px;
	}
	.icon {
		width: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.number {
		background: rgb(90, 90, 90);
		padding: 3px;
		min-width: 2em;
		display: flex;
		border-radius: 10px;
		align-items: center;
		justify-content: center;
	}
	.totalcargo {
		background-color: rgb(55, 75, 41);
		min-width: 3em;
	}
	.enky {
		color: darkred;
	}
	.veryenky {
		color: rgb(175, 0, 0);
	}
</style>
