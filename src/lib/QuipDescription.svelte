<script lang="ts">
	import type { Equipment } from "./data";
	import Snackbar, { Actions, Label } from "@smui/snackbar";

	let snackbar: Snackbar;
	let snaktext = "";
	export let quip: Equipment;

	const roll = (ds: number) => Math.round(Math.random() * (ds - 1) + 1);
	const rollMany = (n: number, ds: number) =>
		Array.from({ length: n }, () => roll(ds));
	const rollHit = () => {
		const rolls = rollMany(1, 20);
		snaktext = `${quip.name} rolls <span style="font-weight:bold;">${
			rolls[0] + quip.tohit
		}</span> to hit. (d20+${quip.tohit})`;
		snackbar.open();
	};
	const rollDmg = () => {
		const rolls = rollMany(quip.damage[0], quip.damage[1]);
		snaktext = `${quip.name} deals ${rolls.join(
			"+"
		)}=<span style="font-weight:bold;">${rolls.reduce(
			(c, v) => c + v
		)}</span> damage. (${quip.damage[0]}d${quip.damage[1]})`;
		snackbar.open();
	};
</script>

<Snackbar bind:this={snackbar}>
	<Label>
		<div>{@html snaktext}</div>
	</Label>
</Snackbar>

<div class="main">
	<div class="title">{quip.name}</div>
	<div class="quickstats">
		AC {quip.ac} |
		{quip.maxhp} hp |
		{quip.price} gp |
		{quip.weight} tons
	</div>
	{#if quip.range}
		<div class="dice">
			<div>{quip.range[0]}/{quip.range[1]}</div>
			<button on:click={rollHit}> +{quip.tohit} </button>
			<button on:click={rollDmg}>
				{quip.damage[0]}d{quip.damage[1]} ⚔
			</button>
		</div>
	{/if}
	<div class="description">
		{quip.description}
	</div>
</div>

<style>
	.main {
		padding: 10px;
		margin-right: 10px;
		border-bottom: 1px solid gray;
	}
	.quickstats {
		font-style: italic;
		opacity: 0.7;
		font-size: small;
		flex-grow: 1;
	}
	.dice {
		display: flex;
		flex-direction: row;
		gap: 5px;
	}
	.dice *:nth-child(1), .dice *:nth-child(3) {
		flex: 2;
	}
	.dice *:nth-child(3) {
		color: rgba(255, 98, 98, 0.514);
	}
	.dice *:nth-child(2) {
		flex: 1;
		color: rgba(255, 170, 73, 0.479)
	}
	.dice *:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(174, 246, 255, 0.527);
	}
	button {
		margin: 0;
		padding: 4px 5px;
	}
	.title {
		font-weight: bold;
	}
	.description {
		opacity: 0.87;
	}
</style>
