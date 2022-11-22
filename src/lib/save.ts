import { writable } from "svelte/store";
import localforage from "localforage";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

export const incS = writable([] as DragNodeList);
export const outS = writable([] as DragNodeList);
export const landS = writable([] as DragNodeList);
export const sharing = writable(false);
export const sharekey = writable("");

let all = {
	incS: [] as DragNodeList,
	outS: [] as DragNodeList,
	landS: [] as DragNodeList,
	sharekey: Math.random().toString(36).substring(2, 10),
	timestamp: 0,
};

// @ts-ignore
window.localforage = localforage;

const firebaseConfig = {
	databaseURL: "https://navalcombat-964e1-default-rtdb.firebaseio.com/",
};
initializeApp(firebaseConfig);
const db = getDatabase();

let isSharing = false;
sharing.subscribe((v) => (isSharing = v));

const sendToDB = () => {
	if (!isSharing) return;
	all.timestamp = Date.now();
	set(ref(db, "pages/" + all.sharekey), { all });
};

(async function () {
	all = (await localforage.getItem("all")) ?? all;
	all.sharekey = all.sharekey ?? Math.random().toString(36).substring(2, 10);
	sharekey.set(all.sharekey);
	incS.set(all.incS as DragNodeList);
	outS.set(all.outS as DragNodeList);
	landS.set(all.landS as DragNodeList);

	incS.subscribe(async (v) => {
		all.incS = v;
		save();
	});

	outS.subscribe((v) => {
		all.outS = v;
		save();
	});

	landS.subscribe((v) => {
		all.landS = v;
		save();
	});
})();

let rateLimit = false;
let savePending = false;
const save = () => {
	if (rateLimit) {
		// console.log("attempt");
		savePending = true;
		return;
	}

	localforage.setItem("all", all);
	sendToDB();

	// console.log(`saved ${isSharing ? " +cloud" : ""}`);
	savePending = false;
	rateLimit = true;
	setTimeout(() => {
		rateLimit = false;
		if (savePending) save();
	}, 5000);
};
