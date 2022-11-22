type DraggableEvent = (MouseEvent | KeyboardEvent) & {
	detail: {
		items: DragNodeList;
		info: { source: any; trigger: any };
	};
};

type DragNodeList = DragNode[]

type DragNode = {
	id: number | string;
	name: string;
	itemComponent: any;
	items: DragNodeList;
	parentable: boolean;
	type: string | undefined;
	data: {};
}