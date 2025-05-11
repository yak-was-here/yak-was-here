interface WorkFile extends Object {
	htmlContent?: string;
	id: string;
	title: string;
	date: string;
	images: Array<string>;
	role: string;
	results: Array<string>;
	links: Array<{ title: string; url: string }>;
	summary: string;
	tags: Array<string>;
}
