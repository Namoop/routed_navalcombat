<script lang="ts">
	import { CommonCargo, type ShipCargo } from "./data";
	import Autocomplete from "@smui-extra/autocomplete";
	import Textfield from "@smui/textfield";

	export let cargo: ShipCargo;
	export let disabled = false;
	let namefield: any = document.createElement("input");
	$: if (cargo.name === "§") {
		namefield.querySelector("input").value = "";
	}
</script>

<div class="main">
	<div data-disabled={disabled} class="name" 
	bind:this={namefield}>
		<Autocomplete
			style="width:100%;"
			textfield$style="width: 100%;"
			combobox
			textfield$variant="outlined"
			options={CommonCargo}
			bind:value={cargo.name}
			label="Cargo"
		/>
	</div>
	<div class="tons">
		<Textfield
			variant="outlined"
			bind:value={cargo.weight}
			label="Tons"
			type="number"
			input$step="0.5"
		/>
	</div>
</div>

<style>
	.main {
		border: darkgray;
		width: 100%;
		margin: 7px 0;
		display: flex;
		flex-direction: row;
	}
	.name {
		flex: 1;
	}
	[data-disabled="true"] {
		pointer-events: none;
	}
	.tons {
		font-style: italic;
		width: 5em;
		text-align: right;
	}
</style>
