<script lang="ts">
	import Modal from "svelte-simple-modal";
	import { writable } from "svelte/store";
	import DragBox from "../lib/DragContainer.svelte";
	import NewCharacter from "../lib/NewCharacter.svelte";
	import FactModal from "../lib/FactModal.svelte";
	import type { Enemy, Player, Ship } from "../lib/data";
	import { incS, outS, landS } from "../lib/save";

	const modal = writable(null);
	const randomFact = () =>
		// @ts-ignore
		modal.set(FactModal);

	const clearDead = () => {
		$incS = $incS.filter((a) => (a.data as { hp: number }).hp > 0);
	};

	const clearNonpermanents = () => {
		if (
			!confirm("Are you sure you want to delete all non-permanent nodes?")
		)
			return;
		$incS = $incS.filter((a) => (a.data as { keep: boolean }).keep);
		$outS = $outS.filter((a) => (a.data as { keep: boolean }).keep);
		$landS = $landS.filter((a) => (a.data as { keep: boolean }).keep);
		// check for dependents with keep
	};

	const moveAllDown = () => {
		$outS = $outS.concat($incS);
		$incS = [];
	};
	const rollInitiative = () => {
		const roll = (ds: number) => Math.round(Math.random() * (ds - 1) + 1);
		$incS.forEach((a) => ((a.data as Ship).initiative = roll(20)));
		$incS = $incS.sort(
			(a, b) => (b.data as Ship).initiative - (a.data as Ship).initiative
		);
		$incS.forEach((ship) => {
			ship.items.forEach((subcharacter) => {
				(subcharacter.data as Player | Enemy).initiative =
					roll(20) + (subcharacter.data as Player | Enemy).initBonus;
			});
			ship.items = ship.items.sort(
				(a, b) =>
					(b.data as Player | Enemy).initiative -
					(a.data as Player | Enemy).initiative
			);
		});
	};
	const getShareLink = () => {
		//combat must be started
		//ends after 2 hours
		alert("boink");
	};
	const idkyet = () => {
		alert("boink");
	};
	const begincombat = () => {
		alert("boink");
		//show some sort of indicator of whose turn it is
	};
</script>

<div id="app" style="min-width:60%">
	<main>
		<div class="box helperbuttons">
			<div class="buttonwrapper">
				<button on:click={moveAllDown}> Move All Down </button>
			</div>
			<div class="buttonwrapper">
				<button on:click={rollInitiative}> Roll Initiative </button>
			</div>
			<div class="buttonwrapper">
				<button on:click={randomFact}> Random Fact </button>
			</div>
			<div class="buttonwrapper">
				<button on:click={getShareLink}> Share Link (wip) </button>
			</div>
			<div class="buttonwrapper">
				<button on:click={begincombat}> Begin Combat</button>
			</div>
			<div class="buttonwrapper">
				<button on:click={idkyet}> Placeholder (wip) </button>
			</div>
			<div class="buttonwrapper">
				<button on:click={clearDead}> Clear Dead </button>
			</div>
			<div class="buttonwrapper">
				<button on:click={clearNonpermanents}> Clear All </button>
			</div>
		</div>
		<h2>In Combat</h2>
		<DragBox bind:items={$incS} />
		<br />
		<Modal
			show={$modal}
			styleWindow={{
				backgroundColor: "rgb(20, 20, 20)",
				color: "rgba(255,255,255,0.87)",
			}}
			styleContent={{ overflow: "visible" }}
		/>

		<hr />
		<h2>Not in Combat</h2>
		<DragBox bind:items={$outS} />
		<br />
		<DragBox bind:items={$landS} parenttype="Ship" />
		<br />
		<br />
		<NewCharacter bind:shipItems={$outS} bind:landItems={$landS} />
	</main>
</div>

<style>
	.box {
		padding: 10px;
		border-radius: 15px;
		flex: 1;
		display: grid;
		row-gap: 10px;
		grid:
			"btn btn btn btn"
			"btn btn btn btn";
	}
	.box > div {
		grid-area: "btn";
	}
	.helperbuttons {
		background-color: rgb(73, 80, 70);
	}
	main {
		min-width: 52em;
	}
</style>
