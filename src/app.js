import { User, Product } from './models';
import { DirWatcher, Importer } from './modules';
import "@babel/polyfill";
import { EventEmitter } from 'events';
import path from "path";

export const SVG_FOLDER = path.join(__dirname, "../data")

new User();
new Product();
const event = new EventEmitter();
new DirWatcher(event);
new Importer(event);