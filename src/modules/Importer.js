import DirWatcher from "./DirWatcher";
import csv from 'csvtojson';
import path from "path";

const SVG_FOLDER = path.join(__dirname, "../../data")

export default class Importer {
  constructor() {
    const fileWatcher = new DirWatcher();
    fileWatcher.watch(SVG_FOLDER, 500);

    fileWatcher.on("changed", (filename) => {
      console.log('File has been changed!');
      const filePath = path.join(SVG_FOLDER, filename);
      const result = this.import(filePath);
      result.then(json => console.log("Content: \n", json));
    });
  }
  import = (filename) => csv().fromFile(filename);
  importSync = async function(filename) {
    await csv().fromFile(filename).then(result => console.log(result));
  };
}