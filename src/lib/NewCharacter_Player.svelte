<script lang="ts">
	// @ts-nocheck Errors on contenteditable are just annoying (lns whatever its the contenteditables)
	import Textfield from "@smui/textfield";
	import RandomIcon from "svelte-icons/fa/FaRedoAlt.svelte";
	import { NormalPlayerStats, type Player } from "./data";

	export let previewplayer: Player;

	const randomizeStat = (
		stat: "ac" | "maxhp" | "initBonus" | "passivePerception",
		percent: number
	) =>
		(previewplayer[stat] = Math.round(
			NormalPlayerStats[stat] * (1 + (Math.random() * 2 - 1) * percent)
		));
</script>

<Textfield style="height: 3em;" bind:value={previewplayer.name} label="Name" />

<table>
	<tr>
		<td>
			<span
				type="number"
				contenteditable
				bind:textContent={previewplayer.ac}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => randomizeStat("ac", 0.2)}>
				<RandomIcon />
			</div>
		</td>
		<td>
			<span
				type="number"
				contenteditable
				bind:textContent={previewplayer.maxhp}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => randomizeStat("maxhp", 0.1)}>
				<RandomIcon />
			</div>
		</td>
		<td>
			<span
				type="number"
				contenteditable
				bind:textContent={previewplayer.initBonus}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => randomizeStat("initBonus", 0.25)}>
				<RandomIcon />
			</div>
		</td>
		<td>
			<span
				type="number"
				contenteditable
				bind:textContent={previewplayer.passivePerception}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => randomizeStat("passivePerception", 0.4)}>
				<RandomIcon />
			</div>
		</td>
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
	td:nth-child(1) {
		min-width: 3.5em;
	}
	td:nth-child(1)::before {
		content: "AC";
	}
	td:nth-child(2)::after {
		content: "hp";
	}
	td:nth-child(3)::before {
		content: "+";
	}
	td:nth-child(3)::after {
		content: "init";
	}
	td:nth-child(4)::after {
		content: "perc";
	}
</style>
