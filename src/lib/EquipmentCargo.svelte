<script lang="ts">
	// @ts-nocheck another type issue idk (ln30)
	import type { Equipment } from "./data";

	export let quip: Equipment;

	const cyclePos = () => {
		type Pos = ["fore", "port", "aft", "starboard"]
		const posarr: Pos  = [
			"fore",
			"port",
			"aft",
			"starboard",
		];
		// @ts-ignore
		quip.pos = posarr.at(posarr.indexOf(quip.pos) - 1);
	};

	let hpstore = 0;
	const validateHp = () => {
		if (quip.hp == "") quip.hp = 0;
		if (isNaN(+quip.hp)) quip.hp = hpstore;
	};
</script>

<div class="main">
	<div class="name">
		{quip.name}
	</div>

	<div class="weight">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span class="positionalsoiguess" on:click={cyclePos}>
			{quip.pos}
		</span>
		<br />
		{quip.weight} tons
	</div>

	<div class="currhp">
		<div class="health">
			<span
				bind:textContent={quip.hp}
				on:blur={validateHp}
				data-numberfield={quip.hp}
				on:focus={() => (hpstore = +quip.hp)}
				class="hp"
				contenteditable
			/>
			/
			<span class="maxhp">{quip.maxhp}</span>
		</div>
	</div>
</div>

<style>
	.main {
		display: flex;
		flex-direction: row;
		border: 1px solid #757575de;
		border-radius: 3px;
		padding: 5px 20px 5px 0;
		text-align: center;
	}
	.name {
		flex: 1;
		font-size: large;
	}
	.weight {
		font-style: italic;
		font-size: smaller;
		opacity: 0.87;
		line-height: 1em;
		min-width: 5em;
	}
	.positionalsoiguess {
		cursor: pointer;
		user-select: none;
	}
	.health > span {
		padding: 0 5px;
		border-radius: 3px;
		display: inline-block;
		width: 36.7px;
		text-align: center;
	}
	[data-numberfield=""]::after {
		content: "0";
		opacity: 0.65;
	}
	.hp {
		background-color: #5c3333;
		filter: grayscale(1);
	}
	.maxhp {
		background-color: #33375c;
		cursor: default;
	}
</style>
