#!/usr/bin/env sh

set -e

npm run build

cd dist/angular-twitter

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:stovt/angular-twitter.git master:gh-pages

cd -