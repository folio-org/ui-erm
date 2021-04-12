const saveFile = require('fs').writeFileSync;

const pkgJsonPath = require.main.paths[0].split('node_modules')[0] + 'package.json';
const json = require(pkgJsonPath);
const args = process.argv.slice(2);

console.log("Args: %o",args);
if ( args.length == 1 ) {
  console.log("Changing publishConfig.registry to %s",args[0]);
  if (!json.hasOwnProperty('scripts')) {
    json.scripts = {};
  }
  
  // json.scripts['watch'] = '<some_commands_here>';
  // json.publishConfig.registry="https://nexus.libsdev.k-int.com/repository/libsdev-npm-hosted/";
  json.publishConfig.registry=args[0]
  
  saveFile(pkgJsonPath, JSON.stringify(json, null, 2));
}
