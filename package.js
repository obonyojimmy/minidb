Package.describe({
  name: 'obonyojimmy:minidb',
  version: '0.0.1',
  summary: 'Meteor js client-side data storage with offline capabilities leveraging on indexDb storage webApi.',
  git: 'https://github.com/obonyojimmy/minidb',
  documentation: 'README.md'
});

Npm.depends({
  idb: '5.0.7',
});

Package.onUse(function (api) {
  api.versionsFrom('1.8.1')
  api.use(['ecmascript', 'mongo']);
  // api.use(['ejson', 'tracker'], ['client']);
  api.export('MiniDb');
  api.mainModule('lib/minidb.js', 'client');
});

Package.onTest(function (api) {
  api.use('obonyojimmy:minidb', ['client']);
  api.addFiles('tests.js', 'client');
});