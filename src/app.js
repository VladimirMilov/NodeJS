import { User, Product } from './models';
import { DirWatcher, Importer } from './modules';
import "@babel/polyfill";

new User();
new Product();
new DirWatcher();
new Importer();