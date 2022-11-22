<script lang="ts">
	// @ts-nocheck shut up about your number and string type (ln49 & ln67)
	import type { Ship } from "./data";
	import Switch from "@smui/switch";
	import GiBroadsword from "svelte-icons/gi/GiBroadsword.svelte";

	export let data: Ship;

	let damagefield: HTMLElement;
	let damage: number | string = 0;
	let dmgstore = 0;
	let hpstore = 0;

	const validateDmg = (nostore: boolean | FocusEvent = true) => {
		if (damage == "") damage = 0;
		if (isNaN(+damage)) damage = nostore ? dmgstore : 0;
	};
	const validateHp = () => {
		if (data.hp == "") data.hp = 0;
		if (isNaN(+data.hp)) data.hp = hpstore;
	};
	const dealdamage = (e: KeyboardEvent | MouseEvent) => {
		if (e.code !== "Enter" && e.code !== undefined) return;
		e.preventDefault();
		validateDmg(false);
		(data.hp as number) -= +damage;
	};
</script>

<div class="main">
	<div class="quickstats">
		{data.class} | AC
		{data.ac} |
		{data.speed} feet |
		{data.crew[0]}/{data.crew[1]} crew
	</div>

	<div class="keep">
		<Switch color="secondary" bind:checked={data.keep} />
	</div>

	<div class="damage">
		<div class="dmgwrapper hpfield">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={dealdamage} class="icon">
				<GiBroadsword />
			</div>
			<span
				bind:this={damagefield}
				bind:textContent={damage}
				data-numberfield={damage}
				on:focus={() => (dmgstore = +damage)}
				on:blur={validateDmg}
				on:keydown={dealdamage}
				class="dmg"
				contenteditable="true"
			/>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<!-- also press enterable -->
		<!-- sword icon button -->
	</div>

	<div class="health">
		<span
			bind:textContent={data.hp}
			data-numberfield={data.hp}
			on:focus={() => (hpstore = +data.hp)}
			on:blur={validateHp}
			class="hp hpfield"
			contenteditable="true"
		/>
		/
		<span class="maxhp hpfield">{data.maxhp}</span>
	</div>
</div>

<style>
	.quickstats {
		font-style: italic;
		opacity: 0.7;
		font-size: small;
		flex-grow: 1;
	}
	.hpfield {
		padding: 0 5px;
		border-radius: 3px;
		display: inline-block;
		width: 36.7px;
		text-align: center;
	}
	.hp {
		background-color: #5c3333;
		filter: grayscale(1);
	}
	.maxhp {
		background-color: #33375c;
		cursor: default;
	}
	.main {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		position: relative;
	}
	.keep {
		display: flex;
		align-items: center;
		padding: 0 8px;
	}
	[data-numberfield=""]::after {
		content: "0";
		opacity: 0.65;
	}
	.icon {
		height: 1.3em;
		border-radius: 20px;
		transition: background-color 0.2s;
	}
	.icon:hover {
		background-color: gray;
	}
	.icon:active {
		transform: scale(0.8);
	}
	.dmgwrapper {
		background-color: rgb(107, 65, 52);
		display: flex;
		flex-direction: row;
		margin-right: 10px;
		min-width: 4em;
		align-items: center;
		justify-content: center;
	}
	.dmg {
		flex: 1;
	}
	@media (max-width: 500px) {
	}
</style>
