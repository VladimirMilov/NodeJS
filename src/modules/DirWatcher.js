import fs from "fs";
import { EventEmitter } from "events";
export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    setInterval(() => {
      this.emit("event");
    }, 1000);
  }

  watch(pathname, delay) {
    const directoryFiles = {};
    setInterval(
      () =>
        fs.readdir(pathname, (err, files) => {
          if (err) console.error(err);
          files.forEach(file => {
            const filePath = pathname + "/" + file;
            const filename = file.split(".")[0];

            const stats = fs.statSync(filePath);
            const mtime = new Date(stats.mtime);
            // Check if file has been modified
            if (
              !directoryFiles[filename] ||
              directoryFiles[filename].getTime() !== mtime.getTime()
            ) {
              this.emit("changed", file);
              directoryFiles[filename] = mtime;
            }
          });
        }),
      delay
    );
  }
}
