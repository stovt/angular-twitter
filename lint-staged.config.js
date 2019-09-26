module.exports = {
  'src/**/*.ts': ['prettier --write', 'npm run tslint -c ./tslint.json', 'git add'],
  'src/**/*.{css,scss}': ['prettier --write', 'git add']
};
