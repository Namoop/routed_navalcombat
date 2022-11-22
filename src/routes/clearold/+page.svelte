<script lang="ts">
	import { initializeApp } from "firebase/app";
	import { getDatabase, ref, onValue, onChildAdded, orderByChild, query, endAt, remove, limitToLast } from "firebase/database";
	// @ts-ignore

	const slug = location.pathname.substring(3);

	const firebaseConfig = {
		databaseURL: "https://navalcombat-964e1-default-rtdb.firebaseio.com/",
	};
	initializeApp(firebaseConfig);
	const db = getDatabase();

	const dbref = ref(db, "pages");
	const now = Date.now();
	const cutoff = now - 2 * 60 * 60 * 1000;
	const queryresults = query(dbref, orderByChild("all/timestamp"), endAt(cutoff), limitToLast(1))
	onChildAdded(queryresults, function (snapshot) {
		remove(snapshot.ref)
	});
</script>

<div>
	cleared
</div>