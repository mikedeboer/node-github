const nock = require('nock')

const GitHub = require('../../')

require('../mocha-node-setup')

describe('params validations', () => {
  it('github.orgs.get({})', () => {
    const github = new GitHub()

    return github.orgs.get({})

    .catch(error => {
      expect(error.toString()).to.equal('Empty value for parameter \'org\': undefined')
      expect(error.toJSON()).to.deep.equal({
        code: 400,
        message: 'Empty value for parameter \'org\': undefined',
        status: 'Bad Request'
      })
    })
  })

  it('request error', () => {
    const github = new GitHub({
      host: '127.0.0.1',
      port: 8 // officially unassigned port. See https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
    })

    return github.orgs.get({org: 'foo'})

    .catch(error => {
      expect(error.toJSON()).to.deep.equal({
        code: 500,
        message: 'connect ECONNREFUSED 127.0.0.1:8',
        status: 'Internal Server Error'
      })
    })
  })

  it('invalid value for github.issues.getAll({filter})', () => {
    const github = new GitHub()

    return github.issues.getAll({filter: 'foo'})

    .catch(error => {
      expect(error.toJSON()).to.deep.equal({
        code: 400,
        message: 'Invalid value for parameter \'filter\': foo',
        status: 'Bad Request'
      })
    })
  })

  it('invalid value for github.projects.moveProjectCard({position})', () => {
    const github = new GitHub()

    return github.projects.moveProjectCard({id: 123, position: 'foo'})

    .catch(error => {
      expect(error.toJSON()).to.deep.equal({
        code: 400,
        message: 'Invalid value for parameter \'position\': foo',
        status: 'Bad Request'
      })
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
      expect(error.toJSON()).to.deep.equal({
        code: 400,
        message: 'Invalid value for parameter \'position\': Age Ain’t Nothing is NaN',
        status: 'Bad Request'
      })
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

    .catch(error => {
      expect(error.toJSON()).to.deep.equal({
        code: 400,
        message: 'JSON parse error of value for parameter \'config\': I’m no Je-Son!',
        status: 'Bad Request'
      })
    })
  })

  it('Date object for github.issues.createMilestone({..., due_on})', () => {
    const github = new GitHub({
      host: 'milestones-test-host.com'
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
      host: 'notifications-test-host.com'
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
})
