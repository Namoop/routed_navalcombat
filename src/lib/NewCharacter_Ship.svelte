<script lang="ts">
	// @ts-nocheck Errors on contenteditable and svelecte type are just annoying (lns whatever its the contenteditables)
	import Svelecte from "svelecte";
	import RandomIcon from "svelte-icons/fa/FaRedoAlt.svelte";
	import type { Ship } from "./data";

	export let selectedship: number;
	export let previewship: Ship;
	export let ships: Ship[];

	const randomizeStat = (
		stat: "price" | "ac" | "maxhp" | "storage",
		percent: number
	) =>
		(previewship[stat] = Math.round(
			ships[selectedship][stat] * (1 + (Math.random() * 2 - 1) * percent)
		));
</script>

<Svelecte
	options={ships.map((a) => a.class)}
	bind:value={selectedship}
	class="svelecte-dark"
	clearable
/>

<table>
	<tr>
		<td>
			<span
				type="number"
				contenteditable
				bind:textContent={previewship.price}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => randomizeStat("price", 0.33)}>
				<RandomIcon />
			</div>
		</td>
		<td>
			<span
				type="number"
				contenteditable
				bind:textContent={previewship.ac}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => randomizeStat("ac", 0.1)}>
				<RandomIcon />
			</div>
		</td>
		<td>
			<span
				type="number"
				contenteditable
				bind:textContent={previewship.maxhp}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => randomizeStat("maxhp", 0.25)}>
				<RandomIcon />
			</div>
		</td>
		<td>
			<span
				type="number"
				contenteditable
				bind:textContent={previewship.storage}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => randomizeStat("storage", 0.4)}>
				<RandomIcon />
			</div>
		</td>
		<td>
			{previewship.speed} feet
		</td>
		<td>
			{previewship.crew[0]}/{previewship.crew[1]} crew
		</td>
		<!-- <td>{previewship["equipment"]} ahh</td> -->
	</tr>
</table>

<style>
	table {
		font-style: italic;
		color: rgb(212, 212, 212);
		border-spacing: 0px;
	}
	td {
		border: 1px solid #a0a0a0;
		padding: 0 8px 0 8px;
	}
	td > div {
		float: right;
		height: 14px;
		position: relative;
		left: 4px;
		padding-bottom: 4px;
		transition: transform 0.1s;
	}
	td > div:hover {
		transform: rotate(50deg);
		cursor: pointer;
	}
	td:first-child {
		min-width: 5em;
	}
	td:nth-child(2) {
		min-width: 3.5em;
	}
	td:nth-child(3) {
		min-width: 4em;
	}
	td:nth-child(4) {
		min-width: 4.2em;
	}
	td:nth-child(5) {
		min-width: 3.6em;
	}
	td:nth-child(6) {
		min-width: 5em;
	}
	td:first-child::after {
		content: "gp";
	}
	td:nth-child(2)::before {
		content: "AC";
	}
	td:nth-child(3)::after {
		content: "hp";
	}
	td:nth-child(4)::after {
		content: "tons";
	}
</style>
