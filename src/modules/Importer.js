import DirWatcher from "./DirWatcher";
import csv from 'csvtojson';
import { SVG_FOLDER } from '../app';
import path from 'path';
export default class Importer {
  constructor(event) {
    event.on("changed", (filename) => {
      console.log('File has been changed!');
      const filePath = path.join(SVG_FOLDER, filename);
      const result = this.import(filePath);
      result.then(json => console.log("Content: \n", json));
    });
  }
  import = (filename) => csv().fromFile(filename);
  importSync = function(filename) {
    csv().fromFile(filename).then(result => console.log(result));
  };
}