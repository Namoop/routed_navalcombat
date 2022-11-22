<script lang="ts">
	import { Colors, CommonPlayerNames, type Player } from "./data";
	import GiDwarfFace from "svelte-icons/gi/GiDwarfFace.svelte";
	import PlayerStats from "./PlayerStats.svelte";

	export let data: Player;

	const randomizePlayerName = function () {
		const randindx = (arr: Array<any>) =>
			arr[Math.round(Math.random() * arr.length)];
		data.name = randindx(CommonPlayerNames);
		data = data;
	};

	const newcolor = function () {
		const curr = Object.keys(Colors).indexOf(data.color);
		data.color = Object.keys(Colors).at(curr-1);
	}
</script>

<div class="main">
	<div class="title" style="background-color: {Colors[data.color]};">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={randomizePlayerName} class="faceicon">
			<GiDwarfFace />
		</div>
		<h2
			data-charname={data.name}
			contenteditable
			spellcheck="false"
			bind:textContent={data.name}
		/>
	</div>
	<PlayerStats bind:data />

	<div class="body">
		<textarea
			placeholder="Notes for this player. Is anything soon to befall them? Do they have secret knowledge? How chiseled is their chin?"
			bind:value={data.notes}
		/>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="colorwheel" on:click={newcolor}>🎨</div>
</div>

<style>
	.colorwheel {
		position: absolute;
		top: 1.3em;
		right: 7.1em;
		font-size: larger;
		cursor: pointer;
		height: 1.5em;
		padding: 7px 5px 1px;
		border-radius: 20px;
		transition: background-color 0.2s, transform 0.2s;
		user-select: none;
	}
	.colorwheel:hover {
		background: rgb(102, 102, 102);
	}
	.colorwheel:active {
		transform: scale(0.9);
	}
	.title {
		display: flex;
		align-items: center;
		gap: 20px;
		border-radius: 7px;
		margin-bottom: 3px;
	}
	h2 {
		margin: 15px 0 10px;
	}
	.faceicon {
		width: 2em;
		height: 2em;
	}
	.body {
		margin-top: 4px;
		display: flex;
		flex-direction: row;
	}
	.main {
		max-height: 30em;
		overflow-y: scroll;
		padding-right: 5px;
		scrollbar-width: none;
	}
	.faceicon:active {
		transform: scale(0.8);
	}
	textarea {
		width: 92%;
		flex: 1;
		min-height: 10em;
		resize: none;
		border-radius: 10px;
		margin-top: 10px;

		border: 3px solid rgba(50, 173, 136, 0.24);
		filter: grayscale(1);
	}
	textarea:focus {
		outline: none;
	}
</style>
