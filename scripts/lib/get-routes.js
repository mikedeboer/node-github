module.exports = getRoutes

const ROUTES = require('@octokit/routes')
const camelCase = require('lodash.camelcase')

/**
 * We use @octokit/routes directly to
 *
 * 1. Generate the routes.json file
 * 2. Generate the API docs
 * 3. Generate the routes.json file
 *
 * Here is what the script does
 * 1. Ignore entreprise cloud methods as these exist in a plugin:
 *    https://github.com/octokit/plugin-enterprise-cloud.js
 * 2. Ignore all legacy endpoints
 * 3. Normalize idName
 *
 */
function getRoutes () {
  Object.keys(ROUTES).forEach(scope => {
    const endpoints = ROUTES[scope]

    // remove legacy & enterprise-cloud endpoints
    const indexes = ROUTES[scope].reduce((result, endpoint, i) => {
      if (/-legacy$/.test(endpoint.idName)) {
        result.unshift(i)
      }

      if (endpoint.githubCloudOnly) {
        result.unshift(i)
      }

      return result
    }, [])
    indexes.forEach(i => endpoints.splice(i, 1))

    // normalize idName
    endpoints.forEach(normalize)

    // handle some exceptions. TODO: move this into @octokit/routes
    endpoints.forEach(endpoint => {
      // exception for uploadReleaseAssets which passes parameters as header values
      // see https://github.com/octokit/rest.js/pull/1043
      if (endpoint.idName === 'uploadReleaseAsset') {
        const contentLengthParam = endpoint.params.find(param => param.name === 'Content-Length')
        const contentTypeParam = endpoint.params.find(param => param.name === 'Content-Type')
        const indexes = endpoint.params.reduce((result, param, i) => {
          if (['Content-Length', 'Content-Type'].includes(param.name)) {
            result.unshift(i)
          }

          return result
        }, [])
        indexes.forEach(i => endpoint.params.splice(i, 1))
        endpoint.params.unshift(
          Object.assign(contentLengthParam, { name: 'headers.content-length' }),
          Object.assign(contentTypeParam, { name: 'headers.content-type' }),
          {
            name: 'headers',
            location: 'headers',
            required: true,
            type: 'object',
            description: 'Request headers containing `content-type` and `content-length`'
          }
        )
      }

      // exception for markdown.renderRaw which requires a content-type header
      // see https://github.com/octokit/rest.js/pull/1043
      if (endpoint.idName === 'renderRaw') {
        endpoint.headers = {
          'content-type': 'text/plain; charset=utf-8'
        }
      }
    })
  })

  return ROUTES
}

function normalize (endpoint) {
  endpoint.idName = camelCase(endpoint.idName.replace(/^edit/, 'update'))
}
