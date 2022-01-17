import fs from "fs";
import path from "path";

const workDirectory = path.join(process.cwd(), "data/work");

export const getAllWork = () => {
	const fileNames = fs.readdirSync(workDirectory);

	// Pass file ids (names)
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.json$/, ""),
			},
		};
	});
};

export const getAllWorkSummaries = () => {
	const fileNames = fs.readdirSync(workDirectory);
	const workSummaries = fileNames.map((fn) => {
		const fnObj = JSON.parse(getWork(fn.replace(/\.json$/, "")).json);
		return {
			id: fn.replace(/\.json$/, ""),
			title: fnObj.summary.title,
			image: fnObj.summary.images[0],
			tags: fnObj.summary.tags,
			body: fnObj.summary.body,
		};
	});

	return workSummaries;
};

export const getWork = (id) => {
	const fullPath = path.join(workDirectory, `${id}.json`);
	let json = "";

	try {
		if (fs.existsSync(fullPath)) {
			json = fs.readFileSync(fullPath, "utf8", (err) => {
				if (err) {
					console.log("Work file read failed:", err);
					return;
				}
			});
		} else {
			console.log("No work file found for id:", id);
		}
	} catch (err) {
		console.error(err);
	}

	return {
		id,
		json,
	};
};
