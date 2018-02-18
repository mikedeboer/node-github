const nock = require('nock')

const GitHub = require('../../')

require('../mocha-node-setup')

describe('authentication', () => {
  let github

  beforeEach(() => {
    github = new GitHub({
      host: 'authentication-test-host.com'
    })
  })

  it('basic', () => {
    nock('https://authentication-test-host.com', {
      reqheaders: {
        authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ='
      }
    })
      .get('/orgs/myorg')
      .reply(200, {})

    github.authenticate({
      type: 'basic',
      username: 'username',
      password: 'password'
    })

    return github.orgs.get({org: 'myorg'})
  })

  it('token', () => {
    nock('https://authentication-test-host.com', {
      reqheaders: {
        authorization: 'token abc4567'
      }
    })
      .get('/orgs/myorg')
      .reply(200, {})

    github.authenticate({
      type: 'token',
      token: 'abc4567'
    })

    return github.orgs.get({org: 'myorg'})
  })

  it('oauth token', () => {
    nock('https://authentication-test-host.com')
      .get('/orgs/myorg')
      .query({access_token: 'abc4567'})
      .reply(200, {})

    github.authenticate({
      type: 'oauth',
      token: 'abc4567'
    })

    return github.orgs.get({org: 'myorg'})
  })

  it('oauth token with query', () => {
    nock('https://authentication-test-host.com')
      .get('/orgs/myorg/repos')
      .query({per_page: 1, access_token: 'abc4567'})
      .reply(200, [])

    github.authenticate({
      type: 'oauth',
      token: 'abc4567'
    })

    return github.repos.getForOrg({org: 'myorg', per_page: 1})
  })

  it('oauth key & secret', () => {
    nock('https://authentication-test-host.com')
      .get('/orgs/myorg')
      .query({client_id: 'oauthkey', client_secret: 'oauthsecret'})
      .reply(200, {})

    github.authenticate({
      type: 'oauth',
      key: 'oauthkey',
      secret: 'oauthsecret'
    })

    return github.orgs.get({org: 'myorg'})
  })

  it('oauth key & secret with query', () => {
    nock('https://authentication-test-host.com')
      .get('/orgs/myorg/repos')
      .query({per_page: 1, client_id: 'oauthkey', client_secret: 'oauthsecret'})
      .reply(200, [])

    github.authenticate({
      type: 'oauth',
      key: 'oauthkey',
      secret: 'oauthsecret'
    })

    return github.repos.getForOrg({org: 'myorg', per_page: 1})
  })

  it('integration', () => {
    nock('https://authentication-test-host.com', {
      reqheaders: {
        authorization: 'Bearer abc4567'
      }
    })
      .get('/orgs/myorg')
      .reply(200, {})

    github.authenticate({
      type: 'integration',
      token: 'abc4567'
    })

    return github.orgs.get({org: 'myorg'})
  })

  it('authenticate without options', () => {
    github.authenticate()
  })

  it('authenticate errors', () => {
    expect(() => {
      github.authenticate({})
    }).to.throw(Error)

    expect(() => {
      github.authenticate({type: 'basic'})
    }).to.throw(Error)

    expect(() => {
      github.authenticate({type: 'oauth'})
    }).to.throw(Error)

    expect(() => {
      github.authenticate({type: 'token'})
    }).to.throw(Error)
  })
})
