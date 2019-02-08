require("babel-polyfill");
import fs from "fs";
import path from "path";
import through2 from "through2";
import csv from "csvtojson";
import { promisify, isFunction } from "util";

import { fileChange, noSuchDirectory, noSuchFile } from "../messages";

const readdir = promisify(fs.readdir);

const checkIfFileExists = (filePath, cb) => {
  try {
    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isFile()) {
        cb();
      } else {
        console.log(noSuchFile(filePath));
      }
    });
  } catch (error) {
    console.log(noSuchFile(filePath));
  }
};

const checkIfDirectoryExists = (folderPath, cb) => {
  try {
    fs.stat(folderPath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        cb();
      } else {
        console.log(noSuchDirectory(folderPath));
      }
    });
  } catch (error) {
    console.log(noSuchDirectory(folderPath));
  }
};

const tr = func =>
  through2(
    function(chunk, encoding, next) {
      this.push(func(chunk));
      next();
    },
    function(done) {
      done();
    }
  );

export const reverse = () => {
  const reverseData = tr(chunk => chunk.reverse() + "\n");
  process.stdin.pipe(reverseData).pipe(process.stdout);
};

export const transform = () => {
  const dataТoUpperCase = tr(chunk => chunk.toString().toUpperCase());
  process.stdin.pipe(dataТoUpperCase).pipe(process.stdout);
};

export const outputFile = filePath => {
  checkIfFileExists(filePath, () => {
    const dataToString = tr(chunk => chunk.toString());

    fs.createReadStream(filePath)
      .pipe(dataToString)
      .pipe(process.stdout);
  });
};

export const convertFromFile = filePath => {
  checkIfFileExists(filePath, () => {
    csv()
      .fromFile(filePath)
      .then(res => process.stdout.write(JSON.stringify(res)));
  });
};

export const convertToFile = filePath => {
  checkIfFileExists(filePath, () => {
    const fileName = path.parse(filePath).name;
    const fileNameJson = path.join(
      path.parse(filePath).dir,
      `${fileName}.json`
    );
    const writeStream = fs.createWriteStream(fileNameJson);
    csv()
      .fromFile(filePath)
      .then(res => {
        writeStream.write(JSON.stringify(res));
        writeStream.end();
        }
      );
    writeStream.on("finish", () => {
      console.log(fileChange(fileNameJson, 'created'));
    });
  });
};

const writeFile = (data, bundleFilePath) => {
  const writeStream = fs.createWriteStream(bundleFilePath);
  writeStream.write(data);
  writeStream.end();
  writeStream.on("finish", () => {
    console.log(fileChange(bundleFilePath, 'created'));
  });
};

const readCssFile = filePath =>
  new Promise((resolve, reject) => {
    let buffer = [];
    const readStream = fs.createReadStream(filePath);

    readStream.on("data", chunk => {
      buffer.push(chunk);
    });

    readStream.on("close", function() {
      resolve(Buffer.concat(buffer));
    });
  });

export const cssBundler = pathName => {
  checkIfDirectoryExists(pathName, async () => {
    const cssFiles = await readdir(pathName);
    const bundleFile = "bundle.css";
    const fileToBeAppendedDir = "css";
    const fileToBeAppended = "append.css";

    const cssToAppendAtTheEnd = await readCssFile(
      path.join(fileToBeAppendedDir, fileToBeAppended)
    );

    const contentCssFiles = await Promise.all(
      cssFiles
        .filter(
          cssFile => cssFile !== bundleFile && cssFile !== fileToBeAppended
        )
        .map(cssFile => readCssFile(path.join(pathName, cssFile)))
    );

    const concatinatedCssFiles = contentCssFiles
      .join("\n")
      .concat(cssToAppendAtTheEnd);

    writeFile(concatinatedCssFiles, path.join(pathName, bundleFile));
  });
};
