# create-firefox-profile

**Create a temporary Firefox profile folder for test runs. Extracted from [`osx-firefox`](https://github.com/juliangruber/osx-firefox) and [`linux-firefox`](https://github.com/juliangruber/linux-firefox), to be used for `windows-firefox` (and then the others too).**

[![npm status](http://img.shields.io/npm/v/create-firefox-profile.svg?style=flat-square)](https://www.npmjs.org/package/create-firefox-profile)
[![node](https://img.shields.io/node/v/create-firefox-profile.svg?style=flat-square)](https://www.npmjs.org/package/create-firefox-profile)
[![Travis build status](https://img.shields.io/travis/vweevers/create-firefox-profile.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/create-firefox-profile)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/create-firefox-profile.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/create-firefox-profile)
[![Dependency status](https://img.shields.io/david/vweevers/create-firefox-profile.svg?style=flat-square)](https://david-dm.org/vweevers/create-firefox-profile)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)

## Example

```js
const profile = require('create-firefox-profile')

profile({ proxy: 'http://example.local' }, function (err, folder) {
  if (err) throw err

  // Absolute path to a temporary directory
  console.log(folder)
})
```

Then pass `folder` to `firefox` with `--profile <path>` or `-profile  <path>` depending on the platform.

## API

### `profile([options, ]callback)`

Options:

- `proxy` (string): HTTP proxy
- `noProxy` (array): hosts to disable proxy on
- `prefs` (object): custom preferences

## Install

With [npm](https://npmjs.org) do:

```
npm install create-firefox-profile
```

## License

[MIT](http://opensource.org/licenses/MIT) © Julian Gruber, Vincent Weevers
