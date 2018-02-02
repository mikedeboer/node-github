# Temporary fork [octokit/rest.js](https://github.com/octokit/rest.js) with browser-support

This fork is work-in-progress exploration towards [Browser Support for @gr2m/octokit-rest-browser-experimental](https://github.com/octokit/rest.js/milestone/2).

## Browser usage

1. Download `octokit-rest.es2015.min.js` from the latest release: https://github.com/gr2m/octokit-rest-browser-experimental/releases

2. Load it as script into your web application:

   ```html
   <script scr="octokit-rest.es2015.min.js"></script>
   ```

3. Initialize `octokit`

   ```js
   const octokit = new Octokit()
   ```


---

> GitHub REST API client for Node.js

[![Build Status](https://travis-ci.org/gr2m/octokit-rest-browser-experimental.svg?branch=master)](https://travis-ci.org/gr2m/octokit-rest-browser-experimental)
[![Coverage Status](https://coveralls.io/repos/github/gr2m/octokit-rest-browser-experimental/badge.svg)](https://coveralls.io/github/gr2m/octokit-rest-browser-experimental)
[![Greenkeeper](https://badges.greenkeeper.io/gr2m/octokit-rest-browser-experimental.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/@gr2m/octokit-rest-browser-experimental.svg)](https://www.npmjs.com/package/@gr2m/octokit-rest-browser-experimental)

## Usage

Install with `npm install @gr2m/octokit-rest-browser-experimental`.

<!-- HEADS UP: when changing the options for the constructor, make sure to also
     update the type definition templates in scripts/templates/* -->
```js
const octokit = require('@gr2m/octokit-rest-browser-experimental')()

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
octokit.repos.getForOrg({
  org: 'octokit',
  type: 'public'
}).then(({data}) => {
  // handle data
})
```

All available client options with default values

```js
const octokit = require('@gr2m/octokit-rest-browser-experimental')({
  timeout: 0, // 0 means no request timeout
  requestMedia: 'application/vnd.github.v3+json',
  headers: {
    'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
  },

  // change for custom GitHub Enterprise URL
  host: 'api.github.com',
  pathPrefix: '',
  protocol: 'https',
  port: 433,

  // advanced request options
  // see https://nodejs.org/api/http.html
  proxy: undefined,
  ca: undefined,
  rejectUnauthorized: undefined,
  family: undefined
})
```

`@gr2m/octokit-rest-browser-experimental` API docs: https://octokit.github.io/rest.js/  
GitHub v3 REST API docs: https://developer.github.com/v3/

## Authentication

Most GitHub API calls don't require authentication. Rules of thumb:

1. If you can see the information by visiting the site without being logged in, you don't have to be authenticated to retrieve the same information through the API.
2. If you want to change data, you have to be authenticated.

```javascript
// basic
octokit.authenticate({
  type: 'basic',
  username: 'yourusername',
  password: 'password'
})

// oauth
octokit.authenticate({
  type: 'oauth',
  token: 'secrettoken123'
})

// oauth key/secret (to get a token)
octokit.authenticate({
  type: 'oauth',
  key: 'client_id',
  secret: 'client_secret'
})

// token (https://github.com/settings/tokens)
octokit.authenticate({
  type: 'token',
  token: 'secrettoken123'
})

// GitHub app
octokit.authenticate({
  type: 'integration',
  token: 'secrettoken123'
})
```

Note: `authenticate` is synchronous because it only sets the credentials
for the following requests.

## Pagination

There are a few pagination-related methods:

- `hasNextPage(response)`
- `hasPreviousPage(response)`
- `hasFirstPage(response)`
- `hasLastPage(response)`
- `getNextPage(response)`
- `getPreviousPage(response)`
- `getFirstPage(response)`
- `getLastPage(response)`

Usage

```js
async function paginate (method) {
  let response = await method({per_page: 100})
  let {data} = response
  while (octokit.hasNextPage(response)) {
    response = await octokit.getNextPage(response)
    data = data.concat(response.data)
  }
  return data
}

paginate(octokit.repos.getAll)
  .then(data => {
    // handle all results
  })
```

## DEBUG

Set `DEBUG=octokit:rest*` for additional debug logs.

## Tests

Run all tests

```bash
$ npm test
```

Or run a specific test

```bash
$ ./node_modules/.bin/mocha test/test/integration/get-repository-test.js
```

The examples are run as part of the tests. You can set an `EXAMPLES_GITHUB_TOKEN` environment
variable (or set it in a `.env` file) to avoid running against GitHub's rate limit.

## Contributing

We would love you to contribute to `@gr2m/octokit-rest-browser-experimental`, pull requests are very welcomed!
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Credits

`@gr2m/octokit-rest-browser-experimental` was originally created as [`node-github`](https://www.npmjs.com/package/github)
in 2012 by Mike de Boer from Cloud9 IDE, Inc.
It was adopted and renamed by GitHub in 2017

## LICENSE

[MIT](LICENSE)
