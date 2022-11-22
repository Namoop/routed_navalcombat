<script lang="ts">
	import type { Ship } from "./data";
	import { writable } from "svelte/store";
	import Modal, { bind } from "svelte-simple-modal";
	import ShipModal from "./ShipModal.svelte";
	import Quickstats from "./Quickstats.svelte";
	import MdClose from "svelte-icons/md/MdClose.svelte";
	import { incS, outS } from "./save";

	const modal = writable(null);
	const showModal = () =>
		modal.set(
			// @ts-ignore
			bind(ShipModal, { data: data })
		);

	const updateData = () => (data = data); // reactivity is wierd
	export let item: DragNode;
	let data = item.data as Ship;

	$: {
		data;
		servepings();
	}
	const servepings = () => {
		$incS = $incS;
		$outS = $outS;
	};

	export let deleteNode: () => void;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="main" on:mouseover={updateData}>
	<span data-charname={data.name}> {data.name} </span>

	<Quickstats bind:data />

	<div class="modalbuttonwrapper">
		<button class="modalbutton" on:click={showModal}>Show Details</button>
		<Modal
			on:close={updateData}
			show={$modal}
			styleWindow={{
				backgroundColor: "rgb(20, 20, 20)",
				color: "rgba(255,255,255,0.87)",
			}}
			styleContent={{ overflow: "visible" }}
		/>
	</div>
	<div class="init">
		{data.initiative}
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="iconclose" on:click={deleteNode}>
		<MdClose />
	</div>
</div>

<style>
	.main {
		padding-left: 30px;
		padding-bottom: 4px;
		text-align: left;
		display: flex;
		gap: 20px;
	}
	.modalbutton {
		padding: 2px 7px;
		background-color: inherit;
		filter: brightness(0.87);
	}
	.init {
		position: absolute;
		left: -40px;
		display: none;
	}
	.main:hover > .init {
		display: inherit;
	}
	.iconclose {
		position: absolute;
		right: -10px;
		top: -10px;
		height: 1.5em;
		background: #4d4d4d;
		border-radius: 20px;
		transition: background-color 0.2s, transform 0.2s;
		display: none;
	}
	.main:hover > .iconclose {
		display: inherit;
	}
	.iconclose:hover {
		background: rgb(117, 82, 82);
	}
	.iconclose:active {
		transform: scale(0.8);
	}
</style>
