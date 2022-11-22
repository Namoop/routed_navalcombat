<script lang="ts">
	import {
		EQUIPMENT,
		QuickQuips,
		type Equipment,
		type Ship,
		type ShipCargo,
	} from "./data";
	import Quickstats from "./Quickstats.svelte";
	import Separator from "./Separator.svelte";
	import GiGalleon from "svelte-icons/gi/GiGalleon.svelte";
	import Cargo from "./CargoCargo.svelte";
	import MdClose from "svelte-icons/md/MdClose.svelte";
	import { CommonShipNames, VeryCommonShipNames } from "./data";
	import Autocomplete from "@smui-extra/autocomplete";
	import EquipmentCargo from "./EquipmentCargo.svelte";
	import QuipDescription from "./QuipDescription.svelte";
	import CargoStatus from "./CargoStatus.svelte";
	import GiCrownCoin from 'svelte-icons/gi/GiCrownCoin.svelte'

	export let data: Ship;
	let tempcargo: ShipCargo = {
		name: "",
		weight: 0,
		id: Math.random(),
	};

	const addCargo = function () {
		if (tempcargo.name == "" || tempcargo.weight == 0) return;
		const namelist = data.cargo.map((a) => a.name);
		if (namelist.includes(tempcargo.name))
			data.cargo[namelist.indexOf(tempcargo.name)].weight +=
				tempcargo.weight;
		else data.cargo.push(JSON.parse(JSON.stringify(tempcargo)));
		data.cargo = data.cargo;

		tempcargo = {
			name: "§",
			weight: 0,
			id: Math.random(),
		};
	};

	const randomizeShipName = function () {
		const randindx = (arr: Array<any>) =>
			arr[Math.round(Math.random() * arr.length)];
		if (Math.random() > 0.66) data.name = randindx(CommonShipNames);
		else data.name = randindx(VeryCommonShipNames);
		data = data;
	};

	const delCargo = function (e: MouseEvent) {
		let icon = e.target as HTMLElement;
		while (![...icon.classList].includes("iconclose"))
			icon = icon.parentElement;
		data.cargo.splice(+icon.dataset.cargoid, 1);
		data.cargo = data.cargo;
		data = data;
	};

	let tempquip = "";

	const delQuip = function (e: MouseEvent) {
		let icon = e.target as HTMLElement;
		while (![...icon.classList].includes("iconclose"))
			icon = icon.parentElement;
		data.equipment.splice(+icon.dataset.quipid, 1);
		data.equipment = data.equipment;
		data = data;
	};

	const quipadd = () => {
		for (const a of Object.values(EQUIPMENT)) {
			if (a.name + ` (${a.price}gp, ${a.weight} tons)` == tempquip) {
				const b: Equipment = JSON.parse(JSON.stringify(a));
				b.hp = b.maxhp;
				b.id = Math.random();
				b.pos = "fore";
				data.equipment.push(b);
				data.equipment = data.equipment;
				data = data;
				break;
			}
		}
	};

	const setQuipSet = (quips: Equipment[]) =>
		[...new Set([...quips.map((a) => a.name)])].map((a) => {
			const model = EQUIPMENT[a.toUpperCase().replace(/ /g, "_")];
			const copy = JSON.parse(JSON.stringify(model));
			// @ts-ignore
			copy.ac[0] ? (copy.ac = data.ac + copy.ac[1]) : 0;
			return copy;
		});
	
	let quipvalue = 0
	const totalQuipValue = (quips: Equipment[]) => quips.reduce((a,c)=>a+c.price,0)
	$: quipvalue = totalQuipValue(data.equipment);

	let quipset = setQuipSet(data.equipment);
	$: quipset = setQuipSet(data.equipment);
</script>

<div class="main">
	<div class="title">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={randomizeShipName} class="shipicon">
			<GiGalleon />
		</div>
		<h2
			data-charname={data.name}
			contenteditable
			spellcheck="false"
			bind:textContent={data.name}
		/>
		<div class="value">
			<div class="crownicon">
				<GiCrownCoin />
			</div>
			{data.price+quipvalue}
		</div>
	</div>
	<Quickstats bind:data />

	<div class="body">
		<div class="col col1">
			{#each quipset as quip}
				<QuipDescription {quip} />
			{/each}
			<textarea
				placeholder="Notes for this ship. What does it look like? Lavish or battle-worn? Who owns it? How much was it bought for?"
				bind:value={data.notes}
			/>
		</div>
		<Separator />
		<div class="col col2">
			<div class="box addnewcargo">
				<div style="font-weight:bold">New Cargo</div>
				<div class="newcargo">
					<Cargo bind:cargo={tempcargo} />
					<button class="addcargo" on:click={addCargo}>
						Add Cargo
					</button>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="iconclose clearaddcargo"
						on:click={() =>
							(tempcargo = {
								name: "§",
								weight: 0,
								id: Math.random(),
							})}
					>
						<MdClose />
					</div>
					<hr />
				</div>
				<div class="newquip">
					<div class="quipname">
						<Autocomplete
							style="width:100%;"
							textfield$style="width: 100%;"
							textfield$variant="outlined"
							options={QuickQuips}
							bind:value={tempquip}
							label="Equipment"
						/>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="iconclose clearaddquip"
						on:click={() => (tempquip = "")}
					>
						<MdClose />
					</div>
				</div>
				<button class="quipadd" on:click={quipadd}>
					Add Equipment
				</button>
				<hr />
			</div>

			<CargoStatus {data} />
			<div class="box equipment">
				{#each data.equipment.sort( (a, b) => a.name.localeCompare(b.name) ) as quip, id (quip.id)}
					<div class="quipwrapper">
						<EquipmentCargo {quip} />
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							data-quipid={id}
							class="iconclose"
							on:click={delQuip}
						>
							<MdClose />
						</div>
					</div>
				{/each}
			</div>
			<div class="box cargo">
				<div class="cargoall">
					{#each data.cargo.sort( (a, b) => a.name.localeCompare(b.name) ) as cargo, id (cargo.id)}
						<div class="cargowrapper">
							<Cargo disabled bind:cargo />
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								data-cargoid={id}
								class="iconclose"
								on:click={delCargo}
							>
								<MdClose />
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.title {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	h2 {
		margin: 15px 0 10px;
	}
	.shipicon {
		width: 2em;
		height: 2em;
	}
	.body {
		margin-top: 4px;
		display: flex;
		flex-direction: row;
	}
	.col {
		min-height: 20em;
	}
	.col1 {
		flex: 2;
		display: flex;
		flex-direction: column;
	}
	.col2 {
		flex: 3;
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
	.box {
		padding: 5px;
		margin: 0 0 10px 10px;
		border-radius: 10px;
	}
	.addnewcargo {
		filter: grayscale(1);
	}
	.cargoall {
		display: flex;
		flex-direction: column;
	}
	.main {
		max-height: 30em;
		overflow-y: scroll;
		padding-right: 5px;
		scrollbar-width: none;
		position: relative;
	}
	.addcargo {
		width: 100%;
	}
	.iconclose {
		position: absolute;
		right: -10px;
		top: -3px;
		height: 1.5em;
		background: #4d4d4d;
		border-radius: 20px;
		transition: background-color 0.2s, transform 0.2s;
	}
	.iconclose:hover {
		background: rgb(117, 82, 82);
	}
	.iconclose:active,
	.shipicon:active {
		transform: scale(0.8);
	}
	.cargowrapper {
		position: relative;
	}
	.quipadd {
		margin-top: 10px;
		width: 100%;
	}
	.quipname {
		width: 100%;
		flex: 1;
	}
	.newquip {
		display: flex;
	}
	.quipwrapper {
		position: relative;
	}
	.box > * {
		position: relative;
	}
	.clearaddcargo {
		right: 5.5em;
		top: 1em;
		background-color: #00000000;
	}
	.clearaddquip {
		right: 1em;
		top: 1em;
		background-color: #00000000;
	}
	.value {
		position:absolute;
		right: 10.1em;
		top: 13px;
		border-radius: 5px;
		border: 1px solid gray;
		padding: 0 2px;
	}
	.crownicon {
		color: gold;
		height: 2em;
	}
</style>
