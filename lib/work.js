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

export function getAllWorkMetadata() {
	const fileNames = getMDWorkFiles();
	const workFiles = fileNames.map((fn) => {
		const id = fn.replace(/\.md$/, "");
		const workFileData = getWorkFileData(id);
		return workFileData;
	});

	return workFiles.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}

export function getWorkFileData(id) {
	const fullPath = path.join(workDirectory, `${id}.md`);
	let workFile = "";

	try {
		if (fs.existsSync(fullPath)) {
			workFile = fs.readFileSync(fullPath, "utf8", (err) => {
				if (err) {
					console.error("Work file read failed:", err);
					return;
				}
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
	const processedContent = remark().use(html).process(workFileMatterResult.content);
	const htmlContent = processedContent.toString();
	return {
		id,
		...workFileMatterResult.data,
		htmlContent,
	};
}
