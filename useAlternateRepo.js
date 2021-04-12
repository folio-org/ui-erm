const saveFile = require('fs').writeFileSync;

const pkgJsonPath = require.main.paths[0].split('node_modules')[0] + 'package.json';

const json = require(pkgJsonPath);

if (!json.hasOwnProperty('scripts')) {
  json.scripts = {};
}

// json.scripts['watch'] = '<some_commands_here>';
json.publishConfig.registry="https://nexus.libsdev.k-int.com/repository/libsdev-npm-hosted/";

saveFile(pkgJsonPath, JSON.stringify(json, null, 2));
