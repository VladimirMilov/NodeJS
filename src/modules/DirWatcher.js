import fs from "fs";
import { EventEmitter } from "events";

export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    setInterval(() => {
      this.emit("event");
    }, 1000);
  }

  watch = (pathname, delay) => {
  const directoryFiles = new Set();
    setInterval(
      () => fs.readdir(pathname, (err, files) => {
        if (err) console.error(err);
        files.forEach(file => {
          !directoryFiles.has(file) && this.emit('changed', file);
          directoryFiles.add(file);
        });
      }),
      delay
    );
  };
}
