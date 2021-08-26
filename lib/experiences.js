import fs from "fs";
import path from "path";

const experiencesDirectory = path.join(process.cwd(), "data/experiences");

export const getAllExperiences = () => {
	const fileNames = fs.readdirSync(experiencesDirectory);

	// Pass file ids (names)
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.json$/, ""),
			},
		};
	});
};

export const getExperience = (id) => {
	const fullPath = path.join(experiencesDirectory, `${id}.json`);
	let json = "";

	try {
		if (fs.existsSync(fullPath)) {
			json = fs.readFileSync(fullPath, "utf8", (err) => {
				if (err) {
					console.log("Experience file read failed:", err);
					return;
				}
			});
		} else {
			console.log("No experience file found for id:", id);
		}
	} catch (err) {
		console.error(err);
	}

	return {
		id,
		json,
	};
};
