'use strict';

const fs = require('node:fs').promises;
const vm = require('node:vm');
const console = require('./consoleProvider.js');
const RUN_OPTIONS = require('./config.js').SANDBOX_RUN_OPTIONS;

module.exports = async (filePath, sandbox) => {
  const src = await fs.readFile(filePath, 'utf8');
  const code = `'use strict';\n${src}`;
  const script = new vm.Script(code, { filename: filePath, lineOffset: -1 });
  console.log({ script });
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const exported = script.runInContext(context, RUN_OPTIONS);
  console.log({ exported });
  return exported;
};
