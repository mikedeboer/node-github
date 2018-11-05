const nock = require('nock')

const GitHub = require('../../')

require('../mocha-node-setup')

describe('params validations', () => {
  it('github.orgs.get({})', () => {
    const github = new GitHub()

    return github.orgs.get({})

      .then(() => {
        expect.fail('should throw error')
      })

      .catch(error => {
        expect(error.message).to.equal('Empty value for parameter \'org\': undefined')
        expect(error.code).to.equal(400)
      })
  })

  it('request error', () => {
    const github = new GitHub({
      baseUrl: 'https://127.0.0.1:8' // port: 8 // officially unassigned port. See https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
    })

    return github.orgs.get({ org: 'foo' })

      .then(() => {
        expect.fail('should throw error')
      })

      .catch(error => {
        expect(error.code).to.equal(500)
        expect(error.message).to.equal('request to https://127.0.0.1:8/orgs/foo failed, reason: connect ECONNREFUSED 127.0.0.1:8')
      })
  })

  it('invalid value for github.issues.getAll({filter})', () => {
    const github = new GitHub()

    return github.issues.getAll({ filter: 'foo' })

      .then(() => {
        expect.fail('should throw error')
      })

      .catch(error => {
        expect(error.code).to.equal(400)
        expect(error.message).to.equal('Invalid value for parameter \'filter\': "foo"')
      })
  })

  it('invalid value for github.projects.moveProjectCard({position})', () => {
    const github = new GitHub()

    return github.projects.moveProjectCard({ id: 123, position: 'foo' })

      .then(() => {
        expect.fail('should throw error')
      })

      .catch(error => {
        expect(error.code).to.equal(400)
        expect(error.message).to.equal('Invalid value for parameter \'position\': "foo"')
      })
  })

  it('Not a number for github.repos.createCommitComment({..., position})', () => {
    const github = new GitHub()

    return github.repos.createCommitComment({
      owner: 'foo',
      repo: 'bar',
      sha: 'lala',
      body: 'Sing with me!',
      position: 'Age Ain’t Nothing'
    })

      .catch(error => {
        expect(error.code).to.equal(400)
        expect(error.message).to.equal('Invalid value for parameter \'position\': "Age Ain’t Nothing" is NaN')
      })
  })

  it('Not a valid JSON string for github.repos.createHook({..., config})', () => {
    const github = new GitHub()

    return github.repos.createHook({
      owner: 'foo',
      repo: 'bar',
      name: 'captain',
      config: 'I’m no Je-Son!'
    })

      .then(() => {
        expect.fail('should throw error')
      })

      .catch(error => {
        expect(error.code).to.equal(400)
        expect(error.message).to.equal('JSON parse error of value for parameter \'config\': "I’m no Je-Son!"')
      })
  })

  it('Date object for github.issues.createMilestone({..., due_on})', () => {
    const github = new GitHub({
      baseUrl: 'https://milestones-test-host.com'
    })

    nock('https://milestones-test-host.com')
      .post('/repos/foo/bar/milestones', (body) => {
        expect(body.due_on).to.equal('2012-10-09T23:39:01.000Z')
        return true
      })
      .reply(201, {})

    return github.issues.createMilestone({
      owner: 'foo',
      repo: 'bar',
      title: 'Like a rolling ...',
      due_on: new Date('2012-10-09T23:39:01Z')
    })
  })

  it('Date is passed in correct format for notifications (#716)', () => {
    const github = new GitHub({
      baseUrl: 'https://notifications-test-host.com'
    })

    nock('https://notifications-test-host.com')
      .get('/notifications')
      .query(query => {
        expect(query).to.eql({
          since: '2018-01-21T23:27:31.000Z'
        })
        return true
      })
      .reply(200, {})

    return github.activity.getNotifications({
      since: '2018-01-21T23:27:31.000Z'
    })
  })

  it('client.gitdata.createTree() with invalid tree[] object', () => {
    const github = new GitHub()
    return github.gitdata.createTree({
      owner: 'foo',
      repo: 'bar',
      base_tree: '9fb037999f264ba9a7fc6274d15fa3ae2ab98312',
      tree: [
        {
          type: 'foo'
        }
      ]
    })

      .then(() => {
        expect.fail('should throw error')
      })

      .catch(error => {
        expect(error.code).to.equal(400)
        expect(error.message).to.equal('Invalid value for parameter \'tree[0].type\': "foo"')
      })
  })

  it('client.issues.createLabel() with description: null', () => {
    const client = new GitHub()
    return client.issues.createLabel({
      owner: 'foo',
      repo: 'bar',
      name: 'baz',
      color: '#bada55',
      description: null
    })

      .then(() => {
        expect.fail('should throw error')
      })

      .catch(error => {
        expect(error.code).to.equal(400)
        expect(error.message).to.equal('\'description\' cannot be null')
      })
  })

  it('does not alter passed options', () => {
    const github = new GitHub({
      baseUrl: 'https://params-test-host.com'
    })

    nock('https://params-test-host.com')
      .get('/orgs/foo')
      .reply(200, {})

    const options = {
      org: 'foo',
      headers: {
        'x-bar': 'baz'
      }
    }
    return github.orgs.get(options)
      .catch(() => {
        // ignore error
      })
      .then(() => {
        expect(options).to.deep.eql({
          org: 'foo',
          headers: {
            'x-bar': 'baz'
          }
        })
      })
  })
})
