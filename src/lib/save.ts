import { writable } from "svelte/store";
import localforage from "localforage";

export const incS = writable([] as DragNodeList);
export const outS = writable([] as DragNodeList);
export const landS = writable([] as DragNodeList);

let all: any = {
	incS: [],
	outS: [],
	landS: [],
};

// @ts-ignore
window.localforage = localforage;


(async function () {
	all = await localforage.getItem("all") ?? all
	incS.set(all.incS as DragNodeList);
	outS.set(all.outS as DragNodeList);
	landS.set(all.landS as DragNodeList);

	incS.subscribe(async (v) => {
		all.incS = v;
		localforage.setItem("all", all);
	});
	
	outS.subscribe((v) => {
		all.outS = v;
		localforage.setItem("all", all);
	});
	
	landS.subscribe((v) => {
		all.landS = v;
		localforage.setItem("all", all);
	});	
})();

