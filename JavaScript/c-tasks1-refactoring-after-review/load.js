'use strict';

const fs = require('node:fs').promises;
const vm = require('node:vm');

module.exports = async (filePath, sandbox, { RUN_OPTIONS, console }) => {
  const src = await fs.readFile(filePath, 'utf8');
  const code = `'use strict';\n${src}`;
  const script = new vm.Script(code, { filename: filePath, lineOffset: -1 });
  console.log({ script });
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const exported = script.runInContext(context, RUN_OPTIONS);
  console.log({ exported });
  return exported;
};
