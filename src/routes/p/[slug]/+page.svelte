<script lang="ts">
	import { initializeApp } from "firebase/app";
	import { getDatabase, ref, onValue } from "firebase/database";

	const slug = location.pathname.substring(3);

	const firebaseConfig = {
		databaseURL: "https://navalcombat-964e1-default-rtdb.firebaseio.com/",
	};
	initializeApp(firebaseConfig);
	const db = getDatabase();

	const dataRef = ref(db, "pages/" + slug );
	onValue(dataRef, (snapshot) => {
		const data = snapshot.val();
		updateData(data);
	});

	const updateData = (newData: any[]) => {
		console.log(newData)
	}
</script>

<main>
	<h1>Player View</h1>
	<p>Content here</p>
</main>

<style>
	/*  */
</style>
