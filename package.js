Package.describe({
  name: 'obonyojimmy:minimongo2',
  version: '0.0.1',
  summary: 'Meteor js minimongo modified to use indexdb',
  git: 'https://github.com/obonyojimmy/minimongo2',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.8.1')
  api.use(['ecmascript', 'mongo']);
  api.export('Minimongo2');
  api.mainModule('client/minimongo.js', 'client');
});

Package.onTest(function (api) {
  api.use('obonyojimmy:minimongo2', ['client']);
  api.addFiles('tests.js', 'client');
});