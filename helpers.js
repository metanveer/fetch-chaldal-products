import fs from "fs";

export const saveFile = (data, fileName) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync(`${fileName}.json`, dataJSON);
};

export const readFile = (fileNameWithExtensionString) => {
  try {
    const dataBuffer = fs.readFileSync(fileNameWithExtensionString);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    console.log("Error in reading document", e);
    return [];
  }
};
