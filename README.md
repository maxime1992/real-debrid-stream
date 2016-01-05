# Real debrid stream

[![Join the chat at https://gitter.im/maxime1992/real-debrid-stream](https://badges.gitter.im/maxime1992/real-debrid-stream.svg)](https://gitter.im/maxime1992/real-debrid-stream?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Stream movies on your raspberry pi using your real debrid account

## Install
```
$ git clone https://github.com/maxime1992/real-debrid-stream.git && cd real-debrid-stream
$ npm install
$ gulp build serve
```

Note: the `serve` task won't automatically launch the browser for you.
To view the app please open a new tab and go to `http://localhost:8080/`.

Then, import the app into Chrome.

## Usage
### Tasks
- `$ gulp clean`: Remove generated folders - `build`, `docs` and `coverage`.
- `$ gulp unit`: Run Karma against all `test/unit/**/*.spec.js` files.
- `$ gulp e2e`: Run Protractor against all `test/e2e/**/*.e2e.js` files. The project must be being served before running end-to-end tests.
- `$ gulp build`: Create distribution package. See environment `targets` below.
- `$ gulp serve`: Start web-server and live-reload. See environment `targets` below.

### Environments
Default: `NODE_ENV=development` and `PORT=8080`.

#### Development:
- `$ gulp build serve` is equivalent to
`$ NODE_ENV=development PORT=8080 gulp build serve`.

#### Production
- `$ NODE_ENV=production gulp build serve`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. When submitting a PR, make sure that the commit messages match the [Angular conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-format).

## Disclaimer
The law allows you to download a file only if you own the original. No one but you will not be held responsible for incorrect use of this plugin.

## License
MIT
