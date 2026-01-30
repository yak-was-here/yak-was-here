import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const workDirectory = path.join(process.cwd(), "data/work");

const getMDWorkFiles = () => {
	const fileNames = fs.readdirSync(workDirectory);
	return fileNames.filter((f) => path.extname(f) == ".md");
};

export const getAllWorkIds = () => {
	const fileNames = getMDWorkFiles();

	// Pass file ids (names)
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ""),
			},
		};
	});
};

export async function getAllWorkMetadata() {
	const fileNames = getMDWorkFiles();
	const workFiles: Array<WorkFile> = [];

	for (const fileName in fileNames) {
		const id = fileNames[fileName].replace(/\.md$/, "");
		const workFileData = await getWorkFileData(id);
		if (workFileData !== undefined) workFiles.push(workFileData as WorkFile);
	}

	return workFiles.sort(({ date: a }, { date: b }) => {
		const processDateRange = (dateRange: string) => {
			const dR: string = dateRange.toString();
			return Number(dR.includes("-") ? dR.split("-")[0] : dR);
		};
		return processDateRange(b) - processDateRange(a);
	});
}

export async function getWorkFileData(id: string) {
	const fullPath = path.join(workDirectory, `${id}.md`);
	let workFile = "";

	try {
		if (fs.existsSync(fullPath)) {
			workFile = fs.readFileSync(fullPath, {
				encoding: "utf8",
			});
		} else {
			console.error("No work file found for id:", id);
			return;
		}
	} catch (err) {
		console.error(err);
		return;
	}

	const workFileMatterResult = matter(workFile);
	const processedContent = await remark().use(html).process(workFileMatterResult.content);
	const htmlContent = processedContent.toString();
	return {
		id,
		...workFileMatterResult.data,
		htmlContent,
	};
}
