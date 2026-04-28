export interface Course {
	name: string;
	slug: string;
}

export interface Topic {
	number: string;
	title: string;
	slug: string;
	color: string;
	sections: Section[];
}

export interface Section {
	heading: string;
	items: Item[];
}

export interface Item {
	label: string;
	slug: string;
}
