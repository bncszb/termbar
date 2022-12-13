## My stuff

Electron 1.7.12 had to be installed, the package ran fine, but the "dev mode" did not:
yarn add electron@v1.7.12

- TODO
  - events:
    - key but not enter
    - key and enter

### Features

- [x] Line edit on TouchBar
- [x] Context formatting menu
- [ ] Smart Spellchecker
- [ ] Markdown Import/Export
- [ ] Visual Markdown editing

### Discuss

- [Intro Video post @ Facebook UX Club](//facebook.com/groups/uxclubs/permalink/973396292808999/)
- [Feature Requests and Issues @ GitHub](//github.com/alexander-shvets/writebar/issues)     

## Development

> Install (or update) macOS package manager ([Homebrew][]):
> ```shell
> brew update || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
> ```

> Install [Yarn][] (modern [NodeJS][] package manager):
> ```shell
> which yarn || brew install yarn
> ```

Download source code:    
```shell
git clone git@github.com:alexander-shvets/writebar.git
cd writebar
```

Install application dependencies:
```shell
yarn || npm install
```

Install (global or local) dev-dependencies*:    
```shell
yarn global add electron               || npm install electron -g
yarn global add electron-packager      || npm install electron-packager -g
yarn global add electron-installer-dmg || npm install electron-installer-dmg -g
```
_* doesn't listed in [`package.json`][] becouse I doesn't use js builder yet (which will exclude unused dependencies from application installation package)_

Run app in dev mode:    
```shell
yarn start || npm start
```

Build App and Installation Package (dmg):    
```shell
yarn packdist || npm run pack && npm run dist
```
Release files should be generated in `dist` directory.

### License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Falexander-shvets%2Fwritebar.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Falexander-shvets%2Fwritebar?ref=badge_large)

[`package.json`]: //github.com/alexander-shvets/writebar/blob/master/package.json
[Homebrew]: //brew.sh
[NodeJS]: //nodejs.org
[Yarn]: //yarnpkg.com
