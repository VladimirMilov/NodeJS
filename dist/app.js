'use strict';

var _models = require('./models');

var _modules = require('./modules');

require('@babel/polyfill');

new _models.User();
new _models.Product();
new _modules.DirWatcher();
new _modules.Importer();