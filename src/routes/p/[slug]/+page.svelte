<script lang="ts">
	import { initializeApp } from "firebase/app";
	import { getDatabase, ref, onValue } from "firebase/database";
	// @ts-ignore
	import { Table } from "svelte-tabular-table";
	import "./app.css";

	const slug = location.pathname.substring(3);

	const firebaseConfig = {
		databaseURL: "https://navalcombat-964e1-default-rtdb.firebaseio.com/",
	};
	initializeApp(firebaseConfig);
	const db = getDatabase();

	let data: DragNodeList = [];

	const updateData = (newData: any) => {
		data = newData.all.incS ?? [];
		console.log(data);
	};

	const dataRef = ref(db, "pages/" + slug);
	onValue(dataRef, (snapshot) => {
		const data = snapshot.val();
		updateData(data);
	});

	const hpvalues = [
		"Extremely Damaged",
		"Very Damaged",
		"Damaged",
		"Hurt",
		"Just A Scratch",
		"Untouched",
	];
</script>

<main>
	<h1>Player View</h1>
	{#each data as node (node.id)}
		<span class="name">{node.name}</span>
		<span class="class">{node.data.class}</span>
		<Table
			{...{
				init: {
					keys: ["name", "hp"],
					name: "basic-example",
					nohead: true,
					nodiv: false,
					data: (node.items ?? []).map((a) => {
						a.data.hp =
							hpvalues[
								Math.round(
									(a.data.hp / a.data.maxhp) * (hpvalues.length-1)
								)
							];
						return a.data;
					}),
				},
			}}
		/>
	{/each}
</main>

<style>
	.name {
		font-size: x-large;
	}
	.class {
		font-style: italic;
		color: rgb(160, 160, 160);
	}
</style>
